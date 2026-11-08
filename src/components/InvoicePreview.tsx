import { generateInvoiceHTML } from '@/lib/pdf-generator';
import type { Invoice } from '@/shared/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';
import { Maximize2, X, Download, Plus, Eye } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: Invoice;
  onDownload?: () => void;
  onCreateNew?: () => void;
}

export default function InvoicePreview({ invoice, onDownload, onCreateNew }: InvoicePreviewProps) {
  const htmlContent = generateInvoiceHTML(invoice, invoice.template);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Track the responsive width of the container to compute scaling factor.
  // 882px represents the maximum possible width of our templates
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availableWidth = entry.contentRect.width;
        if (availableWidth > 0) {
          setScale(Math.min(availableWidth / 882, 1));
        }
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Track the true DOM height of the generated invoice to fix scrolling layout
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.target.scrollHeight);
      }
    });

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [htmlContent]);

  return (
    <div className="flex flex-col h-auto space-y-4">
      <Card className="flex flex-col bg-white border border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 py-3.5 px-5 shrink-0 relative z-10">
          <CardTitle className="text-sm font-semibold flex justify-between items-center text-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>Live PDF Preview</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              Auto-updating
            </span>
          </CardTitle>
        </CardHeader>

        {/* Scrollable Container with neutral backdrop */}
        <div className="bg-slate-100/80 p-3 sm:p-5 flex justify-center items-start overflow-hidden">
          {/* Width-measuring container */}
          <div ref={containerRef} className="w-full relative mx-auto flex justify-center" style={{ maxWidth: 882 }}>
            {/* Height wrapper to collapse layout height mathematically according to scale */}
            <div
              style={{
                height: contentHeight > 0 ? contentHeight * scale : 'auto',
                width: scale < 1 ? 882 * scale : '100%',
                margin: '0 auto',
              }}
              className="transition-all duration-75 overflow-hidden flex justify-center"
            >
              {/* The scaled content wrapper */}
              <div
                ref={contentRef}
                className="bg-white shadow-md origin-top-left flex overflow-hidden w-[882px] shrink-0 rounded-xs"
                style={{
                  transform: `scale(${scale})`,
                  minHeight: 'auto',
                }}
              >
                <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action controls */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[140px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs text-xs"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Maximize2 className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
          Full Screen
        </Button>
        {onDownload && (
          <Button
            size="sm"
            onClick={onDownload}
            className="flex-1 min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white shadow-2xs text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download PDF
          </Button>
        )}
        {onCreateNew && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateNew}
            className="text-slate-600 hover:text-slate-900 text-xs px-2.5"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xs flex flex-col items-center p-4 sm:p-8 overflow-y-auto"
        >
          <div className="w-full max-w-[882px] flex justify-between items-center mb-4 shrink-0 px-1">
            <span className="text-white text-sm font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-400" />
              Full Screen Preview ({invoice.template.toUpperCase()})
            </span>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/40 hover:bg-white/10 bg-transparent text-xs h-8"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-4 w-4 mr-1.5" />
              Close
            </Button>
          </div>
          <div className="w-full max-w-[882px] bg-white rounded-lg shadow-2xl shrink-0 overflow-hidden mb-8">
            <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      )}
    </div>
  );
}
