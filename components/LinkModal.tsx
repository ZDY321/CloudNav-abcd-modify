import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Pin, Wand2, Trash2, Plus, Star, Globe, Wifi, WifiOff, Clock } from 'lucide-react';
import { LinkItem, Category, AIConfig, UrlItem } from '../types';
import { generateLinkDescription, suggestCategory } from '../services/geminiService';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Omit<LinkItem, 'id' | 'createdAt'>) => void;
  onDelete?: (id: string) => void;
  categories: Category[];
  initialData?: LinkItem;
  aiConfig: AIConfig;
  defaultCategoryId?: string;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onSave, onDelete, categories, initialData, aiConfig, defaultCategoryId }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'common');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [pinned, setPinned] = useState(false);
  const [icon, setIcon] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFetchingIcon, setIsFetchingIcon] = useState(false);
  const [autoFetchIcon, setAutoFetchIcon] = useState(true);
  const [batchMode, setBatchMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // 多网址相关状态
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [showMultiUrl, setShowMultiUrl] = useState(false);
  
  // 获取当前选中的分类对象
  const currentCategory = categories.find(cat => cat.id === categoryId);
  
  // 当模态框关闭时，重置批量模式为默认关闭状态
  useEffect(() => {
    if (!isOpen) {
      setBatchMode(false);
      setShowSuccessMessage(false);
    }
  }, [isOpen]);
  
  // 成功提示1秒后自动消失
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setUrl(initialData.url);
        setDescription(initialData.description || '');
        setCategoryId(initialData.categoryId);
        setSubCategoryId(initialData.subCategoryId || '');
        setPinned(initialData.pinned || false);
        setIcon(initialData.icon || '');
        // 加载多网址数据
        if (initialData.urls && initialData.urls.length > 0) {
          setUrls(initialData.urls);
          setShowMultiUrl(true);
        } else {
          setUrls([]);
          setShowMultiUrl(false);
        }
      } else {
        setTitle('');
        setUrl('');
        setDescription('');
        // 如果有默认分类ID且该分类存在，则使用默认分类，否则使用第一个分类
        const defaultCategory = defaultCategoryId && categories.find(cat => cat.id === defaultCategoryId);
        setCategoryId(defaultCategory ? defaultCategoryId : (categories[0]?.id || 'common'));
        setPinned(false);
        setIcon('');
        setUrls([]);
        setShowMultiUrl(false);
      }
    }
  }, [isOpen, initialData, categories, defaultCategoryId]);

  // 当URL变化且启用自动获取图标时，自动获取图标
  useEffect(() => {
    if (url && autoFetchIcon && !initialData) {
      const timer = setTimeout(() => {
        handleFetchIcon();
      }, 500); // 延迟500ms执行，避免频繁请求
      
      return () => clearTimeout(timer);
    }
  }, [url, autoFetchIcon, initialData]);

  const handleDelete = () => {
    if (!initialData) return;
    onDelete && onDelete(initialData.id);
    onClose();
  };

  // 缓存自定义图标到KV空间
  const cacheCustomIcon = async (url: string, iconUrl: string) => {
    try {
      // 提取域名
      let domain = url;
      if (domain.startsWith('http://') || domain.startsWith('https://')) {
        const urlObj = new URL(domain);
        domain = urlObj.hostname;
      }
      
      // 将自定义图标保存到KV缓存
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await fetch('/api/storage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-password': authToken
          },
          body: JSON.stringify({
            saveConfig: 'favicon',
            domain: domain,
            icon: iconUrl
          })
        });
        console.log(`Custom icon cached for domain: ${domain}`);
      }
    } catch (error) {
      console.log("Failed to cache custom icon", error);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url) return;
    
    // 确保URL有协议前缀
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    
    // 处理多网址数据，确保URL有协议前缀
    const processedUrls = urls.map(u => {
      let processedUrl = u.url;
      if (processedUrl && !processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = 'https://' + processedUrl;
      }
      return { ...u, url: processedUrl };
    });

    // 保存链接数据
    onSave({
      id: initialData?.id || '',
      title,
      url: finalUrl,
      urls: processedUrls.length > 0 ? processedUrls : undefined,
      icon,
      description,
      categoryId,
      subCategoryId: subCategoryId || undefined,
      pinned
    });
    
    // 如果有自定义图标URL，缓存到KV空间
    if (icon && !icon.includes('faviconextractor.com')) {
      cacheCustomIcon(finalUrl, icon);
    }
    
    // 批量模式下不关闭窗口，只显示成功提示
    if (batchMode) {
      setShowSuccessMessage(true);
      // 重置表单，但保留分类和批量模式设置
      setTitle('');
      setUrl('');
      setIcon('');
      setDescription('');
      setPinned(false);
      // 如果开启自动获取图标，尝试获取新图标
      if (autoFetchIcon && finalUrl) {
        handleFetchIcon();
      }
    } else {
      onClose();
    }
  };

  const handleAIAssist = async () => {
    if (!url || !title) return;
    if (!aiConfig.apiKey) {
        alert("请先点击侧边栏左下角设置图标配置 AI API Key");
        return;
    }

    setIsGenerating(true);
    
    // Parallel execution for speed
    try {
        const descPromise = generateLinkDescription(title, url, aiConfig);
        const catPromise = suggestCategory(title, url, categories, aiConfig);
        
        const [desc, cat] = await Promise.all([descPromise, catPromise]);
        
        if (desc) setDescription(desc);
        if (cat) setCategoryId(cat);
        
    } catch (e) {
        console.error("AI Assist failed", e);
    } finally {
        setIsGenerating(false);
    }
  };

  // 多网址管理函数
  const addNewUrl = () => {
    const newUrlItem: UrlItem = {
      id: Date.now().toString(),
      url: '',
      label: urls.length === 0 ? '主站' : `备用站${urls.length}`,
      isDefault: urls.length === 0, // 第一个网址默认为默认
      status: 'unknown'
    };
    setUrls([...urls, newUrlItem]);
    if (!showMultiUrl) {
      setShowMultiUrl(true);
    }
  };

  const removeUrl = (urlId: string) => {
    const newUrls = urls.filter(u => u.id !== urlId);
    // 如果删除的是默认网址，将第一个设为默认
    if (newUrls.length > 0 && !newUrls.some(u => u.isDefault)) {
      newUrls[0].isDefault = true;
    }
    setUrls(newUrls);
    if (newUrls.length === 0) {
      setShowMultiUrl(false);
    }
  };

  const updateUrlItem = (urlId: string, field: keyof UrlItem, value: string | boolean) => {
    setUrls(urls.map(u => {
      if (u.id === urlId) {
        if (field === 'isDefault' && value === true) {
          // 如果设为默认，先取消其他默认
          return { ...u, isDefault: true };
        }
        return { ...u, [field]: value };
      }
      // 如果设置了新的默认，取消其他的默认状态
      if (field === 'isDefault' && value === true) {
        return { ...u, isDefault: false };
      }
      return u;
    }));
  };

  // 检测单个网址连通性
  const checkUrlConnectivity = async (urlId: string) => {
    const urlItem = urls.find(u => u.id === urlId);
    if (!urlItem || !urlItem.url) return;

    updateUrlItem(urlId, 'status', 'checking');
    
    try {
      let testUrl = urlItem.url;
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = 'https://' + testUrl;
      }
      
      const startTime = Date.now();
      
      // 使用 /api/link 代理检测
      const response = await fetch(`/api/link?url=${encodeURIComponent(testUrl)}&check=true`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000) // 10秒超时
      });
      
      const responseTime = Date.now() - startTime;
      
      setUrls(prev => prev.map(u => {
        if (u.id === urlId) {
          return {
            ...u,
            status: response.ok ? 'online' : 'offline',
            lastChecked: Date.now(),
            responseTime: response.ok ? responseTime : undefined
          };
        }
        return u;
      }));
    } catch (error) {
      setUrls(prev => prev.map(u => {
        if (u.id === urlId) {
          return {
            ...u,
            status: 'offline',
            lastChecked: Date.now(),
            responseTime: undefined
          };
        }
        return u;
      }));
    }
  };

  // 检测所有网址连通性
  const checkAllUrlsConnectivity = async () => {
    for (const urlItem of urls) {
      if (urlItem.url) {
        await checkUrlConnectivity(urlItem.id);
      }
    }
  };

  const handleFetchIcon = async () => {
    if (!url) return;
    
    setIsFetchingIcon(true);
    try {
      // 提取域名
      let domain = url;
      // 如果URL没有协议前缀，添加https://作为默认协议
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        domain = 'https://' + url;
      }
      
      if (domain.startsWith('http://') || domain.startsWith('https://')) {
        const urlObj = new URL(domain);
        domain = urlObj.hostname;
      }
      
      // 先尝试从KV缓存获取图标
      try {
        const response = await fetch(`/api/storage?getConfig=favicon&domain=${encodeURIComponent(domain)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.cached && data.icon) {
            setIcon(data.icon);
            setIsFetchingIcon(false);
            return;
          }
        }
      } catch (error) {
        console.log("Failed to fetch cached icon, will generate new one", error);
      }
      
      // 如果缓存中没有，则生成新图标
      const iconUrl = `https://www.faviconextractor.com/favicon/${domain}?larger=true`;
      setIcon(iconUrl);
      
      // 将图标保存到KV缓存
      try {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          await fetch('/api/storage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-password': authToken
            },
            body: JSON.stringify({
              saveConfig: 'favicon',
              domain: domain,
              icon: iconUrl
            })
          });
        }
      } catch (error) {
        console.log("Failed to cache icon", error);
      }
    } catch (e) {
      console.error("Failed to fetch icon", e);
      alert("无法获取图标，请检查URL是否正确");
    } finally {
      setIsFetchingIcon(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold dark:text-white">
              {initialData ? '编辑链接' : '添加新链接'}
            </h3>
            <button
              type="button"
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-all ${
                pinned 
                ? 'bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-300' 
                : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400'
              }`}
              title={pinned ? "取消置顶" : "置顶"}
            >
              <Pin size={14} className={pinned ? "fill-current" : ""} />
              <span className="text-xs font-medium">置顶</span>
            </button>
            {!initialData && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md border bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-600">
                <input
                  type="checkbox"
                  id="batchMode"
                  checked={batchMode}
                  onChange={(e) => setBatchMode(e.target.checked)}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-slate-300 rounded dark:border-slate-600 dark:bg-slate-700"
                />
                <label htmlFor="batchMode" className="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer">
                  批量添加不关窗口
                </label>
              </div>
            )}
            {initialData && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className={`flex items-center gap-1 px-2 py-1 rounded-md border transition-all ${
                  'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-400 dark:hover:bg-red-900/30'
                }`}
                title="删除链接"
              >
                <Trash2 size={14} />
                <span className="text-xs font-medium">删除</span>
              </button>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 dark:text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-slate-300">标题</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="网站名称"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium dark:text-slate-300">URL 链接</label>
              <button
                type="button"
                onClick={addNewUrl}
                className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <Plus size={12} />
                添加备用网址
              </button>
            </div>
            <div className="flex gap-2">
                <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="example.com 或 https://..."
                />
            </div>
            
            {/* 多网址管理区域 */}
            {showMultiUrl && urls.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">备用网址列表</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">（标签如：主站、备用站、发布页）</span>
                  </div>
                  <button
                    type="button"
                    onClick={checkAllUrlsConnectivity}
                    className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  >
                    <Wifi size={12} />
                    检测所有
                  </button>
                </div>
                {urls.map((urlItem, index) => (
                  <div key={urlItem.id} className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 space-y-2">
                    <div className="flex gap-2">
                      <div className="relative w-24">
                        <input
                          type="text"
                          value={urlItem.label}
                          onChange={(e) => updateUrlItem(urlItem.id, 'label', e.target.value)}
                          className="w-full px-2 py-1 pr-6 text-xs rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
                          placeholder="标签"
                          list={`label-options-${urlItem.id}`}
                        />
                        <datalist id={`label-options-${urlItem.id}`}>
                          <option value="主站" />
                          <option value="备用站" />
                          <option value="镜像站" />
                          <option value="发布页" />
                          <option value="官网" />
                          <option value="下载页" />
                          <option value="文档" />
                          <option value="API" />
                        </datalist>
                      </div>
                      <input
                        type="text"
                        value={urlItem.url}
                        onChange={(e) => updateUrlItem(urlItem.id, 'url', e.target.value)}
                        className="flex-1 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
                        placeholder="备用网址..."
                      />
                      <button
                        type="button"
                        onClick={() => checkUrlConnectivity(urlItem.id)}
                        className="p-1 text-slate-400 hover:text-green-500 transition-colors"
                        title="检测连通性"
                      >
                        {urlItem.status === 'checking' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : urlItem.status === 'online' ? (
                          <Wifi size={14} className="text-green-500" />
                        ) : urlItem.status === 'offline' ? (
                          <WifiOff size={14} className="text-red-500" />
                        ) : (
                          <Globe size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUrl(urlItem.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={urlItem.isDefault}
                          onChange={(e) => updateUrlItem(urlItem.id, 'isDefault', e.target.checked)}
                          className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-slate-300 rounded dark:border-slate-600 dark:bg-slate-700"
                        />
                        <Star size={10} className={urlItem.isDefault ? 'text-yellow-500 fill-yellow-500' : ''} />
                        设为默认
                      </label>
                      {urlItem.lastChecked && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={10} />
                          {urlItem.status === 'online' && urlItem.responseTime ? `${urlItem.responseTime}ms` : ''}
                          {urlItem.status === 'offline' ? '不可用' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-slate-300">图标 URL</label>
            <div className="flex gap-2">
              {icon && (
                <div className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden flex-shrink-0 bg-white dark:bg-slate-700">
                  <img
                    src={icon}
                    alt="图标预览"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <input
                type="url"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://example.com/icon.png"
              />
              <button
                type="button"
                onClick={handleFetchIcon}
                disabled={!url || isFetchingIcon}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-1 transition-colors"
              >
                {isFetchingIcon ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                获取图标
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="autoFetchIcon"
                checked={autoFetchIcon}
                onChange={(e) => setAutoFetchIcon(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded dark:border-slate-600 dark:bg-slate-700"
              />
              <label htmlFor="autoFetchIcon" className="text-sm text-slate-700 dark:text-slate-300">
                自动获取URL链接的图标
              </label>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium dark:text-slate-300">描述 (选填)</label>
                {(title && url) && (
                    <button
                        type="button"
                        onClick={handleAIAssist}
                        disabled={isGenerating}
                        className="text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        AI 自动填写
                    </button>
                )}
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-20 resize-none"
              placeholder="简短描述..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-slate-300">分类</label>
            <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubCategoryId(''); // 切换分类时重置二级分类
            }}
            className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            </select>
          </div>

          {/* 二级分类选择 */}
          {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-slate-300">二级分类 (可选)</label>
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">-- 不选择 --</option>
                {currentCategory.subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-2 relative">
            {/* 成功提示 */}
            {showSuccessMessage && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-300">
                添加成功
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
