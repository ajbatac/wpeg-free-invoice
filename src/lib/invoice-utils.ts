import type { Invoice, InvoiceItem, BusinessInfo } from "@/shared/types";

export function calculateItemAmount(quantity: number, rate: number): number {
  return Math.round(quantity * rate * 100) / 100;
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;
}

export function calculateTaxAmount(subtotal: number, taxRate: number): number {
  return Math.round(subtotal * (taxRate / 100) * 100) / 100;
}

export function calculateTotal(subtotal: number, taxAmount: number): number {
  return Math.round((subtotal + taxAmount) * 100) / 100;
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}${day}-${random}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Local storage utilities
const INVOICES_STORAGE_KEY = 'invoiceflow-invoices';
const BUSINESS_INFO_STORAGE_KEY = 'invoiceflow-business-info';

export function saveInvoice(invoice: Invoice): void {
  const invoices = getStoredInvoices();
  const existingIndex = invoices.findIndex(inv => inv.id === invoice.id);
  
  if (existingIndex >= 0) {
    invoices[existingIndex] = invoice;
  } else {
    invoices.push(invoice);
  }
  
  localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
}

export function getStoredInvoices(): Invoice[] {
  try {
    const stored = localStorage.getItem(INVOICES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deleteInvoice(invoiceId: string): void {
  const invoices = getStoredInvoices();
  const filtered = invoices.filter(inv => inv.id !== invoiceId);
  localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(filtered));
}

export function saveBusinessInfo(businessInfo: BusinessInfo): void {
  localStorage.setItem(BUSINESS_INFO_STORAGE_KEY, JSON.stringify(businessInfo));
}

export function getStoredBusinessInfo(): BusinessInfo | null {
  try {
    const stored = localStorage.getItem(BUSINESS_INFO_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
