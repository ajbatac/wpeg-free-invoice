import { useState } from 'react';
import { Plus, Trash2, Send, Upload, X, FileText, Calendar, Building, User, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Invoice, InvoiceItem } from '@/shared/types';
import { formatCurrency } from '@/lib/invoice-utils';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';
import InvoiceActions from '@/components/InvoiceActions';
import InvoiceTotals from '@/components/InvoiceTotals';
import TemplateSelector from '@/components/TemplateSelector';
import InvoicePreview from '@/components/InvoicePreview';

interface InvoiceFormProps {
  existingInvoice?: Invoice;
  onSave?: (invoice: Invoice) => void;
}

export default function InvoiceForm({ existingInvoice, onSave }: InvoiceFormProps) {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

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
    total,
  } = useInvoiceForm({ existingInvoice, onSave });

  const currentInvoice: Invoice = {
    id: existingInvoice?.id || '',
    invoiceNumber,
    date,
    dueDate,
    businessInfo,
    clientInfo,
    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
    notes,
    template,
    status: 'draft',
    createdAt: existingInvoice?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const removeLogo = () => {
    setBusinessInfo({ ...businessInfo, logo: '' });
  };

  return (
    <div className="space-y-6">
      {/* Mobile/Tablet tab switch */}
      <div className="flex xl:hidden justify-center">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300/60 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === 'editor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Details
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === 'preview'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Live Preview
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Left Form Area (always visible on xl, tab-controlled on smaller screens) */}
        <div className={`space-y-8 xl:flex-1 w-full max-w-4xl mx-auto ${mobileTab === 'preview' ? 'hidden xl:block' : 'block'}`}>
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {existingInvoice ? 'Edit Invoice' : 'Create Invoice'}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Private, instant PDF generation directly in your browser
              </p>
            </div>
            <InvoiceActions
              onSave={saveInvoiceData}
              onGenerate={handleGenerateInvoice}
              isGenerating={isGeneratingPDF}
            />
          </div>

          {/* Business & Client Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Info */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  Your Business Information
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Appears at the top of your invoice and saves for your next invoice
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                {/* Logo Uploader */}
                <div className="space-y-1.5">
                  <Label htmlFor="logo" className="text-xs font-semibold text-slate-700">Company Logo</Label>
                  {businessInfo.logo ? (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <img
                        src={businessInfo.logo}
                        alt="Uploaded logo"
                        className="max-h-12 max-w-28 object-contain rounded-xs"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeLogo}
                        className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 ml-auto h-7 px-2"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-slate-300 rounded-lg p-3 hover:border-blue-400 transition-colors bg-slate-50/50">
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-600 py-1">
                        <Upload className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-blue-600 hover:underline">Click to upload logo</span>
                        <span className="text-slate-400">(PNG, JPG, SVG)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="business-name" className="text-xs font-semibold text-slate-700">Business Name *</Label>
                  <Input
                    id="business-name"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    placeholder="e.g. Red River Consulting Inc."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="business-email" className="text-xs font-semibold text-slate-700">Email *</Label>
                    <Input
                      id="business-email"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      placeholder="hello@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="business-phone" className="text-xs font-semibold text-slate-700">Phone</Label>
                    <Input
                      id="business-phone"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      placeholder="204-555-0199"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="business-address" className="text-xs font-semibold text-slate-700">Address</Label>
                  <Textarea
                    id="business-address"
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    placeholder="123 Portage Ave, Winnipeg, MB R3B 2B9"
                    rows={2}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="business-website" className="text-xs font-semibold text-slate-700">Website</Label>
                  <Input
                    id="business-website"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                    placeholder="https://company.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Client Information
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Recipient of this invoice and billing contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="client-name" className="text-xs font-semibold text-slate-700">Client / Company Name *</Label>
                  <Input
                    id="client-name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    placeholder="e.g. Acme Corp Canada"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="client-email" className="text-xs font-semibold text-slate-700">Client Email *</Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      placeholder="billing@acme.ca"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="client-phone" className="text-xs font-semibold text-slate-700">Client Phone</Label>
                    <Input
                      id="client-phone"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      placeholder="204-555-0144"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="client-address" className="text-xs font-semibold text-slate-700">Billing Address</Label>
                  <Textarea
                    id="client-address"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    placeholder="456 Main St, Winnipeg, MB R3B 1B6"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Date & Number Details */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                Invoice Identification & Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="invoice-number" className="text-xs font-semibold text-slate-700">Invoice Number</Label>
                  <Input
                    id="invoice-number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-2026-001"
                    className="font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-xs font-semibold text-slate-700">Issue Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="due-date" className="text-xs font-semibold text-slate-700">Payment Due Date</Label>
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

          {/* Line Items */}
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Line Items
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Products, services, or hours billed to this invoice
                </CardDescription>
              </div>
              <Button onClick={addItem} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xs h-8 text-xs font-medium">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              {/* Desktop Table Headers */}
              <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider pb-1 px-1">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate ($)</div>
                <div className="col-span-2 text-right">Amount</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {items.map((item: InvoiceItem, index) => (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300 transition-all space-y-3 md:space-y-0"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`description-m-${item.id}`} className="text-xs font-semibold text-slate-700">
                          Item #{index + 1} Description
                        </Label>
                        <Input
                          id={`description-m-${item.id}`}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Description of service or goods"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 h-8 w-8 p-0 mt-6 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="space-y-1">
                        <Label htmlFor={`quantity-m-${item.id}`} className="text-[11px] font-semibold text-slate-600">Qty</Label>
                        <Input
                          id={`quantity-m-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="tabular-nums"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`rate-m-${item.id}`} className="text-[11px] font-semibold text-slate-600">Rate ($)</Label>
                        <Input
                          id={`rate-m-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="tabular-nums"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-600">Amount</Label>
                        <div className="h-9 px-2 text-xs font-bold bg-white border border-slate-200 rounded-md flex items-center justify-end text-slate-900 tabular-nums">
                          {formatCurrency(item.amount)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5">
                      <Input
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Description of service or product"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="tabular-nums"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id={`rate-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="tabular-nums"
                      />
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="h-9 px-3 text-sm font-bold bg-white border border-slate-200 rounded-md flex items-center justify-end text-slate-900 tabular-nums">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 h-8 w-8"
                        title="Remove line item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Template Selector */}
          <TemplateSelector template={template} setTemplate={setTemplate} />

          {/* Notes and Totals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base font-semibold text-slate-800">Payment Terms & Notes</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Bank details, e-Transfer instructions, or legal terms
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please e-Transfer to pay@company.com within 30 days. Thank you for your business!"
                  rows={6}
                  className="text-sm leading-relaxed"
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

          {/* Big Action Callout */}
          <div className="pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGenerateInvoice}
                disabled={isGeneratingPDF}
                size="lg"
                className="px-10 py-5 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all hover:scale-[1.01]"
              >
                <Send className="h-5 w-5 mr-2.5" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Generate & Download Invoice'}
              </Button>
            </div>

            <div className="text-xs text-slate-500 text-center p-4 bg-slate-100/70 rounded-xl max-w-xl mx-auto border border-slate-200/60 leading-relaxed">
              <p>
                <strong>100% Client-Side Privacy:</strong> Your data never touches a server.
                Verify all information before sending invoices. Review our{' '}
                <a href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">
                  Terms & Disclaimer
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right Preview Area */}
        <div
          className={`w-full xl:w-5/12 2xl:w-1/2 shrink-0 ${
            mobileTab === 'preview' ? 'block' : 'hidden xl:block'
          }`}
        >
          <div className="xl:sticky xl:top-6">
            <InvoicePreview
              invoice={currentInvoice}
              onDownload={handleGenerateInvoice}
              onCreateNew={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
