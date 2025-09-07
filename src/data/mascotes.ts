export type Mascote = {
  id: 'boris' | 'laya' | 'irina';
  name: string;
  title: string;
  blurb: string;
  src: string;
};

const mascotes: Mascote[] = [
  { id: 'boris', name: 'Boris', title: 'Especialista em Automação',
    blurb: 'Automatiza processos complexos e garante a segurança dos sistemas.',
    src: '/mascotes/boris.png' },
  { id: 'laya', name: 'Laya', title: 'Especialista em Comunicação',
    blurb: 'Organiza e optimiza a comunicação digital da tua empresa.',
    src: '/mascotes/Laya.png' },
  { id: 'irina', name: 'Irina', title: 'Especialista em Segurança',
    blurb: 'Protege os dados e fornece insights inteligentes em tempo real.',
    src: '/mascotes/Irina.png' },
];

export default mascotes;
