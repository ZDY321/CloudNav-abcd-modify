import React, { useEffect, useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  url,
  title
}) => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen || !url) return;

    let cancelled = false;
    setQrDataUrl('');
    setHasError(false);
    setIsGenerating(true);

    import('qrcode')
      .then(QRCode => QRCode.toDataURL(url, {
        width: 240,
        margin: 1,
        errorCorrectionLevel: 'M',
      }))
      .then(dataUrl => {
        if (!cancelled) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsGenerating(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, url]);

  if (!isOpen) return null;

  const downloadQRCode = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_qrcode.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-sm w-full mx-4 p-6 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X size={20} />
        </button>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 text-center">
          二维码
        </h3>

        {/* 网站信息 */}
        <div className="text-center mb-4">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate" title={title}>
            {title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate" title={url}>
            {url}
          </p>
        </div>

        {/* QR码 */}
        <div className="flex justify-center mb-4">
          <div className="w-48 h-48 border-4 border-white dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
            {isGenerating ? (
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            ) : qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`${title}的二维码`}
                className="w-full h-full"
              />
            ) : (
              <span className="px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                {hasError ? '二维码生成失败' : '暂无二维码'}
              </span>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={downloadQRCode}
            disabled={!qrDataUrl}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            下载二维码
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
