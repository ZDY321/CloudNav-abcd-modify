import React, { useEffect, useState } from 'react';
import { Globe2, ImageOff } from 'lucide-react';
import type { LinkItem } from '../types';

interface LinkIconProps {
  link: Pick<LinkItem, 'title' | 'icon' | 'iconStatus'>;
  className?: string;
  iconSize?: number;
}

const LinkIcon: React.FC<LinkIconProps> = ({ link, className = 'w-5 h-5', iconSize = 18 }) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [link.icon]);

  if (link.icon && link.iconStatus !== 'failed' && !imageFailed) {
    return (
      <img
        src={link.icon}
        alt=""
        className={`${className} object-contain`}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  if (link.iconStatus === 'failed' || imageFailed) {
    return (
      <span title="网站图标获取失败" className="inline-flex text-rose-500 dark:text-rose-400">
        <ImageOff size={iconSize} aria-label="网站图标获取失败" />
      </span>
    );
  }

  return (
    <span title="网站未提供图标" className="inline-flex text-slate-400 dark:text-slate-500">
      <Globe2 size={iconSize} aria-label="网站未提供图标" />
    </span>
  );
};

export default LinkIcon;
