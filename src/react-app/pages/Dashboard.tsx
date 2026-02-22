import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceList from '@/components/InvoiceList';
import type { Invoice } from '@/shared/types';
import Seo from '@/components/Seo';

type View = 'list' | 'create' | 'edit';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingInvoice, setEditingInvoice] = useState<Invoice | undefined>();

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <header className="relative z-10 container mx-auto px-6 py-6 border-b border-gray-200/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href='/' className="flex items-center space-x-2.5 group transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 leading-none">
                    wpeg<span className="text-blue-600">.app</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1 hidden sm:block">
                    Free Invoice
                  </span>
                </div>
              </a>
            </div>
            <div className="flex items-center">
              <img src="/wpeg-invoice.png" alt="WPEG Invoice" className="h-16 md:h-20 object-contain rounded-xl shadow-lg" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-6 py-8 flex-1">
          {currentView === 'list' && (
            <InvoiceList
              onCreateNew={handleCreateNew}
              onEditInvoice={handleEditInvoice}
            />
          )}

          {(currentView === 'create' || currentView === 'edit') && (
            <div className="space-y-4">
              <button
                onClick={handleBackToList}
                className="text-primary hover:underline text-sm"
              >
                ← Back to invoices
              </button>
              <InvoiceForm
                existingInvoice={editingInvoice}
                onSave={handleSaveInvoice}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col mb-6 md:mb-0">
              <span className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display' }}>
                WPEG.app: Free Invoice Generator
              </span>
              <div className="flex flex-col space-y-1">
                <a href="https://mortgage.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Winnipeg Mortgage Calculator</a>
                <a href="https://salary.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Winnipeg Salary Calculator</a>
                <a href="https://portal.wpeg.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Useful FREE Tools</a>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <a href='https://ko-fi.com/N4N11N420X' target='_blank' rel="noopener noreferrer">
                  <img className="h-9 w-auto border-0" src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
                </a>
                <a href="https://www.buymeacoffee.com/emailsig" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-9 w-auto" />
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-1">
                © 2026 WPEG.app: Free Invoice. Made with ❤️ in Winnipeg
              </p>
              <p className="text-xs text-gray-500">
                Powered by <a href="https://portal.wpeg.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">WPEG.app</a> • Free forever for Winnipeg small businesses
              </p>
              <p className="text-xs text-gray-400 mt-2">
                <a href="/terms" className="hover:text-gray-600 underline">Terms & Disclaimer</a> • <a href="/changelog" className="hover:text-gray-600 underline">v1.1.0</a> • Use at your own risk
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
