export type AuditPayload = Record<string, unknown>;
export function makeAuditPayload(p: AuditPayload) { return p; }
export async function auditLog(_p: AuditPayload): Promise<void> { /* no-op */ }
