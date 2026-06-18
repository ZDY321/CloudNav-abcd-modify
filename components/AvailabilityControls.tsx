import React from 'react';
import { AlertCircle, Globe, Loader2, Wifi, WifiOff } from 'lucide-react';
import type { CategoryAvailabilityStatus } from '../hooks/useAvailabilityCheck';

interface AvailabilityControlsProps {
  status?: CategoryAvailabilityStatus;
  isSubCategoryScope: boolean;
  onCheck: () => void;
  onRetryFailed: () => void;
}

const AvailabilityControls: React.FC<AvailabilityControlsProps> = ({
  status,
  isSubCategoryScope,
  onCheck,
  onRetryFailed
}) => {
  const checkedCount = (status?.online || 0) + (status?.offline || 0);
  const hasFailedLinks = !!status && status.offline > 0 && !status.checking;

  return (
    <>
      {status?.checking ? (
        <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full whitespace-nowrap">
          <Loader2 size={10} className="animate-spin" />
          检测中 {checkedCount}/{status.total}
        </span>
      ) : status ? (
        <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-700 whitespace-nowrap">
          <Wifi size={10} className="text-green-500" />
          <span className="text-green-600">{status.online}</span>
          <span className="text-slate-400">/</span>
          <WifiOff size={10} className="text-red-500" />
          <span className="text-red-600">{status.offline}</span>
          {status.timeout > 0 && (
            <>
              <span className="text-slate-400">/</span>
              <AlertCircle size={10} className="text-amber-500" />
              <span className="text-amber-600">{status.timeout}</span>
            </>
          )}
        </span>
      ) : null}

      <button
        onClick={onCheck}
        disabled={status?.checking}
        className="flex items-center gap-1 px-2.5 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
        title={`${isSubCategoryScope ? '检测当前二级分类' : '检测当前一级分类'}\n绿色：可正常访问\n红色：不可访问\n黄色：请求超时`}
      >
        <Globe size={10} />
        检测
      </button>

      {hasFailedLinks && (
        <button
          onClick={onRetryFailed}
          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors whitespace-nowrap shrink-0"
          title="只重新检测当前范围内失败的网站"
        >
          <WifiOff size={10} />
          重试失败
        </button>
      )}
    </>
  );
};

export default AvailabilityControls;
