import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, ExternalLink } from 'lucide-react';
import Icon from './Icon';

interface IconSelectorProps {
  onSelectIcon: (iconName: string) => void;
}

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
  { value: '⭐', label: '星标' },
  { value: '🔥', label: '火' },
  { value: '🚀', label: '火箭' },
  { value: '💡', label: '灵感' },
  { value: '📚', label: '阅读' },
  { value: '🧰', label: '工具' },
  { value: '💻', label: '开发' },
  { value: '🎨', label: '设计' },
  { value: '📰', label: '资讯' },
  { value: '🎮', label: '娱乐' },
  { value: '🤖', label: 'AI' },
  { value: '📈', label: '数据' },
  { value: '🛒', label: '购物' },
  { value: '🎵', label: '音乐' },
  { value: '🎬', label: '视频' },
  { value: '🧪', label: '实验' },
  { value: '⚙️', label: '设置' },
  { value: '🔒', label: '加密' },
  { value: '🌐', label: '网络' },
  { value: '📦', label: '资源' },
  { value: '📌', label: '置顶' },
  { value: '🧠', label: '知识' },
  { value: '🏷️', label: '标签' },
  { value: '🗂️', label: '分类' }
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
              查看所有图标
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
