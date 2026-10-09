import type { CubeId, CubePattern } from '../../types';

export const PATTERNS_CATALOG: CubePattern[] = [
  {
    id: 'pat-checkerboard',
    cubeId: '3x3',
    name: 'Tabuleiro de Xadrez (Checkerboard)',
    category: 'checkerboard',
    level: 'basic',
    notation: 'M2 E2 S2',
    reverseNotation: 'M2 E2 S2',
    description: 'O padrão decorativo mais famoso do mundo. Alterna as cores em xadrez em todas as 6 faces.',
    moveCount: 6,
    tags: ['clássico', 'xadrez', 'fácil', 'simetria'],
  },
  {
    id: 'pat-cube-in-cube',
    cubeId: '3x3',
    name: 'Cubo dentro de Cubo (Cube in a Cube)',
    category: 'cube-in-cube',
    level: 'intermediate',
    notation: "F L F U' R U F2 L2 U' L' B D' B' L2 U",
    reverseNotation: "U' L2 B D B' D L U L2 F2 U' R' U F' L' F'",
    description: 'Cria a ilusão de um mini cubo 2x2 aninhado dentro do cubo 3x3 em um canto tridimensional.',
    moveCount: 15,
    tags: ['3d', 'ilusão', 'intermediário'],
  },
  {
    id: 'pat-superflip',
    cubeId: '3x3',
    name: 'Superflip (Inversão de Todos os Meios)',
    category: 'advanced',
    level: 'advanced',
    notation: "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
    reverseNotation: "F2 U2 B2 L' R F' R2 D U R' B2 L' U2 R' B2 R' B' F' R2 U'",
    description: 'Todos os 8 cantos permanecem resolvidos, mas todos os 12 meios são virados no próprio lugar. É a primeira posição descoberta que exige exatamente 20 movimentos na métrica HTM (o "Número de Deus").',
    moveCount: 20,
    tags: ['número-de-deus', 'avançado', 'wca-história'],
  },
  {
    id: 'pat-anaconda',
    cubeId: '3x3',
    name: 'Anaconda (Serpente)',
    category: 'stripes',
    level: 'intermediate',
    notation: "L U B' U' R L' B R' F B' D R D' F'",
    reverseNotation: "F D R' D' B F' R B' L R' U B U' L'",
    description: 'Cria uma linha contínua que envolve o cubo como uma serpente colorida contínua.',
    moveCount: 14,
    tags: ['serpente', 'faixas'],
  },
  {
    id: 'pat-spots',
    cubeId: '3x3',
    name: 'Pontos Trocados (Centros em Anel)',
    category: 'spots-and-dots',
    level: 'basic',
    notation: "U D' R L' F B' U D'",
    reverseNotation: "D U' B F' L R' D U'",
    description: 'Troca os 6 centros de lugar mantendo as molduras de cantos e meios intactas.',
    moveCount: 8,
    tags: ['básico', 'pontos', 'centros'],
  },
];

export function getPatternsByCube(cubeId: CubeId = '3x3'): CubePattern[] {
  return PATTERNS_CATALOG.filter((p) => p.cubeId === cubeId);
}
