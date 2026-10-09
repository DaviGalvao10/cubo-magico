/**
 * Tipos fundamentais que representam os cubos e quebra-cabeças suportados.
 * Estrutura extensível para permitir adição de novos cubos (2x2, 3x3, 4x4, 5x5, Pyraminx, etc.).
 */

/** Identificadores de tipos de cubo / puzzles suportados */
export type CubeId = 
  | '2x2' 
  | '3x3' 
  | '4x4' 
  | '5x5' 
  | 'pyraminx' 
  | 'skewb' 
  | 'megaminx';

/** Níveis de dificuldade e progressão de cada cubo */
export type CubeLevel = 'basic' | 'intermediate' | 'advanced';

/** Cores padrão das faces */
export type FaceColor = 'white' | 'yellow' | 'red' | 'orange' | 'blue' | 'green';

/** Identificador de cada face de cubo padrão */
export type FaceId = 'U' | 'D' | 'R' | 'L' | 'F' | 'B';

/** Representa uma célula individual de uma face */
export interface CubeCell {
  /** Cor atual da célula */
  color: FaceColor;
  /** Face original correspondente */
  originalFace: FaceId;
}

/** Representa uma face completa do cubo */
export interface CubeFace {
  id: FaceId;
  cells: CubeCell[][];
}

/** Estado em memória do cubo (para renderização e lógica pura) */
export interface CubeState {
  cubeId: CubeId;
  size: number;
  faces: Record<FaceId, CubeFace>;
  isSolved: boolean;
}

/** Metadados de um modelo de cubo disponível na plataforma */
export interface CubePuzzleInfo {
  id: CubeId;
  name: string;
  tagline: string;
  description: string;
  dimension: string; // Ex: "3x3x3", "Tetraedro"
  order: number;
  iconName: string;
  availableLevels: CubeLevel[];
  hasInteractive3DSupport: boolean;
}
