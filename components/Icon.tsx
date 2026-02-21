import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const kebabToPascal = (kebabName: string): string => {
  return kebabName
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const isLikelyEmoji = (value: string): boolean => {
  if (!value.trim()) return false;
  try {
    return /\p{Extended_Pictographic}/u.test(value);
  } catch {
    return false;
  }
};

const resolveLucideIcon = (rawName: string) => {
  const name = rawName.trim();
  if (!name) return null;

  const candidates = [
    name,
    name.includes('-') ? kebabToPascal(name) : name,
    name.charAt(0).toUpperCase() + name.slice(1)
  ];

  for (const candidate of candidates) {
    // @ts-ignore - 动态读取 lucide 图标组件
    const icon = LucideIcons[candidate];
    if (typeof icon === 'function') {
      return icon as React.ComponentType<{ size?: number; className?: string }>;
    }
  }

  return null;
};

const Icon: React.FC<IconProps> = ({ name, size = 20, className }) => {
  const trimmedName = (name || '').trim();
  const IconComponent = resolveLucideIcon(trimmedName);

  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }

  if (isLikelyEmoji(trimmedName)) {
    return (
      <span
        className={`inline-flex items-center justify-center select-none ${className || ''}`}
        style={{ width: size, height: size, fontSize: size, lineHeight: 1 }}
        aria-hidden="true"
      >
        {trimmedName}
      </span>
    );
  }

  return <LucideIcons.Link size={size} className={className} />;
};

export default Icon;
