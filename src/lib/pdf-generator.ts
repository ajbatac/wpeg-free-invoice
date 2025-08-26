import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Invoice, InvoiceTemplate } from '@/shared/types';
import { formatCurrency, formatDate } from './invoice-utils';

export async function generatePDF(invoice: Invoice): Promise<Blob> {
  // Create a temporary container for the invoice
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.width = '210mm'; // A4 width
  container.style.backgroundColor = 'white';
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  
  // Generate HTML content for the invoice
  container.innerHTML = generateInvoiceHTML(invoice, invoice.template || 'classic');
  
  document.body.appendChild(container);
  
  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    return pdf.output('blob');
  } finally {
    document.body.removeChild(container);
  }
}

function generateInvoiceHTML(invoice: Invoice, template: InvoiceTemplate = 'classic'): string {
  switch (template) {
    case 'modern':
      return generateModernTemplate(invoice);
    case 'professional':
      return generateProfessionalTemplate(invoice);
    case 'classic':
    default:
      return generateClassicTemplate(invoice);
  }
}

function generateClassicTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px;">
        <div>
          ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 80px; margin-bottom: 10px;" />` : ''}
          <h1 style="font-size: 32px; font-weight: bold; color: #1e293b; margin: 0;">${invoice.businessInfo.name}</h1>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 28px; font-weight: bold; color: #0891b2; margin: 0 0 10px 0;">INVOICE</h2>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${formatDate(invoice.date)}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
        </div>
      </div>

      <!-- Business & Client Info -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
        <div style="width: 45%;">
          <h3 style="font-size: 16px; font-weight: bold; color: #374151; margin: 0 0 10px 0;">From:</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            <p style="margin: 2px 0;"><strong>${invoice.businessInfo.name}</strong></p>
            ${invoice.businessInfo.email ? `<p style="margin: 2px 0;">${invoice.businessInfo.email}</p>` : ''}
            ${invoice.businessInfo.phone ? `<p style="margin: 2px 0;">${invoice.businessInfo.phone}</p>` : ''}
            ${invoice.businessInfo.address ? `<p style="margin: 2px 0;">${invoice.businessInfo.address}</p>` : ''}
            ${invoice.businessInfo.website ? `<p style="margin: 2px 0;">${invoice.businessInfo.website}</p>` : ''}
          </div>
        </div>
        <div style="width: 45%;">
          <h3 style="font-size: 16px; font-weight: bold; color: #374151; margin: 0 0 10px 0;">Bill To:</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            <p style="margin: 2px 0;"><strong>${invoice.clientInfo.name}</strong></p>
            <p style="margin: 2px 0;">${invoice.clientInfo.email}</p>
            ${invoice.clientInfo.phone ? `<p style="margin: 2px 0;">${invoice.clientInfo.phone}</p>` : ''}
            ${invoice.clientInfo.address ? `<p style="margin: 2px 0;">${invoice.clientInfo.address}</p>` : ''}
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f8fafc; border: 1px solid #e2e8f0;">
            <th style="padding: 12px; text-align: left; font-weight: bold; border: 1px solid #e2e8f0;">Description</th>
            <th style="padding: 12px; text-align: center; font-weight: bold; border: 1px solid #e2e8f0; width: 80px;">Qty</th>
            <th style="padding: 12px; text-align: right; font-weight: bold; border: 1px solid #e2e8f0; width: 100px;">Rate</th>
            <th style="padding: 12px; text-align: right; font-weight: bold; border: 1px solid #e2e8f0; width: 100px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr style="border: 1px solid #e2e8f0;">
              <td style="padding: 12px; border: 1px solid #e2e8f0;">${item.description}</td>
              <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">${item.quantity}</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #e2e8f0;">${formatCurrency(item.rate)}</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #e2e8f0;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 300px;">
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <span>Subtotal:</span>
            <span>${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span>Tax (${invoice.taxRate}%):</span>
              <span>${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: bold; font-size: 18px; color: #0891b2; border-bottom: 2px solid #0891b2;">
            <span>Total:</span>
            <span>${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="margin-top: 40px;">
          <h3 style="font-size: 16px; font-weight: bold; color: #374151; margin: 0 0 10px 0;">Notes:</h3>
          <p style="font-size: 14px; line-height: 1.6; color: #6b7280;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top: 60px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.ca</p>
      </div>
    </div>
  `;
}

function generateModernTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #1a1a1a; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; padding-bottom: 30px; border-bottom: 2px solid #f1f5f9;">
        <div style="flex: 1;">
          ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 140px; max-height: 90px; margin-bottom: 20px;" />` : ''}
          <h1 style="font-size: 36px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: -0.025em;">${invoice.businessInfo.name}</h1>
        </div>
        <div style="text-align: right; flex: 1;">
          <h2 style="font-size: 32px; font-weight: 300; color: #6366f1; margin: 0 0 20px 0; letter-spacing: -0.02em;">INVOICE</h2>
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; border-radius: 12px;">
            <p style="margin: 8px 0; font-size: 14px; color: #475569;"><span style="font-weight: 600;">Invoice #:</span> ${invoice.invoiceNumber}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #475569;"><span style="font-weight: 600;">Date:</span> ${formatDate(invoice.date)}</p>
            <p style="margin: 8px 0; font-size: 14px; color: #475569;"><span style="font-weight: 600;">Due Date:</span> ${formatDate(invoice.dueDate)}</p>
          </div>
        </div>
      </div>

      <!-- Business & Client Info -->
      <div style="display: flex; gap: 40px; margin-bottom: 50px;">
        <div style="flex: 1; background: #fafafa; padding: 30px; border-radius: 16px; border-left: 4px solid #6366f1;">
          <h3 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 20px 0;">From</h3>
          <div style="font-size: 15px; line-height: 1.8; color: #374151;">
            <p style="margin: 4px 0; font-weight: 600; color: #0f172a;">${invoice.businessInfo.name}</p>
            ${invoice.businessInfo.email ? `<p style="margin: 4px 0;">${invoice.businessInfo.email}</p>` : ''}
            ${invoice.businessInfo.phone ? `<p style="margin: 4px 0;">${invoice.businessInfo.phone}</p>` : ''}
            ${invoice.businessInfo.address ? `<p style="margin: 4px 0;">${invoice.businessInfo.address}</p>` : ''}
            ${invoice.businessInfo.website ? `<p style="margin: 4px 0;">${invoice.businessInfo.website}</p>` : ''}
          </div>
        </div>
        <div style="flex: 1; background: #fafafa; padding: 30px; border-radius: 16px; border-left: 4px solid #10b981;">
          <h3 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 20px 0;">To</h3>
          <div style="font-size: 15px; line-height: 1.8; color: #374151;">
            <p style="margin: 4px 0; font-weight: 600; color: #0f172a;">${invoice.clientInfo.name}</p>
            <p style="margin: 4px 0;">${invoice.clientInfo.email}</p>
            ${invoice.clientInfo.phone ? `<p style="margin: 4px 0;">${invoice.clientInfo.phone}</p>` : ''}
            ${invoice.clientInfo.address ? `<p style="margin: 4px 0;">${invoice.clientInfo.address}</p>` : ''}
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 40px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white;">
              <th style="padding: 20px; text-align: left; font-weight: 600; font-size: 15px;">Description</th>
              <th style="padding: 20px; text-align: center; font-weight: 600; font-size: 15px; width: 100px;">Qty</th>
              <th style="padding: 20px; text-align: right; font-weight: 600; font-size: 15px; width: 120px;">Rate</th>
              <th style="padding: 20px; text-align: right; font-weight: 600; font-size: 15px; width: 120px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item, index) => `
              <tr style="border-bottom: ${index === invoice.items.length - 1 ? 'none' : '1px solid #f1f5f9'};">
                <td style="padding: 20px; font-size: 15px; color: #374151;">${item.description}</td>
                <td style="padding: 20px; text-align: center; font-size: 15px; color: #374151;">${item.quantity}</td>
                <td style="padding: 20px; text-align: right; font-size: 15px; color: #374151;">${formatCurrency(item.rate)}</td>
                <td style="padding: 20px; text-align: right; font-size: 15px; font-weight: 600; color: #0f172a;">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
        <div style="width: 350px; background: #fafafa; border-radius: 16px; padding: 30px;">
          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px;">
            <span style="color: #64748b;">Subtotal</span>
            <span style="font-weight: 600; color: #0f172a;">${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px;">
              <span style="color: #64748b;">Tax (${invoice.taxRate}%)</span>
              <span style="font-weight: 600; color: #0f172a;">${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 20px 0; font-weight: 700; font-size: 20px; color: #6366f1;">
            <span>Total</span>
            <span>${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="background: #fafafa; padding: 30px; border-radius: 16px; margin-bottom: 40px;">
          <h3 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 15px 0;">Notes</h3>
          <p style="font-size: 15px; line-height: 1.7; color: #64748b; margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top: 60px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.ca</p>
      </div>
    </div>
  `;
}

function generateProfessionalTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #1e293b; font-family: 'Times New Roman', serif;">
      <!-- Header -->
      <div style="border-bottom: 3px solid #1e293b; margin-bottom: 40px; padding-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div style="width: 60%;">
            ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 80px; margin-bottom: 15px;" />` : ''}
            <h1 style="font-size: 28px; font-weight: bold; color: #1e293b; margin: 0; text-transform: uppercase; letter-spacing: 2px;">${invoice.businessInfo.name}</h1>
          </div>
          <div style="width: 35%; text-align: right;">
            <h2 style="font-size: 36px; font-weight: bold; color: #1e293b; margin: 0; text-transform: uppercase; letter-spacing: 3px;">INVOICE</h2>
          </div>
        </div>
      </div>

      <!-- Invoice Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
        <div style="width: 30%;">
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Invoice #:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${invoice.invoiceNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Issue Date:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${formatDate(invoice.date)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Due Date:</td>
              <td style="padding: 8px 0;">${formatDate(invoice.dueDate)}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Business & Client Info -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 50px;">
        <div style="width: 48%;">
          <div style="border: 2px solid #1e293b; padding: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #1e293b; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Remit To:</h3>
            <div style="font-size: 14px; line-height: 1.6;">
              <p style="margin: 6px 0; font-weight: bold;">${invoice.businessInfo.name}</p>
              ${invoice.businessInfo.address ? `<p style="margin: 6px 0;">${invoice.businessInfo.address}</p>` : ''}
              ${invoice.businessInfo.phone ? `<p style="margin: 6px 0;">Tel: ${invoice.businessInfo.phone}</p>` : ''}
              ${invoice.businessInfo.email ? `<p style="margin: 6px 0;">Email: ${invoice.businessInfo.email}</p>` : ''}
              ${invoice.businessInfo.website ? `<p style="margin: 6px 0;">Web: ${invoice.businessInfo.website}</p>` : ''}
            </div>
          </div>
        </div>
        <div style="width: 48%;">
          <div style="border: 2px solid #1e293b; padding: 25px;">
            <h3 style="font-size: 16px; font-weight: bold; color: #1e293b; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Bill To:</h3>
            <div style="font-size: 14px; line-height: 1.6;">
              <p style="margin: 6px 0; font-weight: bold;">${invoice.clientInfo.name}</p>
              ${invoice.clientInfo.address ? `<p style="margin: 6px 0;">${invoice.clientInfo.address}</p>` : ''}
              ${invoice.clientInfo.phone ? `<p style="margin: 6px 0;">Tel: ${invoice.clientInfo.phone}</p>` : ''}
              <p style="margin: 6px 0;">Email: ${invoice.clientInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 2px solid #1e293b;">
        <thead>
          <tr style="background-color: #1e293b; color: white;">
            <th style="padding: 15px; text-align: left; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Description of Services/Products</th>
            <th style="padding: 15px; text-align: center; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">Qty</th>
            <th style="padding: 15px; text-align: right; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Unit Price</th>
            <th style="padding: 15px; text-align: right; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((item, index) => `
            <tr style="border-bottom: 1px solid #1e293b; ${index % 2 === 1 ? 'background-color: #f8fafc;' : ''}">
              <td style="padding: 15px; font-size: 14px; vertical-align: top;">${item.description}</td>
              <td style="padding: 15px; text-align: center; font-size: 14px; vertical-align: top;">${item.quantity}</td>
              <td style="padding: 15px; text-align: right; font-size: 14px; vertical-align: top;">${formatCurrency(item.rate)}</td>
              <td style="padding: 15px; text-align: right; font-size: 14px; font-weight: bold; vertical-align: top;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 300px; border: 2px solid #1e293b;">
          <div style="display: flex; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #1e293b; background-color: #f8fafc; font-size: 14px;">
            <span style="font-weight: bold;">SUBTOTAL:</span>
            <span style="font-weight: bold;">${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #1e293b; background-color: #f8fafc; font-size: 14px;">
              <span style="font-weight: bold;">TAX (${invoice.taxRate}%):</span>
              <span style="font-weight: bold;">${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 20px; font-weight: bold; font-size: 18px; background-color: #1e293b; color: white; text-transform: uppercase; letter-spacing: 1px;">
            <span>TOTAL DUE:</span>
            <span>${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="margin-top: 50px; border: 1px solid #1e293b; padding: 25px;">
          <h3 style="font-size: 16px; font-weight: bold; color: #1e293b; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">Terms & Conditions:</h3>
          <p style="font-size: 14px; line-height: 1.7; margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center;">
        <p style="font-size: 12px; color: #64748b; margin: 0 0 15px 0;">
          Thank you for your business. Payment is due within the terms specified above.
        </p>
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.ca</p>
      </div>
    </div>
  `;
}

export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
