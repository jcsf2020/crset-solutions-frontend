import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);
export const FROM = process.env.RESEND_FROM!;
export const TO = process.env.CONTACT_TO_EMAIL!;
