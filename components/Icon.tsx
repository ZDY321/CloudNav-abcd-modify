import React from 'react';
import { fallbackIcon, resolveLucideIcon } from './iconRegistry';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const isLikelyEmoji = (value: string): boolean => {
  if (!value.trim()) return false;
  try {
    return /\p{Extended_Pictographic}/u.test(value);
  } catch {
    return false;
  }
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

  const FallbackIcon = fallbackIcon;
  return <FallbackIcon size={size} className={className} />;
};

export default Icon;
