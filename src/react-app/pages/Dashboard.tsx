import { useState, useEffect } from 'react';
import { FileText, ArrowLeft, Plus } from 'lucide-react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceList from '@/components/InvoiceList';
import type { Invoice } from '@/shared/types';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';

type View = 'list' | 'create' | 'edit';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingInvoice, setEditingInvoice] = useState<Invoice | undefined>();

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleCreateNew = () => {
    setEditingInvoice(undefined);
    setCurrentView('create');
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setCurrentView('edit');
  };

  const handleSaveInvoice = () => {
    setCurrentView('list');
    setEditingInvoice(undefined);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingInvoice(undefined);
  };

  return (
    <>
      <Seo
        title="Dashboard | WPEG: Free Invoice Generator"
        description="Manage your invoices with WPEG: Free Invoice Generator. Free forever for Winnipeg small businesses."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 relative flex flex-col justify-between">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none"></div>

        <div>
          {/* Top Navigation Header */}
          <header className="relative z-10 container mx-auto px-4 sm:px-6 py-4 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href="/" className="flex items-center space-x-2.5 group transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-xs group-hover:shadow-sm group-hover:scale-105 transition-all">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xl font-bold tracking-tighter text-slate-900 leading-none">
                      wpeg<span className="text-blue-600">.app</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1 hidden sm:block">
                      Free Invoice
                    </span>
                  </div>
                </a>

                {currentView !== 'list' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToList}
                    className="text-xs text-slate-600 hover:text-slate-900 ml-2 h-8 px-2.5"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                    Back to Invoices
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentView === 'list' && (
                  <Button
                    size="sm"
                    onClick={handleCreateNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xs text-xs font-semibold"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    New Invoice
                  </Button>
                )}
                <img
                  src="/wpeg-invoice.png"
                  alt="WPEG Invoice"
                  className="h-10 sm:h-12 object-contain rounded-lg border border-slate-200/60 shadow-2xs"
                />
              </div>
            </div>
          </header>

          {/* Main Dashboard Workspace */}
          <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 flex-1">
            {currentView === 'list' && (
              <InvoiceList
                onCreateNew={handleCreateNew}
                onEditInvoice={handleEditInvoice}
              />
            )}

            {(currentView === 'create' || currentView === 'edit') && (
              <div className="space-y-4">
                <InvoiceForm
                  existingInvoice={editingInvoice}
                  onSave={handleSaveInvoice}
                />
              </div>
            )}
          </main>
        </div>

        {/* Cohesive Footer */}
        <footer className="relative z-10 container mx-auto px-4 sm:px-6 py-10 mt-12 border-t border-slate-200/60 bg-white/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col text-center md:text-left">
              <span className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'Playfair Display' }}>
                WPEG.app: Free Invoice Generator
              </span>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-slate-500">
                <a href="https://mortgage.wpeg.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Winnipeg Mortgage Calculator</a>
                <span>•</span>
                <a href="https://salary.wpeg.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Winnipeg Salary Calculator</a>
                <span>•</span>
                <a href="https://portal.wpeg.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Useful FREE Tools</a>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-4">
                <a href="https://ko-fi.com/N4N11N420X" target="_blank" rel="noopener noreferrer">
                  <img className="h-8 w-auto border-0" src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" alt="Buy Me a Coffee at ko-fi.com" />
                </a>
                <a href="https://www.buymeacoffee.com/emailsig" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-8 w-auto" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right text-xs text-slate-500 space-y-1">
              <p className="font-medium text-slate-700">
                © 2026 WPEG.app: Free Invoice. Made with ❤️ in Winnipeg
              </p>
              <p>
                Powered by <a href="https://portal.wpeg.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WPEG.app</a> • Free forever for Winnipeg small businesses
              </p>
              <p className="text-slate-400">
                <a href="/terms" className="hover:text-slate-600 underline">Terms & Disclaimer</a> • <a href="/changelog" className="hover:text-slate-600 underline">v1.2.0</a> • Use at your own risk
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
