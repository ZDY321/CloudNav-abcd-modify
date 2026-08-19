import React from 'react';
import { CheckCircle2, Globe2, ImageOff, Loader2, RefreshCw } from 'lucide-react';

export interface FaviconRefreshStatus {
  refreshing: boolean;
  completed: number;
  total: number;
  found: number;
  missing: number;
  failed: number;
}

interface FaviconRefreshControlsProps {
  status?: FaviconRefreshStatus;
  isSubCategoryScope: boolean;
  onRefresh: () => void;
}

const FaviconRefreshControls: React.FC<FaviconRefreshControlsProps> = ({
  status,
  isSubCategoryScope,
  onRefresh
}) => (
  <>
    {status?.refreshing ? (
      <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full whitespace-nowrap">
        <Loader2 size={10} className="animate-spin" />
        图标 {status.completed}/{status.total}
      </span>
    ) : status ? (
      <span
        className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-700 whitespace-nowrap"
        title={`已获取 ${status.found}，无图标 ${status.missing}，获取失败 ${status.failed}`}
      >
        <CheckCircle2 size={10} className="text-emerald-500" />
        <span className="text-emerald-600">{status.found}</span>
        <Globe2 size={10} className="ml-0.5 text-slate-400" />
        <span className="text-slate-500">{status.missing}</span>
        {status.failed > 0 && (
          <>
            <ImageOff size={10} className="ml-0.5 text-rose-500" />
            <span className="text-rose-600">{status.failed}</span>
          </>
        )}
      </span>
    ) : null}

    <button
      onClick={onRefresh}
      disabled={status?.refreshing}
      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
      title={`刷新${isSubCategoryScope ? '当前二级分类' : '当前一级分类'}的网站图标`}
    >
      {status?.refreshing ? <Loader2 size={10} className="animate-spin" /> : <RefreshCw size={10} />}
      刷新图标
    </button>
  </>
);

export default FaviconRefreshControls;
