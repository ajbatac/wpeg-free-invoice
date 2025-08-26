import z from "zod";

export const InvoiceItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  rate: z.number().min(0, "Rate must be 0 or greater"),
  amount: z.number(),
});

export const BusinessInfoSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(), // base64 encoded image
});

export const ClientInfoSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const InvoiceTemplateSchema = z.enum(["classic", "modern", "professional"]);

export const InvoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  date: z.string(),
  dueDate: z.string(),
  businessInfo: BusinessInfoSchema,
  clientInfo: ClientInfoSchema,
  items: z.array(InvoiceItemSchema).min(1, "At least one item is required"),
  subtotal: z.number(),
  taxRate: z.number().min(0).max(100),
  taxAmount: z.number(),
  total: z.number(),
  notes: z.string().optional(),
  template: InvoiceTemplateSchema.default("classic"),
  status: z.enum(["draft", "sent", "paid"]).default("draft"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;
export type ClientInfo = z.infer<typeof ClientInfoSchema>;
export type InvoiceTemplate = z.infer<typeof InvoiceTemplateSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
