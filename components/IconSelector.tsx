import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, ExternalLink, Plus, Trash2, RotateCcw, Globe } from 'lucide-react';
import Icon from './Icon';

interface IconSelectorProps {
  onSelectIcon: (iconName: string) => void;
}

interface EmojiResourceSite {
  id: string;
  name: string;
  url: string;
}

const EMOJI_RESOURCE_SITES_KEY = 'cloudnav_emoji_resource_sites';

// 常用图标列表，可以根据需要扩展
const commonIcons = [
  'Star', 'Heart', 'Bookmark', 'Flag', 'Tag', 'Hash',
  'Home', 'User', 'Users', 'Settings', 'Bell', 'Mail',
  'Calendar', 'Clock', 'MapPin', 'Phone', 'Camera', 'Image',
  'Folder', 'File', 'Archive', 'Trash2', 'Download', 'Upload',
  'Search', 'Filter', 'Menu', 'MoreVertical', 'ChevronDown', 'ChevronUp',
  'Plus', 'Minus', 'X', 'Check', 'AlertCircle', 'Info',
  'Edit', 'Copy', 'Share', 'Link', 'ExternalLink', 'Lock',
  'Code', 'Terminal', 'Database', 'Server', 'Cloud', 'Wifi',
  'ShoppingCart', 'CreditCard', 'Package', 'Truck', 'Store',
  'Music', 'Play', 'Pause', 'Volume2', 'Headphones', 'Mic',
  'Book', 'BookOpen', 'FileText', 'PenTool', 'Highlighter', 'Type',
  'Layout', 'Grid', 'List', 'Columns', 'Sidebar', 'Layers',
  'Circle', 'Square', 'Triangle', 'Hexagon', 'Zap', 'Target',
  'Rocket', 'Plane', 'Car', 'Bike', 'Ship', 'Train',
  'Moon', 'Sun', 'CloudRain', 'CloudSnow', 'Wind', 'Thermometer',
  'Github', 'Gitlab', 'Chrome', 'Firefox', 'Safari', 'Edge',
  'MessageSquare', 'MessageCircle', 'Send', 'AtSign', 'Percent'
];

// 内置常用 Emoji 库
const commonEmojis = [
  { value: '🧭', label: '导航' },
  { value: '🏠', label: '主页' },
  { value: '🔍', label: '搜索' },
  { value: '⭐', label: '星标' },
  { value: '🌟', label: '收藏' },
  { value: '🔥', label: '火' },
  { value: '🚀', label: '火箭' },
  { value: '💡', label: '灵感' },
  { value: '📚', label: '阅读' },
  { value: '📄', label: '文档' },
  { value: '✅', label: '任务' },
  { value: '🧾', label: '清单' },
  { value: '🧰', label: '工具' },
  { value: '🛠️', label: '维护' },
  { value: '🧩', label: '插件' },
  { value: '💻', label: '开发' },
  { value: '🧑‍💻', label: '编程' },
  { value: '🎨', label: '设计' },
  { value: '📰', label: '资讯' },
  { value: '🎮', label: '娱乐' },
  { value: '💬', label: '交流' },
  { value: '🤖', label: 'AI' },
  { value: '🎯', label: '目标' },
  { value: '📈', label: '数据' },
  { value: '☁️', label: '云端' },
  { value: '🛒', label: '购物' },
  { value: '🎵', label: '音乐' },
  { value: '🎬', label: '视频' },
  { value: '🧪', label: '实验' },
  { value: '⚙️', label: '设置' },
  { value: '🔒', label: '加密' },
  { value: '🌐', label: '网络' },
  { value: '🔗', label: '链接' },
  { value: '📁', label: '项目' },
  { value: '📦', label: '资源' },
  { value: '📌', label: '置顶' },
  { value: '🗃️', label: '归档' },
  { value: '🧠', label: '知识' },
  { value: '🏷️', label: '标签' },
  { value: '🗂️', label: '分类' }
];

