import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit } from 'lucide-react';
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
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(invoiceId);
      loadInvoices();
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'sent':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No invoices yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first invoice to get started with billing your clients.
          </p>
          <Button onClick={onCreateNew} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Invoice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Invoices</h1>
          <p className="text-muted-foreground">Manage and track your invoices</p>
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onEditInvoice(invoice)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{invoice.invoiceNumber}</h3>
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{invoice.clientInfo.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <span>Created: {formatDate(invoice.date)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Due: {formatDate(invoice.dueDate)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-medium text-primary">{formatCurrency(invoice.total)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditInvoice(invoice);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteInvoice(invoice.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
