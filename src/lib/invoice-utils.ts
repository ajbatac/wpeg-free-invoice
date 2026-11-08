import type { Invoice, InvoiceItem, BusinessInfo } from "@/shared/types";

export function calculateItemAmount(quantity: number, rate: number): number {
  const q = Number(quantity) || 0;
  const r = Number(rate) || 0;
  return Math.round(q * r * 100) / 100;
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return Math.round(items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) * 100) / 100;
}

export function calculateTaxAmount(subtotal: number, taxRate: number): number {
  const s = Number(subtotal) || 0;
  const t = Number(taxRate) || 0;
  return Math.round(s * (t / 100) * 100) / 100;
}

export function calculateTotal(subtotal: number, taxAmount: number): number {
  const s = Number(subtotal) || 0;
  const t = Number(taxAmount) || 0;
  return Math.round((s + t) * 100) / 100;
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
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(safeAmount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  // Avoid UTC timezone shift when parsing YYYY-MM-DD
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    }
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
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
