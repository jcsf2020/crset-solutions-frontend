export const empresa = {
  nome: 'CRSET Solutions',
  telefone: '+351 914 423 688',
  whatsapp: 'https://wa.me/351914423688?text=Quero%20demo%20CRSET',
  email: 'contacto@crsetsolutions.com',
  morada: 'Lisboa, Portugal',
  maps: 'https://maps.google.com/?q=Lisboa, Portugal',
  horario: 'Seg–Sex, 9h–18h'
} as const; export type Empresa = typeof empresa;