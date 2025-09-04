import { Resend } from "resend";

const key = (process.env.RESEND_API_KEY || "").trim();

/**
 * Só criamos o cliente se houver chave.
 * Evita throw durante o build do Next (avaliação de módulos).
 */
export const resend: any = key ? new Resend(key) : null;
