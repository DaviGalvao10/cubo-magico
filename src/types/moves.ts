/**
 * Tipos para notação de movimentos e manipulação espacial do cubo.
 */

import type { CubeId } from './cube';

/** Movimentos de face padrão */
export type FaceMove = 'R' | 'L' | 'U' | 'D' | 'F' | 'B';

/** Movimentos de camadas duplas / largas (ex: Rw, r, Uw, etc.) */
export type WideMove = 'Rw' | 'Lw' | 'Uw' | 'Dw' | 'Fw' | 'Bw' | 'r' | 'l' | 'u' | 'd' | 'f' | 'b';

/** Movimentos de camadas internas / slice (3x3) */
export type SliceMove = 'M' | 'E' | 'S';

/** Rotações do cubo inteiro */
export type CubeRotation = 'x' | 'y' | 'z';

/** Movimentos específicos de puzzles como Pyraminx (vértices e camadas) */
export type PyraminxMove = 'U' | 'L' | 'R' | 'B' | 'u' | 'l' | 'r' | 'b';

/** Modificador de movimento: horário padrão (''), anti-horário ("'"), duplo ('2') */
export type MoveModifier = '' | "'" | '2';

/** Metadados descritivos de um movimento para a interface de estudo */
export interface MoveDefinition {
  notation: string;
  cubeId: CubeId;
  name: string;
  description: string;
  axis: 'x' | 'y' | 'z';
  direction: 'clockwise' | 'counter-clockwise' | 'double';
  fingerTrickTip?: string;
}
