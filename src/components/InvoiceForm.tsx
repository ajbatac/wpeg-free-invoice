import { Plus, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Invoice, InvoiceItem } from '@/shared/types';
import { formatCurrency } from '@/lib/invoice-utils';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';
import InvoiceActions from '@/components/InvoiceActions';
import InvoiceTotals from '@/components/InvoiceTotals';
import TemplateSelector from '@/components/TemplateSelector';

interface InvoiceFormProps {
  existingInvoice?: Invoice;
  onSave?: (invoice: Invoice) => void;
}

export default function InvoiceForm({ existingInvoice, onSave }: InvoiceFormProps) {
  const {
    businessInfo,
    setBusinessInfo,
    clientInfo,
    setClientInfo,
    invoiceNumber,
    setInvoiceNumber,
    date,
    setDate,
    dueDate,
    setDueDate,
    items,
    addItem,
    removeItem,
    updateItem,
    taxRate,
    setTaxRate,
    notes,
    setNotes,
    template,
    setTemplate,
    isGeneratingPDF,
    handleLogoUpload,
    saveInvoiceData,
    handleGenerateInvoice,
    subtotal,
    taxAmount,
    total
  } = useInvoiceForm({ existingInvoice, onSave });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
          <p className="text-muted-foreground">Generate professional invoices in minutes</p>
        </div>
        <InvoiceActions
          onSave={saveInvoiceData}
          onGenerate={handleGenerateInvoice}
          isGenerating={isGeneratingPDF}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle>Your Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mt-1"
              />
              {businessInfo.logo && (
                <img src={businessInfo.logo} alt="Logo" className="mt-2 max-w-32 max-h-20 object-contain" />
              )}
            </div>
            <div>
              <Label htmlFor="business-name">Business Name *</Label>
              <Input
                id="business-name"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                placeholder="Your Business Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="business-email">Email *</Label>
              <Input
                id="business-email"
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                placeholder="business@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="business-phone">Phone</Label>
              <Input
                id="business-phone"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="business-address">Address</Label>
              <Textarea
                id="business-address"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                placeholder="123 Business St, City, State 12345"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="business-website">Website</Label>
              <Input
                id="business-website"
                value={businessInfo.website}
                onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                placeholder="www.yourwebsite.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="client-name">Client Name *</Label>
              <Input
                id="client-name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                placeholder="Client Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="client-email">Email *</Label>
              <Input
                id="client-email"
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="client@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="client-phone">Phone</Label>
              <Input
                id="client-phone"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="client-address">Address</Label>
              <Textarea
                id="client-address"
                value={clientInfo.address}
                onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                placeholder="123 Client St, City, State 12345"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input
                id="invoice-number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-001"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Items</CardTitle>
            <Button onClick={addItem} size="sm">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item: InvoiceItem) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-12 md:col-span-5">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Description of service or product"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`rate-${item.id}`}>Rate</Label>
                  <Input
                    id={`rate-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Label>Amount</Label>
                  <div className="h-9 px-3 py-2 text-sm bg-muted rounded-md flex items-center">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TemplateSelector template={template} setTemplate={setTemplate} />

      {/* Totals and Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or payment terms..."
              rows={4}
            />
          </CardContent>
        </Card>

        <InvoiceTotals
          subtotal={subtotal}
          taxRate={taxRate}
          setTaxRate={setTaxRate}
          taxAmount={taxAmount}
          total={total}
        />
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-6 pt-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGenerateInvoice} 
            disabled={isGeneratingPDF}
            size="lg"
            className="px-12 py-6 text-lg font-semibold"
          >
            <Send className="h-6 w-6 mr-3" />
            {isGeneratingPDF ? 'Generating Invoice...' : 'Generate Invoice'}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center p-4 bg-muted/30 rounded-lg max-w-2xl mx-auto">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This tool is provided "as is" for convenience. 
            Verify all information before sending invoices to clients.
          </p>
          <p>
            By using this service, you agree to our{' '}
            <a href="/terms" target="_blank" className="text-primary hover:underline">
              Terms & Disclaimer
            </a>
            . Use at your own risk.
          </p>
        </div>
      </div>
    </div>
  );
}