import { z } from 'zod';

// Schemas comuns para validação de entrada
export const QuerySchema = z.object({
  message: z.string().min(1).max(1000),
  match_count: z.number().min(1).max(10).default(3),
  similarity_threshold: z.number().min(0).max(1).default(0.2),
});

export const ChatMessageSchema = z.object({
  message: z.string().min(1).max(5000),
  context: z.string().optional(),
  model: z.string().optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  phone: z.string().optional(),
});

export const CheckoutSchema = z.object({
  priceId: z.string().min(1),
  quantity: z.number().min(1).default(1),
  email: z.string().email(),
});

export const LeadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  company: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// Tipos exportados para uso em componentes
export type QueryInput = z.infer<typeof QuerySchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
export type Checkout = z.infer<typeof CheckoutSchema>;
export type Lead = z.infer<typeof LeadSchema>;