const defaultEmojiResourceSites: EmojiResourceSite[] = [
  { id: 'emojipedia', name: 'Emojipedia', url: 'https://emojipedia.org' },
  { id: 'getemoji', name: 'Get Emoji', url: 'https://getemoji.com' },
  { id: 'emojiall', name: 'EmojiAll', url: 'https://www.emojiall.com/zh-hans' },
  { id: 'emojidb', name: 'EmojiDB', url: 'https://emojidb.org' },
  { id: 'emojigraph', name: 'EmojiGraph', url: 'https://emojigraph.org' },
  { id: 'symbl', name: 'Symbl Emoji', url: 'https://symbl.cc/en/emoji/' },
  { id: 'openmoji', name: 'OpenMoji', url: 'https://openmoji.org' },
  { id: 'twemoji', name: 'Twemoji (GitHub)', url: 'https://github.com/twitter/twemoji' },
  { id: 'unicode-emoji', name: 'Unicode Emoji', url: 'https://unicode.org/emoji/charts/full-emoji-list.html' }
];

const isEmojiValue = (value: string): boolean => {
  if (!value.trim()) return false;
  try {
    return /\p{Extended_Pictographic}/u.test(value);
  } catch {
    return false;
  }
};

const IconSelector: React.FC<IconSelectorProps> = ({ 
  onSelectIcon
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Folder');
  const [customIconName, setCustomIconName] = useState('');
  const [isValidIcon, setIsValidIcon] = useState(true);
  const [emojiResourceSites, setEmojiResourceSites] = useState<EmojiResourceSite[]>(() => {
    try {
      const saved = localStorage.getItem(EMOJI_RESOURCE_SITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as EmojiResourceSite[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalizedSaved = parsed.filter(item => item?.name && item?.url).map(item => ({
            id: item.id || Date.now().toString(),
            name: item.name,
            url: item.url
          }));
          if (normalizedSaved.length > 0) {
            const normalize = (value: string) => value.trim().replace(/\/+$/, '').toLowerCase();
            const existingUrls = new Set(normalizedSaved.map(item => normalize(item.url)));
            const existingNames = new Set(normalizedSaved.map(item => normalize(item.name)));
            const missingDefaults = defaultEmojiResourceSites.filter(site => {
              const siteUrl = normalize(site.url);
              const siteName = normalize(site.name);
              return !existingUrls.has(siteUrl) && !existingNames.has(siteName);
            });
            return [...normalizedSaved, ...missingDefaults];
          }
        }
      }
    } catch {
      // ignore invalid local data
    }
    return defaultEmojiResourceSites;
  });
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [newSiteError, setNewSiteError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(EMOJI_RESOURCE_SITES_KEY, JSON.stringify(emojiResourceSites));
    } catch {
      // ignore storage errors
    }
  }, [emojiResourceSites]);

  // 过滤图标
  const filteredIcons = commonIcons.filter(icon => 
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredEmojis = commonEmojis.filter(item => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return item.label.toLowerCase().includes(q) || item.value.includes(searchQuery.trim());
  });

  // 将 kebab-case 转换为 PascalCase
  const kebabToPascal = (kebabName: string): string => {
    return kebabName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  // 验证图标名称是否有效
  const normalizeIconName = (iconName: string): string => {
    const trimmedIconName = iconName.trim();
    if (!trimmedIconName) return '';

    if (isEmojiValue(trimmedIconName)) {
      return trimmedIconName;
    }
    
    // 检查是否是常用图标列表中的图标
    if (commonIcons.includes(trimmedIconName)) return trimmedIconName;
    
    // 检查是否是 Lucide 图标库中的图标
    try {
      // 首先尝试直接匹配
      if (trimmedIconName in LucideIcons) return trimmedIconName;
      
      // 如果包含连字符，尝试转换为 PascalCase
      if (trimmedIconName.includes('-')) {
        const pascalName = kebabToPascal(trimmedIconName);
        if (pascalName in LucideIcons) return pascalName;
      }
      
      // 尝试首字母大写
      const capitalizedName = trimmedIconName.charAt(0).toUpperCase() + trimmedIconName.slice(1);
      if (capitalizedName in LucideIcons) return capitalizedName;
    } catch {
      return '';
    }

    return '';
  };

  const handleSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setCustomIconName('');
    setIsValidIcon(true);
  };

  const handleCustomIconChange = (iconName: string) => {
    setCustomIconName(iconName);
    
    if (iconName.trim()) {
      const normalized = normalizeIconName(iconName);
      const isValid = !!normalized;
      setIsValidIcon(isValid);
      if (isValid) {
        setSelectedIcon(normalized);
      }
    } else {
      setIsValidIcon(true);
    }
  };

  const handleConfirm = () => {
    onSelectIcon(selectedIcon);
  };

  const normalizeSiteUrl = (rawUrl: string): string | null => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return null;

    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const parsed = new URL(withProtocol);
      return parsed.toString();
    } catch {
      return null;
    }
  };

  const handleAddEmojiSite = () => {
    const name = newSiteName.trim();
    const normalizedUrl = normalizeSiteUrl(newSiteUrl);

    if (!name) {
      setNewSiteError('请输入网站名称');
      return;
    }
    if (!normalizedUrl) {
      setNewSiteError('请输入有效网址');
      return;
    }

    const duplicated = emojiResourceSites.some(site => site.url === normalizedUrl || site.name === name);
    if (duplicated) {
      setNewSiteError('该网站已存在');
      return;
    }

    setEmojiResourceSites(prev => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}`, name, url: normalizedUrl }
    ]);
    setNewSiteName('');
    setNewSiteUrl('');
    setNewSiteError('');
  };

  const handleRemoveEmojiSite = (id: string) => {
    setEmojiResourceSites(prev => prev.filter(site => site.id !== id));
  };

  const handleResetEmojiSites = () => {
    setEmojiResourceSites(defaultEmojiResourceSites);
    setNewSiteError('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索图标..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            autoFocus
          />
        </div>
      </div>

      {/* Custom Icon Input */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">输入图标名称或 Emoji:</span>
            <a 
              href="https://lucide.dev/icons/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={12} />
              查看所有 Lucide 图标
            </a>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="例如: star 或 🚀"
              value={customIconName}
              onChange={(e) => handleCustomIconChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                customIconName && !isValidIcon 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {customIconName && !isValidIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-xs text-red-500">无效图标/Emoji</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emoji Resource Sites */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <Globe size={14} />
            <span>Emoji 外部网站</span>
          </div>
          <button
            type="button"
            onClick={handleResetEmojiSites}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
            title="恢复默认网站列表"
          >
            <RotateCcw size={12} />
            恢复默认
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          支持在下方自行新增/删除网站，列表会自动保存到本地浏览器。
        </p>

        <div className="space-y-1.5 mb-3 max-h-28 overflow-y-auto pr-1">
          {emojiResourceSites.map(site => (
            <div key={site.id} className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                title={site.url}
              >
                <ExternalLink size={12} />
                <span className="truncate">{site.name}</span>
              </a>
              <button
                type="button"
                onClick={() => handleRemoveEmojiSite(site.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded"
                title="删除该网站"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          {emojiResourceSites.length === 0 && (
            <p className="text-xs text-slate-400 py-1">暂无网站，可在下方新增。</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <input
            type="text"
            value={newSiteName}
            onChange={(e) => { setNewSiteName(e.target.value); if (newSiteError) setNewSiteError(''); }}
            placeholder="网站名称"
            className="sm:col-span-2 w-full px-2 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            value={newSiteUrl}
            onChange={(e) => { setNewSiteUrl(e.target.value); if (newSiteError) setNewSiteError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleAddEmojiSite()}
            placeholder="https://..."
            className="sm:col-span-2 w-full px-2 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={handleAddEmojiSite}
            className="sm:col-span-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Plus size={12} />
            添加
          </button>
        </div>
        {newSiteError && (
          <p className="mt-2 text-xs text-red-500">{newSiteError}</p>
        )}
      </div>

      {/* Current Selection */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600 dark:text-slate-400">当前选择:</span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
            <Icon name={selectedIcon} size={18} />
            <span className="text-sm font-medium dark:text-slate-200">{selectedIcon}</span>
          </div>
        </div>
      </div>

      {/* Confirm Selection */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            提示：可直接输入 Emoji，也可从下方图标和 Emoji 库选择
          </div>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            确定选择
          </button>
        </div>
      </div>

      {/* Icons Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredEmojis.length === 0 && filteredIcons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Search size={40} className="mb-3 opacity-50" />
            <p>没有找到匹配的图标</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmojis.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">常用 Emoji</h4>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {filteredEmojis.map(item => (
                    <button
                      key={`${item.value}-${item.label}`}
                      onClick={() => handleSelect(item.value)}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedIcon === item.value
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                      title={`${item.label} ${item.value}`}
                    >
                      <Icon name={item.value} size={20} />
                      <span className="text-[10px] truncate w-full text-center">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredIcons.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Lucide 图标</h4>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {filteredIcons.map(iconName => (
                    <button
                      key={iconName}
                      onClick={() => handleSelect(iconName)}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedIcon === iconName 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                      title={iconName}
                    >
                      <Icon name={iconName} size={20} />
                      <span className="text-xs truncate w-full text-center">{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelector;
