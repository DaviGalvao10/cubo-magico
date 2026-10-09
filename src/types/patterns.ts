/**
 * Tipos para padrões decorativos e arte em cubos.
 */

import type { CubeId, CubeLevel } from './cube';

export type PatternCategory =
  | 'checkerboard'
  | 'stripes'
  | 'spots-and-dots'
  | 'crosses'
  | 'cube-in-cube'
  | 'symmetry'
  | 'flag'
  | 'advanced';

/** Definição de um padrão decorativo */
export interface CubePattern {
  id: string;
  cubeId: CubeId;
  name: string;
  category: PatternCategory;
  level: CubeLevel;
  notation: string;
  reverseNotation: string;
  description: string;
  moveCount: number;
  previewUrl?: string;
  tags: string[];
}
