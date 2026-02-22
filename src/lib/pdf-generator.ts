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

export function generateInvoiceHTML(invoice: Invoice, template: InvoiceTemplate = 'classic'): string {
  switch (template) {
    case 'modern':
      return generateModernTemplate(invoice);
    case 'professional':
      return generateProfessionalTemplate(invoice);
    case 'minimalist':
      return generateMinimalistTemplate(invoice);
    case 'elegant':
      return generateElegantTemplate(invoice);
    case 'cxo':
      return generateCXOTemplate(invoice);
    case 'creative':
      return generateCreativeTemplate(invoice);
    case 'brutalist':
      return generateBrutalistTemplate(invoice);
    case 'pastel':
      return generatePastelTemplate(invoice);
    case 'eco':
      return generateEcoTemplate(invoice);
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
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.app</p>
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
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.app</p>
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
        <p style="font-size: 10px; color: #9ca3af; margin: 0;">Free Invoice by WPEG.app</p>
      </div>
    </div>
  `;
}

function generateMinimalistTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #111827; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <!-- Header -->
      <div style="margin-bottom: 60px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #111827; padding-bottom: 20px;">
          <div>
            ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 80px; margin-bottom: 15px;" />` : ''}
            <h1 style="font-size: 24px; font-weight: 600; margin: 0;">${invoice.businessInfo.name}</h1>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 32px; font-weight: 300; margin: 0 0 10px 0; letter-spacing: 2px;">INVOICE</h2>
            <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
              <p style="margin: 4px 0;">NO. ${invoice.invoiceNumber}</p>
              <p style="margin: 4px 0;">DATE ${formatDate(invoice.date)}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Business & Client Info -->
      <div style="display: flex; gap: 40px; margin-bottom: 60px;">
        <div style="flex: 1;">
          <h3 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 15px 0;">From</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            <p style="margin: 4px 0; font-weight: 500;">${invoice.businessInfo.name}</p>
            ${invoice.businessInfo.address ? `<p style="margin: 4px 0;">${invoice.businessInfo.address}</p>` : ''}
            ${invoice.businessInfo.phone ? `<p style="margin: 4px 0;">${invoice.businessInfo.phone}</p>` : ''}
            ${invoice.businessInfo.email ? `<p style="margin: 4px 0;">${invoice.businessInfo.email}</p>` : ''}
          </div>
        </div>
        <div style="flex: 1;">
          <h3 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 15px 0;">To</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            <p style="margin: 4px 0; font-weight: 500;">${invoice.clientInfo.name}</p>
            ${invoice.clientInfo.address ? `<p style="margin: 4px 0;">${invoice.clientInfo.address}</p>` : ''}
            ${invoice.clientInfo.phone ? `<p style="margin: 4px 0;">${invoice.clientInfo.phone}</p>` : ''}
            <p style="margin: 4px 0;">${invoice.clientInfo.email}</p>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
          <tr style="border-top: 1px solid #111827; border-bottom: 1px solid #111827;">
            <th style="padding: 15px 0; text-align: left; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Description</th>
            <th style="padding: 15px 0; text-align: center; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Qty</th>
            <th style="padding: 15px 0; text-align: right; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Price</th>
            <th style="padding: 15px 0; text-align: right; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((item) => `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 20px 0; font-size: 14px;">${item.description}</td>
              <td style="padding: 20px 0; text-align: center; font-size: 14px;">${item.quantity}</td>
              <td style="padding: 20px 0; text-align: right; font-size: 14px;">${formatCurrency(item.rate)}</td>
              <td style="padding: 20px 0; text-align: right; font-size: 14px; font-weight: 500;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 60px;">
        <div style="width: 300px;">
          <div style="display: flex; justify-content: space-between; padding: 12px 0; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
            <span>Subtotal</span>
            <span>${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
              <span>Tax (${invoice.taxRate}%)</span>
              <span>${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 20px 0; font-weight: 600; font-size: 18px; border-bottom: 2px solid #111827;">
            <span style="text-transform: uppercase; letter-spacing: 1px;">Total</span>
            <span>${formatCurrency(invoice.total)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 0; font-size: 14px; color: #6b7280;">
            <span>Due Date</span>
            <span>${formatDate(invoice.dueDate)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="margin-bottom: 40px;">
          <h3 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 10px 0;">Notes</h3>
          <p style="font-size: 14px; line-height: 1.6; margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top: 60px; text-align: center;">
        <p style="font-size: 11px; color: #9ca3af; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Free Invoice by WPEG.app</p>
      </div>
    </div>
  `;
}

function generateElegantTemplate(invoice: Invoice): string {
  const accentColor = '#bda87f';
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #2c3e50; font-family: 'Garamond', 'Georgia', serif; background-color: #faf9f6; padding: 40px; border: 1px solid #e8dfce;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 50px;">
        ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 80px; margin-bottom: 20px;" />` : ''}
        <h1 style="font-size: 36px; font-weight: normal; margin: 0; letter-spacing: 4px; color: #2c3e50; text-transform: uppercase;">${invoice.businessInfo.name}</h1>
        <div style="width: 50px; height: 2px; background-color: ${accentColor}; margin: 20px auto;"></div>
        <p style="font-size: 14px; color: #7f8c8d; letter-spacing: 2px; text-transform: uppercase;">
          ${invoice.businessInfo.address ? invoice.businessInfo.address.replace(/\\n/g, ' • ') : ''}
          ${invoice.businessInfo.phone ? `<br>${invoice.businessInfo.phone}` : ''}
        </p>
      </div>

      <!-- Invoice Title & Details -->
      <div style="margin-bottom: 50px; text-align: center;">
        <h2 style="font-size: 28px; font-weight: normal; margin: 0 0 20px 0; color: ${accentColor}; letter-spacing: 6px; text-transform: uppercase;">Invoice</h2>
        <table style="width: 100%; max-width: 400px; margin: 0 auto; font-size: 14px; letter-spacing: 1px;">
          <tr>
            <td style="padding: 5px; text-align: right; color: #7f8c8d; text-transform: uppercase;">Invoice No.</td>
            <td style="padding: 5px; text-align: left; font-weight: bold;">${invoice.invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px; text-align: right; color: #7f8c8d; text-transform: uppercase;">Date</td>
            <td style="padding: 5px; text-align: left; font-weight: bold;">${formatDate(invoice.date)}</td>
          </tr>
          <tr>
            <td style="padding: 5px; text-align: right; color: #7f8c8d; text-transform: uppercase;">Due Date</td>
            <td style="padding: 5px; text-align: left; font-weight: bold;">${formatDate(invoice.dueDate)}</td>
          </tr>
        </table>
      </div>

      <!-- Bill To -->
      <div style="margin-bottom: 50px; border-top: 1px solid #e8dfce; border-bottom: 1px solid #e8dfce; padding: 30px 0; text-align: center;">
        <h3 style="font-size: 14px; font-weight: normal; color: #7f8c8d; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 15px 0;">Billed To</h3>
        <p style="font-size: 18px; margin: 0 0 5px 0; font-style: italic;">${invoice.clientInfo.name}</p>
        <p style="font-size: 14px; margin: 0 0 5px 0; color: #34495e;">${invoice.clientInfo.email}</p>
        ${invoice.clientInfo.address ? `<p style="font-size: 14px; margin: 0; color: #34495e;">${invoice.clientInfo.address.replace(/\\n/g, ', ')}</p>` : ''}
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 50px;">
        <thead>
          <tr>
            <th style="padding: 15px 10px; text-align: left; font-size: 12px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px; color: #7f8c8d; border-bottom: 2px solid ${accentColor};">Item Description</th>
            <th style="padding: 15px 10px; text-align: center; font-size: 12px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px; color: #7f8c8d; border-bottom: 2px solid ${accentColor};">Qty</th>
            <th style="padding: 15px 10px; text-align: right; font-size: 12px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px; color: #7f8c8d; border-bottom: 2px solid ${accentColor};">Price</th>
            <th style="padding: 15px 10px; text-align: right; font-size: 12px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px; color: #7f8c8d; border-bottom: 2px solid ${accentColor};">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((item) => `
            <tr>
              <td style="padding: 20px 10px; font-size: 15px; border-bottom: 1px solid #e8dfce;">${item.description}</td>
              <td style="padding: 20px 10px; text-align: center; font-size: 15px; border-bottom: 1px solid #e8dfce;">${item.quantity}</td>
              <td style="padding: 20px 10px; text-align: right; font-size: 15px; border-bottom: 1px solid #e8dfce;">${formatCurrency(item.rate)}</td>
              <td style="padding: 20px 10px; text-align: right; font-size: 15px; border-bottom: 1px solid #e8dfce;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 60px;">
        <table style="width: 300px; font-size: 15px;">
          <tr>
            <td style="padding: 10px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px;">Subtotal</td>
            <td style="padding: 10px; text-align: right;">${formatCurrency(invoice.subtotal)}</td>
          </tr>
          ${invoice.taxRate > 0 ? `
            <tr>
              <td style="padding: 10px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px;">Tax (${invoice.taxRate}%)</td>
              <td style="padding: 10px; text-align: right;">${formatCurrency(invoice.taxAmount)}</td>
            </tr>
          ` : ''}
          <tr>
            <td colspan="2"><div style="width: 100%; height: 1px; background-color: ${accentColor}; margin: 10px 0;"></div></td>
          </tr>
          <tr>
            <td style="padding: 15px 10px; font-size: 18px; color: ${accentColor}; text-transform: uppercase; letter-spacing: 2px;">Total</td>
            <td style="padding: 15px 10px; text-align: right; font-size: 18px; font-weight: bold;">${formatCurrency(invoice.total)}</td>
          </tr>
        </table>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="text-align: center; font-style: italic; color: #7f8c8d; padding: 30px; border: 1px dashed #e8dfce; margin-bottom: 40px;">
          <p style="margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="text-align: center; margin-top: 50px;">
        <p style="font-size: 12px; color: #bdc3c7; letter-spacing: 2px; text-transform: uppercase;">Thank you for your business</p>
        <p style="font-size: 10px; color: #9ca3af; margin-top: 10px; font-family: sans-serif;">Generated by WPEG.app</p>
      </div>
    </div>
  `;
}

function generateCXOTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #fff; font-family: 'Inter', sans-serif; background-color: #0f172a; padding: 40px; border-radius: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 50px; border-bottom: 2px solid #334155; padding-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 100px; max-height: 100px; border-radius: 8px;" />` : ''}
          <div>
            <h1 style="font-size: 36px; font-weight: 800; margin: 0; letter-spacing: -1px; background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${invoice.businessInfo.name}</h1>
            <p style="color: #94a3b8; margin: 5px 0 0 0;">CONFIDENTIAL INVOICE</p>
          </div>
        </div>
        <div style="text-align: right; color: #cbd5e1;">
          <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 10px 0;">NO. <span style="color: #fff;">${invoice.invoiceNumber}</span></h2>
          <p style="margin: 0; font-size: 13px; text-transform: uppercase;">Issued: <span style="color: #fff;">${formatDate(invoice.date)}</span></p>
          <p style="margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase;">Due: <span style="color: #38bdf8;">${formatDate(invoice.dueDate)}</span></p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 50px; background: #1e293b; padding: 25px; border-radius: 8px;">
        <div style="width: 45%;">
          <p style="color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Issuer Details</p>
          <p style="margin: 0 0 5px 0; font-weight: 600;">${invoice.businessInfo.name}</p>
          <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">${invoice.businessInfo.email}<br/>${invoice.businessInfo.phone || ''}<br/>${invoice.businessInfo.address || ''}</p>
        </div>
        <div style="width: 45%; text-align: right;">
          <p style="color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Billed To</p>
          <p style="margin: 0 0 5px 0; font-weight: 600;">${invoice.clientInfo.name}</p>
          <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">${invoice.clientInfo.email}<br/>${invoice.clientInfo.phone || ''}<br/>${invoice.clientInfo.address || ''}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; text-align: left;">
        <thead>
          <tr style="border-bottom: 1px solid #334155;">
            <th style="padding: 15px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Description</th>
            <th style="padding: 15px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; text-align: right;">Qty</th>
            <th style="padding: 15px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; text-align: right;">Rate</th>
            <th style="padding: 15px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 20px 0; font-weight: 500;">${item.description}</td>
              <td style="padding: 20px 0; text-align: right; color: #cbd5e1;">${item.quantity}</td>
              <td style="padding: 20px 0; text-align: right; color: #cbd5e1;">${formatCurrency(item.rate)}</td>
              <td style="padding: 20px 0; text-align: right; font-weight: 600; color: #fff;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
        <div style="width: 350px; background: #1e293b; border-radius: 8px; padding: 25px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #cbd5e1;">
            <span>Subtotal</span>
            <span>${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; color: #cbd5e1;">
              <span>Tax (${invoice.taxRate}%)</span>
              <span>${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 1px solid #334155; font-size: 24px; font-weight: 700; color: #fff;">
            <span>TOTAL</span>
            <span style="color: #38bdf8;">${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

        <div style="border-top: 1px solid #334155; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div style="color: #94a3b8; font-size: 13px;">
            ${invoice.notes ? `<p style="margin: 0;">${invoice.notes.replace(/\\n/g, '<br/>')}</p>` : ''}
          </div>
          <p style="font-size: 10px; color: #64748b; margin: 0;">Free Invoice by WPEG.app</p>
        </div>
      </div>
  `;
}

function generateCreativeTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #1e1b4b; font-family: 'Poppins', sans-serif; background-color: #fefce8; padding: 40px; border: 8px solid #c7d2fe; border-radius: 20px;">
      <div style="text-align: center; margin-bottom: 50px; position: relative;">
        <!-- Decorative blobs -->
        <div style="position: absolute; top: -20px; left: -20px; width: 60px; height: 60px; background-color: #f472b6; border-radius: 50%; opacity: 0.5;"></div>
        <div style="position: absolute; top: 20px; right: -10px; width: 40px; height: 40px; background-color: #38bdf8; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; opacity: 0.5;"></div>
        
        ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 120px; border-radius: 50%; border: 4px solid #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; position: relative; z-index: 10;" />` : ''}
        
        <h1 style="font-size: 42px; font-weight: 900; margin: 0; color: #312e81; text-transform: uppercase; position: relative; z-index: 10;">${invoice.businessInfo.name}</h1>
        <div style="display: inline-block; background-color: #c7d2fe; padding: 5px 15px; border-radius: 20px; margin-top: 15px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #312e81; margin: 0; letter-spacing: 2px;">INVOICE ${invoice.invoiceNumber}</h2>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 50px; background-color: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="width: 45%;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <div style="width: 12px; height: 12px; background-color: #f472b6; border-radius: 50%;"></div>
            <h3 style="font-size: 16px; font-weight: 800; color: #312e81; margin: 0; text-transform: uppercase;">From</h3>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.8;"><strong>${invoice.businessInfo.name}</strong><br/>${invoice.businessInfo.email}<br/>${invoice.businessInfo.phone || ''}<br/>${invoice.businessInfo.address || ''}</p>
        </div>
        <div style="width: 45%;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <div style="width: 12px; height: 12px; background-color: #38bdf8; border-radius: 50%;"></div>
            <h3 style="font-size: 16px; font-weight: 800; color: #312e81; margin: 0; text-transform: uppercase;">To</h3>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.8;"><strong>${invoice.clientInfo.name}</strong><br/>${invoice.clientInfo.email}<br/>${invoice.clientInfo.phone || ''}<br/>${invoice.clientInfo.address || ''}</p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; gap: 20px; margin-bottom: 40px;">
        <div style="flex: 1; background-color: #fff; padding: 15px 20px; border-radius: 12px; text-align: center; border-bottom: 4px solid #f472b6;">
          <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: 700; color: #6366f1; text-transform: uppercase;">Invoice Date</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600;">${formatDate(invoice.date)}</p>
        </div>
        <div style="flex: 1; background-color: #fff; padding: 15px 20px; border-radius: 12px; text-align: center; border-bottom: 4px solid #38bdf8;">
          <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: 700; color: #6366f1; text-transform: uppercase;">Due Date</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600;">${formatDate(invoice.dueDate)}</p>
        </div>
      </div>

      <div style="background-color: #fff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 40px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background-color: #e0e7ff;">
              <th style="padding: 15px 20px; color: #312e81; font-size: 13px; font-weight: 700; text-transform: uppercase;">Description</th>
              <th style="padding: 15px 20px; color: #312e81; font-size: 13px; font-weight: 700; text-transform: uppercase; text-align: center;">Qty</th>
              <th style="padding: 15px 20px; color: #312e81; font-size: 13px; font-weight: 700; text-transform: uppercase; text-align: right;">Rate</th>
              <th style="padding: 15px 20px; color: #312e81; font-size: 13px; font-weight: 700; text-transform: uppercase; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item, index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#fff' : '#f8fafc'};">
                <td style="padding: 15px 20px; font-weight: 500;">${item.description}</td>
                <td style="padding: 15px 20px; text-align: center;">${item.quantity}</td>
                <td style="padding: 15px 20px; text-align: right;">${formatCurrency(item.rate)}</td>
                <td style="padding: 15px 20px; text-align: right; font-weight: 700;">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
        <div style="width: 320px;">
          <div style="display: flex; justify-content: space-between; padding: 10px 20px;">
            <span style="font-weight: 600;">Subtotal</span>
            <span>${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 10px 20px;">
              <span style="font-weight: 600;">Tax (${invoice.taxRate}%)</span>
              <span>${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin-top: 10px; background-color: #312e81; color: #fff; padding: 20px; border-radius: 15px; font-size: 22px; font-weight: 800;">
            <span>TOTAL</span>
            <span style="color: #6ee7b7;">${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      ${invoice.notes ? `
        <div style="background-color: #e0e7ff; padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #312e81;"><strong>Notes:</strong><br/>${invoice.notes.replace(/\\n/g, '<br/>')}</p>
        </div>
      ` : ''}
      <p style="text-align: center; font-size: 10px; color: #6366f1; font-weight: 600;">Free Invoice by WPEG.app</p>
    </div>
  `;
}

function generateBrutalistTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #000; font-family: 'Courier New', Courier, monospace; background-color: #fff; border: 4px solid #000; padding: 30px; position: relative;">
      <!-- Brutalist accent shadow -->
      <div style="position: absolute; top: 10px; left: 10px; width: 100%; height: 100%; border: 4px solid #000; background-color: #fef08a; z-index: -1;"></div>

      <div style="display: flex; justify-content: space-between; border-bottom: 4px solid #000; padding-bottom: 30px; margin-bottom: 30px;">
        <div>
          ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 150px; border: 2px solid #000; margin-bottom: 15px;" />` : ''}
          <h1 style="font-size: 48px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -2px;">${invoice.businessInfo.name}</h1>
        </div>
        <div style="text-align: right;">
          <div style="background-color: #000; color: #fff; display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; margin-bottom: 15px;">
            INVOICE_${invoice.invoiceNumber}
          </div>
          <p style="margin: 0; font-weight: bold; font-size: 16px;">DATE: ${formatDate(invoice.date)}</p>
          <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 16px;">DUE: ${formatDate(invoice.dueDate)}</p>
        </div>
      </div>

      <div style="display: flex; border: 4px solid #000; margin-bottom: 40px; background-color: #fff;">
        <div style="width: 50%; padding: 20px; border-right: 4px solid #000;">
          <h3 style="background-color: #000; color: #fff; display: inline-block; padding: 5px 10px; margin: 0 0 15px 0; font-size: 14px;">/// FROM ///</h3>
          <p style="margin: 0; font-size: 16px; font-weight: bold;">${invoice.businessInfo.name}</p>
          <p style="margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">${invoice.businessInfo.email}<br/>${invoice.businessInfo.phone || ''}<br/>${invoice.businessInfo.address || ''}</p>
        </div>
        <div style="width: 50%; padding: 20px;">
          <h3 style="background-color: #000; color: #fff; display: inline-block; padding: 5px 10px; margin: 0 0 15px 0; font-size: 14px;">/// TO ///</h3>
          <p style="margin: 0; font-size: 16px; font-weight: bold;">${invoice.clientInfo.name}</p>
          <p style="margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">${invoice.clientInfo.email}<br/>${invoice.clientInfo.phone || ''}<br/>${invoice.clientInfo.address || ''}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; border: 4px solid #000;">
        <thead>
          <tr style="background-color: #000; color: #fff;">
            <th style="padding: 15px; font-size: 16px; text-transform: uppercase;">Description</th>
            <th style="padding: 15px; font-size: 16px; text-transform: uppercase; text-align: center; border-left: 2px solid #fff;">QTY</th>
            <th style="padding: 15px; font-size: 16px; text-transform: uppercase; text-align: right; border-left: 2px solid #fff;">Rate</th>
            <th style="padding: 15px; font-size: 16px; text-transform: uppercase; text-align: right; border-left: 2px solid #fff;">Amt</th>
          </tr>
        </thead>
        <tbody style="background-color: #fff;">
          ${invoice.items.map(item => `
            <tr style="border-bottom: 2px solid #000;">
              <td style="padding: 15px; font-weight: bold;">${item.description}</td>
              <td style="padding: 15px; text-align: center; border-left: 2px solid #000;">${item.quantity}</td>
              <td style="padding: 15px; text-align: right; border-left: 2px solid #000;">${formatCurrency(item.rate)}</td>
              <td style="padding: 15px; text-align: right; font-weight: bold; border-left: 2px solid #000;">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
        <div style="width: 350px; border: 4px solid #000; background-color: #fff;">
          <div style="display: flex; justify-content: space-between; padding: 15px; border-bottom: 2px solid #000;">
            <span style="font-weight: bold;">SUBTOTAL:</span>
            <span>${formatCurrency(invoice.subtotal)}</span>
          </div>
          ${invoice.taxRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 15px; border-bottom: 2px solid #000;">
              <span style="font-weight: bold;">TAX (${invoice.taxRate}%):</span>
              <span>${formatCurrency(invoice.taxAmount)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 20px 15px; background-color: #fef08a; font-size: 24px; font-weight: 900;">
            <span>TOTAL:</span>
            <span>${formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      ${invoice.notes ? `
        <div style="border: 4px dashed #000; padding: 20px; background-color: #fff; margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0; font-size: 18px; text-transform: uppercase; text-decoration: underline;">NOTES:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; font-weight: bold;">${invoice.notes.replace(/\\n/g, '<br/>')}</p>
        </div>
      ` : ''}
      <p style="font-weight: bold; text-transform: uppercase; font-size: 12px;">Generated by WPEG.app</p>
    </div>
  `;
}

function generatePastelTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #5f6368; font-family: 'Quicksand', sans-serif; background-color: #fff; padding: 50px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -100px; right: -50px; width: 300px; height: 300px; background-color: #fde047; border-radius: 50%; opacity: 0.2; z-index: 0;"></div>
      <div style="position: absolute; bottom: -50px; left: -100px; width: 250px; height: 250px; background-color: #fca5a5; border-radius: 50%; opacity: 0.2; z-index: 0;"></div>

      <div style="position: relative; z-index: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px;">
          <div>
            ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 120px; max-height: 120px; border-radius: 12px; margin-bottom: 10px;" />` : ''}
            <h1 style="font-size: 32px; font-weight: 700; color: #f43f5e; margin: 0;">${invoice.businessInfo.name}</h1>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 28px; font-weight: 600; color: #0284c7; margin: 0 0 5px 0; letter-spacing: 1px;">Invoice</h2>
            <p style="margin: 0; font-size: 14px; color: #94a3b8;">#${invoice.invoiceNumber}</p>
          </div>
        </div>

        <div style="display: flex; gap: 30px; margin-bottom: 50px;">
          <div style="flex: 1; background-color: #f0fdf4; padding: 25px; border-radius: 20px;">
            <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; color: #22c55e;">Billed By</p>
            <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #1e293b;">${invoice.businessInfo.name}</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6;">${invoice.businessInfo.email}<br/>${invoice.businessInfo.phone || ''}<br/>${invoice.businessInfo.address || ''}</p>
          </div>
          <div style="flex: 1; background-color: #eff6ff; padding: 25px; border-radius: 20px;">
            <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; color: #3b82f6;">Billed To</p>
            <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #1e293b;">${invoice.clientInfo.name}</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6;">${invoice.clientInfo.email}<br/>${invoice.clientInfo.phone || ''}<br/>${invoice.clientInfo.address || ''}</p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; background-color: #f8fafc; padding: 15px 30px; border-radius: 12px;">
          <div>
            <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Date Issued</p>
            <p style="margin: 5px 0 0 0; font-size: 15px; font-weight: 600; color: #1e293b;">${formatDate(invoice.date)}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Due Date</p>
            <p style="margin: 5px 0 0 0; font-size: 15px; font-weight: 600; color: #f43f5e;">${formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 40px;">
          <thead>
            <tr>
              <th style="padding: 15px; text-align: left; font-size: 13px; color: #94a3b8; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #e2e8f0;">Item</th>
              <th style="padding: 15px; text-align: center; font-size: 13px; color: #94a3b8; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #e2e8f0;">Qty</th>
              <th style="padding: 15px; text-align: right; font-size: 13px; color: #94a3b8; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #e2e8f0;">Price</th>
              <th style="padding: 15px; text-align: right; font-size: 13px; color: #94a3b8; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #e2e8f0;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td style="padding: 20px 15px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${item.description}</td>
                <td style="padding: 20px 15px; text-align: center; border-bottom: 1px solid #f1f5f9;">${item.quantity}</td>
                <td style="padding: 20px 15px; text-align: right; border-bottom: 1px solid #f1f5f9;">${formatCurrency(item.rate)}</td>
                <td style="padding: 20px 15px; text-align: right; font-weight: 700; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 15px; color: #64748b;">
              <span>Subtotal</span>
              <span style="font-weight: 600;">${formatCurrency(invoice.subtotal)}</span>
            </div>
            ${invoice.taxRate > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 10px 15px; color: #64748b;">
                <span>Tax (${invoice.taxRate}%)</span>
                <span style="font-weight: 600;">${formatCurrency(invoice.taxAmount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; background-color: #fffbdf; padding: 20px 15px; border-radius: 12px; margin-top: 10px;">
              <span style="font-size: 18px; font-weight: 700; color: #ca8a04;">Total Due</span>
              <span style="font-size: 22px; font-weight: 800; color: #ca8a04;">${formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        ${invoice.notes ? `
          <div style="text-align: center; color: #94a3b8; padding: 20px; border-top: 2px dotted #e2e8f0;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6;">${invoice.notes.replace(/\\n/g, '<br/>')}</p>
          </div>
        ` : ''}
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 11px; color: #f43f5e; font-weight: 600;">Free Invoice by WPEG.app</p>
        </div>
      </div>
    </div>
  `;
}

function generateEcoTemplate(invoice: Invoice): string {
  return `
    <div style="max-width: 800px; margin: 0 auto; color: #3f6212; font-family: 'Georgia', serif; background-color: #f7fee7; padding: 0; border-top: 15px solid #65a30d;">
      <div style="padding: 50px 50px 30px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
          <div>
            ${invoice.businessInfo.logo ? `<img src="${invoice.businessInfo.logo}" style="max-width: 130px; max-height: 130px; margin-bottom: 15px;" />` : ''}
            <h1 style="font-size: 38px; font-weight: normal; font-style: italic; color: #4d7c0f; margin: 0;">${invoice.businessInfo.name}</h1>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 20px; font-weight: normal; color: #65a30d; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 15px 0;">Invoice</h2>
            <table style="width: 100%; max-width: 250px; text-align: right; border-collapse: collapse; margin-left: auto;">
              <tr>
                <td style="padding: 5px; color: #65a30d; font-size: 14px;">Number:</td>
                <td style="padding: 5px; font-weight: bold;">${invoice.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding: 5px; color: #65a30d; font-size: 14px;">Date:</td>
                <td style="padding: 5px; font-weight: bold;">${formatDate(invoice.date)}</td>
              </tr>
              <tr>
                <td style="padding: 5px; color: #65a30d; font-size: 14px;">Due:</td>
                <td style="padding: 5px; font-weight: bold;">${formatDate(invoice.dueDate)}</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="display: flex; border-top: 1px solid #d9f99d; border-bottom: 1px solid #d9f99d; padding: 30px 0; margin-bottom: 40px;">
          <div style="width: 50%; border-right: 1px solid #d9f99d; padding-right: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #84cc16; font-style: italic;">From:</p>
            <p style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold;">${invoice.businessInfo.name}</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4d7c0f;">${invoice.businessInfo.email}<br/>${invoice.businessInfo.phone || ''}<br/>${invoice.businessInfo.address ? invoice.businessInfo.address.replace(/\\n/g, '<br/>') : ''}</p>
          </div>
          <div style="width: 50%; padding-left: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #84cc16; font-style: italic;">To:</p>
            <p style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold;">${invoice.clientInfo.name}</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4d7c0f;">${invoice.clientInfo.email}<br/>${invoice.clientInfo.phone || ''}<br/>${invoice.clientInfo.address ? invoice.clientInfo.address.replace(/\\n/g, '<br/>') : ''}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
          <thead>
            <tr style="border-bottom: 2px solid #84cc16;">
              <th style="padding: 15px 10px; text-align: left; font-weight: normal; color: #65a30d; font-style: italic;">Description</th>
              <th style="padding: 15px 10px; text-align: center; font-weight: normal; color: #65a30d; font-style: italic;">Hours/Qty</th>
              <th style="padding: 15px 10px; text-align: right; font-weight: normal; color: #65a30d; font-style: italic;">Rate</th>
              <th style="padding: 15px 10px; text-align: right; font-weight: normal; color: #65a30d; font-style: italic;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr style="border-bottom: 1px solid #d9f99d;">
                <td style="padding: 20px 10px; font-size: 16px;">${item.description}</td>
                <td style="padding: 20px 10px; text-align: center;">${item.quantity}</td>
                <td style="padding: 20px 10px; text-align: right;">${formatCurrency(item.rate)}</td>
                <td style="padding: 20px 10px; text-align: right; font-weight: bold;">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
          <div style="width: 320px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #d9f99d;">
              <span>Subtotal:</span>
              <span>${formatCurrency(invoice.subtotal)}</span>
            </div>
            ${invoice.taxRate > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #d9f99d;">
                <span>Tax (${invoice.taxRate}%):</span>
                <span>${formatCurrency(invoice.taxAmount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; padding: 20px 0 0 0; font-size: 24px; font-weight: bold; color: #3f6212;">
              <span>Total Due:</span>
              <span>${formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        ${invoice.notes ? `
          <div style="background-color: #ecfccb; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #4d7c0f;">Notes:</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #3f6212;">${invoice.notes.replace(/\\n/g, '<br/>')}</p>
          </div>
        ` : ''}
        <p style="text-align: center; font-size: 10px; color: #65a30d; font-style: italic;">Powered by WPEG.app</p>
      </div>
      <div style="background-color: #65a30d; color: #fff; text-align: center; padding: 15px; font-size: 13px; font-style: italic;">
        Thank you for your business. Please consider the environment before printing.
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
