import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Send, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Invoice, InvoiceItem, BusinessInfo, ClientInfo, InvoiceTemplate } from '@/shared/types';
import {
  generateInvoiceNumber,
  calculateItemAmount,
  calculateSubtotal,
  calculateTaxAmount,
  calculateTotal,
  saveInvoice,
  getStoredBusinessInfo,
  saveBusinessInfo,
  formatCurrency
} from '@/lib/invoice-utils';
import { generatePDF, downloadPDF } from '@/lib/pdf-generator';

interface InvoiceFormProps {
  existingInvoice?: Invoice;
  onSave?: (invoice: Invoice) => void;
}

export default function InvoiceForm({ existingInvoice, onSave }: InvoiceFormProps) {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    logo: ''
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    return future.toISOString().split('T')[0];
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
  ]);

  const [taxRate, setTaxRate] = useState(12); // Manitoba GST (5%) + PST (7%) = 12%
  const [notes, setNotes] = useState('');
  const [template, setTemplate] = useState<InvoiceTemplate>('classic');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Load stored business info on mount
  useEffect(() => {
    if (existingInvoice) {
      setBusinessInfo(existingInvoice.businessInfo);
      setClientInfo(existingInvoice.clientInfo);
      setInvoiceNumber(existingInvoice.invoiceNumber);
      setDate(existingInvoice.date);
      setDueDate(existingInvoice.dueDate);
      setItems(existingInvoice.items);
      setTaxRate(existingInvoice.taxRate);
      setNotes(existingInvoice.notes || '');
      setTemplate(existingInvoice.template || 'classic');
    } else {
      const storedBusinessInfo = getStoredBusinessInfo();
      if (storedBusinessInfo) {
        setBusinessInfo(storedBusinessInfo);
      }
      setInvoiceNumber(generateInvoiceNumber());
    }
  }, [existingInvoice]);

  // Calculate totals
  const subtotal = calculateSubtotal(items);
  const taxAmount = calculateTaxAmount(subtotal, taxRate);
  const total = calculateTotal(subtotal, taxAmount);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = calculateItemAmount(
            typeof updatedItem.quantity === 'number' ? updatedItem.quantity : parseFloat(updatedItem.quantity as string) || 0,
            typeof updatedItem.rate === 'number' ? updatedItem.rate : parseFloat(updatedItem.rate as string) || 0
          );
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logo = e.target?.result as string;
        setBusinessInfo({ ...businessInfo, logo });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveInvoiceData = () => {
    const invoice: Invoice = {
      id: existingInvoice?.id || Date.now().toString(),
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
      updatedAt: new Date().toISOString()
    };

    saveInvoice(invoice);
    saveBusinessInfo(businessInfo);
    onSave?.(invoice);
    
    return invoice;
  };

  

  const handleGenerateInvoice = async () => {
    setIsGeneratingPDF(true);
    try {
      const invoice = saveInvoiceData();
      const blob = await generatePDF(invoice);
      downloadPDF(blob, `${invoiceNumber}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
          <p className="text-muted-foreground">Generate professional invoices in minutes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={saveInvoiceData}>
            <Save className="h-4 w-4" />
            Save Locally
          </Button>
          <Button onClick={handleGenerateInvoice} disabled={isGeneratingPDF}>
            <Send className="h-4 w-4" />
            {isGeneratingPDF ? 'Generating Invoice...' : 'Generate Invoice'}
          </Button>
        </div>
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
            {items.map((item) => (
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

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                template === 'classic' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setTemplate('classic')}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-3 bg-gray-300 rounded mb-2 mx-auto"></div>
                  <div className="w-8 h-2 bg-gray-200 rounded mb-4 mx-auto"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-1 bg-gray-300 rounded mx-auto"></div>
                    <div className="w-12 h-1 bg-gray-200 rounded mx-auto"></div>
                    <div className="w-14 h-1 bg-gray-200 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-sm">Classic</h3>
              <p className="text-xs text-muted-foreground">Traditional, clean design</p>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                template === 'modern' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setTemplate('modern')}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-md mb-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-2 mx-auto"></div>
                  <div className="w-8 h-2 bg-blue-200 rounded mb-4 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="w-16 h-2 bg-blue-100 rounded mx-auto"></div>
                    <div className="w-12 h-2 bg-purple-100 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-sm">Modern</h3>
              <p className="text-xs text-muted-foreground">Sleek, minimalist style</p>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                template === 'professional' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setTemplate('professional')}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 rounded-md mb-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-2 bg-slate-800 rounded mb-2 mx-auto"></div>
                  <div className="w-8 h-1 bg-slate-400 rounded mb-4 mx-auto"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-1 bg-slate-400 rounded mx-auto"></div>
                    <div className="w-12 h-1 bg-slate-300 rounded mx-auto"></div>
                    <div className="w-14 h-1 bg-slate-300 rounded mx-auto"></div>
                  </div>
                  <div className="w-10 h-2 bg-slate-800 rounded mt-2 mx-auto"></div>
                </div>
              </div>
              <h3 className="font-semibold text-sm">Professional</h3>
              <p className="text-xs text-muted-foreground">Formal business style</p>
            </div>
          </div>
        </CardContent>
      </Card>

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

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="tax-rate">Tax Rate (%) - MB GST+PST (12%):</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                </div>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
