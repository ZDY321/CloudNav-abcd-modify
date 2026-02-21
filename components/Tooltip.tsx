import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '', centered = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>('top');
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算最佳位置
  const calculatePosition = useCallback(() => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 10; // 边距

    // 计算各个方向的可用空间
    const spaceTop = containerRect.top;
    const spaceBottom = viewportHeight - containerRect.bottom;
    const spaceLeft = containerRect.left;
    const spaceRight = viewportWidth - containerRect.right;

    // 默认tooltip尺寸估算（用于初始计算）
    const tooltipWidth = tooltipRect.width || 200;
    const tooltipHeight = tooltipRect.height || 60;

    let bestPosition: TooltipPosition = 'top';
    let style: React.CSSProperties = {};

    // 优先级：上 > 下 > 右 > 左
    if (spaceTop >= tooltipHeight + padding) {
      bestPosition = 'top';
    } else if (spaceBottom >= tooltipHeight + padding) {
      bestPosition = 'bottom';
    } else if (spaceRight >= tooltipWidth + padding) {
      bestPosition = 'right';
    } else if (spaceLeft >= tooltipWidth + padding) {
      bestPosition = 'left';
    } else {
      // 如果所有方向空间都不够，选择空间最大的方向
      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);
      if (maxSpace === spaceTop) bestPosition = 'top';
      else if (maxSpace === spaceBottom) bestPosition = 'bottom';
      else if (maxSpace === spaceRight) bestPosition = 'right';
      else bestPosition = 'left';
    }

    // 根据位置计算样式
    switch (bestPosition) {
      case 'top':
        style = {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
        // 检查左右是否会超出屏幕
        if (containerRect.left + containerRect.width / 2 - tooltipWidth / 2 < padding) {
          style.left = '0';
          style.transform = 'translateX(0)';
        } else if (containerRect.left + containerRect.width / 2 + tooltipWidth / 2 > viewportWidth - padding) {
          style.left = 'auto';
          style.right = '0';
          style.transform = 'translateX(0)';
        }
        break;
      case 'bottom':
        style = {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
        // 检查左右是否会超出屏幕
        if (containerRect.left + containerRect.width / 2 - tooltipWidth / 2 < padding) {
          style.left = '0';
          style.transform = 'translateX(0)';
        } else if (containerRect.left + containerRect.width / 2 + tooltipWidth / 2 > viewportWidth - padding) {
          style.left = 'auto';
          style.right = '0';
          style.transform = 'translateX(0)';
        }
        break;
      case 'left':
        style = {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
        // 检查上下是否会超出屏幕
        if (containerRect.top + containerRect.height / 2 - tooltipHeight / 2 < padding) {
          style.top = '0';
          style.transform = 'translateY(0)';
        } else if (containerRect.top + containerRect.height / 2 + tooltipHeight / 2 > viewportHeight - padding) {
          style.top = 'auto';
          style.bottom = '0';
          style.transform = 'translateY(0)';
        }
        break;
      case 'right':
        style = {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
        // 检查上下是否会超出屏幕
        if (containerRect.top + containerRect.height / 2 - tooltipHeight / 2 < padding) {
          style.top = '0';
          style.transform = 'translateY(0)';
        } else if (containerRect.top + containerRect.height / 2 + tooltipHeight / 2 > viewportHeight - padding) {
          style.top = 'auto';
          style.bottom = '0';
          style.transform = 'translateY(0)';
        }
        break;
    }

    setPosition(bestPosition);
    setTooltipStyle(style);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      if (!centered) {
        // 在下一帧计算位置，确保tooltip已经渲染
        requestAnimationFrame(calculatePosition);
      }
    }, 300); // 300ms 延迟显示
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // 窗口滚动或调整大小时重新计算位置
  useEffect(() => {
    if (isVisible && !centered) {
      const handleScroll = () => calculatePosition();
      const handleResize = () => calculatePosition();
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, centered, calculatePosition]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!content) {
    return <>{children}</>;
  }

  // 获取箭头样式
  const getArrowStyle = (): string => {
    switch (position) {
      case 'top':
        return 'bottom-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-slate-800 dark:border-t-slate-700';
      case 'bottom':
        return 'top-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-slate-800 dark:border-b-slate-700';
      case 'left':
        return 'right-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-slate-800 dark:border-l-slate-700';
      case 'right':
        return 'left-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-slate-800 dark:border-r-slate-700';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {!centered && isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-[100] px-3 py-2 text-sm text-white bg-slate-800 dark:bg-slate-700 rounded-lg shadow-lg whitespace-pre-wrap max-w-[250px] pointer-events-none"
          style={tooltipStyle}
        >
          {content}
          {/* 箭头 */}
          <div 
            className={`absolute w-0 h-0 border-[6px] ${getArrowStyle()}`}
          />
        </div>
      )}
      {centered && isVisible && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none px-4">
          <div
            ref={tooltipRef}
            className="px-4 py-3 text-sm text-white bg-slate-800/95 dark:bg-slate-700/95 rounded-xl shadow-2xl whitespace-pre-wrap max-w-[min(680px,90vw)] max-h-[70vh] overflow-auto"
          >
            {content}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
