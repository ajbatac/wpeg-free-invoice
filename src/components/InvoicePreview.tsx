import { generateInvoiceHTML } from '@/lib/pdf-generator';
import type { Invoice } from '@/shared/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';

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
    // 882px represents the maximum possible width of our templates (800px max-width + 40px padding * 2)
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const availableWidth = entry.contentRect.width;
                setScale(Math.min(availableWidth / 882, 1));
            }
        });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Track the true DOM height of the generated invoice to fix scrolling layout
    // when the scale transform reduces visual height.
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContentHeight(entry.target.scrollHeight);
            }
        });

        if (contentRef.current) observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col h-auto">
            <Card className="flex flex-col bg-white border shadow-sm">
                <CardHeader className="bg-slate-50 border-b py-4 px-6 shrink-0 relative z-10">
                    <CardTitle className="text-base font-semibold flex justify-between items-center text-slate-800">
                        Live Preview
                        <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border shadow-sm">Updates automatically</span>
                    </CardTitle>
                </CardHeader>

                {/* Scrollable Container with background */}
                <div className="bg-slate-100 p-4 md:p-8">

                    {/* Width-measuring container */}
                    <div ref={containerRef} className="w-full relative mx-auto" style={{ maxWidth: 882 }}>

                        {/* Height wrapper to collapse layout height mathematically according to scale */}
                        <div style={{ height: contentHeight * scale, margin: '0 auto' }} className="w-full transition-all duration-75">

                            {/* The actual scaled content wrapper. 
                Setting width: 882 forces standard A4/max template sizing without flex wrap breaking. */}
                            <div
                                ref={contentRef}
                                className="bg-white shadow-xl origin-top-left flex overflow-hidden w-[882px]"
                                style={{
                                    transform: `scale(${scale})`,
                                    minHeight: 'auto',
                                }}
                            >
                                {/* Inject the exact HTML built for the PDF, enforcing 100% width internal spanning */}
                                <div
                                    className="w-full"
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex flex-row flex-wrap gap-2 mt-4 shrink-0">
                <Button variant="outline" className="flex-1 bg-white bg-opacity-70" onClick={() => setIsLightboxOpen(true)}>Full Screen Preview</Button>
                {onDownload && <Button onClick={onDownload} className="flex-1">Download Invoice in PDF</Button>}
                {onCreateNew && <Button variant="secondary" onClick={onCreateNew} className="flex-1 border shadow-sm">Create a new invoice</Button>}
            </div>

            {isLightboxOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center p-4 sm:p-8 overflow-y-auto">
                    <div className="w-full max-w-[882px] flex justify-end mb-4 shrink-0">
                        <Button variant="outline" className="text-white border-white hover:bg-white/20 bg-transparent uppercase tracking-wider text-xs" onClick={() => setIsLightboxOpen(false)}>Close Preview</Button>
                    </div>
                    <div className="w-full max-w-[882px] bg-white rounded-lg shadow-2xl shrink-0">
                        <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </div>
            )}
        </div>
    );
}
