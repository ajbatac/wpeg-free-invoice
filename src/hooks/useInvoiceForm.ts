
import { useState, useEffect } from 'react';
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
} from '@/lib/invoice-utils';
import { generatePDF, downloadPDF } from '@/lib/pdf-generator';

interface UseInvoiceFormProps {
  existingInvoice?: Invoice;
  onSave?: (invoice: Invoice) => void;
}

export function useInvoiceForm({ existingInvoice, onSave }: UseInvoiceFormProps) {
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

  return {
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
  };
}
