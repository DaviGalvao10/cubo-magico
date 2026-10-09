/**
 * Tipos para o catálogo de algoritmos de múltiplos cubos e métodos.
 */

import type { CubeId, CubeLevel } from './cube';

/** Categorias de algoritmos (extensível a múltiplos métodos e cubos) */
export type AlgorithmCategory =
  | 'layer-by-layer'
  | 'F2L'
  | 'OLL'
  | 'PLL'
  | 'cross'
  | 'ortega'
  | 'cll'
  | 'eg'
  | 'yau'
  | 'parity-4x4'
  | 'parity-5x5'
  | 'pyraminx-l4e'
  | 'general';

/** Caso individual de algoritmo */
export interface Algorithm {
  id: string;
  cubeId: CubeId;
  level: CubeLevel;
  category: AlgorithmCategory;
  name: string;
  codeName?: string; // Ex: "T-Perm", "Sune", "Na-Perm"
  notation: string;
  alternativeNotations?: string[];
  description: string;
  setupMoves?: string; // Movimento para montar o caso
  tags: string[];
  moveCount?: number;
}

/** Grupo ou subconjunto de algoritmos (ex: OLL 2-Look, PLL Completo) */
export interface AlgorithmGroup {
  id: string;
  cubeId: CubeId;
  category: AlgorithmCategory;
  name: string;
  description: string;
  algorithms: Algorithm[];
}
