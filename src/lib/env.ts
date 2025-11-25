/**
 * Valida e retorna uma variável de ambiente obrigatória.
 * Lança um erro se a variável não estiver definida.
 */
export function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${key}`);
  }
  return value;
}

/**
 * Retorna uma variável de ambiente opcional com um valor padrão.
 */
export function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}
