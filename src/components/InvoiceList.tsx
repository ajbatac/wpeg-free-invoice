import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, FileText, Calendar, DollarSign, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Invoice } from '@/shared/types';
import { getStoredInvoices, deleteInvoice, formatCurrency, formatDate } from '@/lib/invoice-utils';

interface InvoiceListProps {
  onCreateNew: () => void;
  onEditInvoice: (invoice: Invoice) => void;
}

export default function InvoiceList({ onCreateNew, onEditInvoice }: InvoiceListProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const storedInvoices = getStoredInvoices();
    setInvoices(storedInvoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      deleteInvoice(invoiceId);
      loadInvoices();
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2.5 py-0.5 text-xs font-semibold rounded-full border';
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case 'sent':
        return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-700 border-slate-200`;
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto max-w-md bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No invoices created yet</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Create your first professional invoice. It will be safely stored locally on your device for fast editing anytime.
          </p>
          <Button onClick={onCreateNew} size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Invoice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">
            {invoices.length} {invoices.length === 1 ? 'invoice' : 'invoices'} stored safely on this browser
          </p>
        </div>
        <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="grid gap-3.5">
        {invoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer border-slate-200 bg-white"
            onClick={() => onEditInvoice(invoice)}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-slate-900 text-base">{invoice.invoiceNumber}</span>
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wide">
                      {invoice.template || 'classic'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium truncate">
                    <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{invoice.clientInfo.name || 'Unnamed Client'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      Issued: {formatDate(invoice.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      Due: {formatDate(invoice.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-slate-400 font-medium">Total Amount</div>
                    <div className="text-xl font-bold text-slate-900 tabular-nums flex items-center md:justify-end">
                      <DollarSign className="h-4 w-4 text-blue-600 -mr-0.5" />
                      {formatCurrency(invoice.total).replace('$', '')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditInvoice(invoice);
                      }}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1 text-slate-500" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteInvoice(invoice.id);
                      }}
                      title="Delete Invoice"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
