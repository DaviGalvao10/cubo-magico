import type { KPattern } from 'cubing/kpuzzle';

export type CubeFaceId = 'U' | 'D' | 'R' | 'L' | 'F' | 'B';
export type CubeFaceColor = 'white' | 'yellow' | 'red' | 'orange' | 'blue' | 'green';
export type CubeFacelets = readonly [
  CubeFaceColor, CubeFaceColor, CubeFaceColor,
  CubeFaceColor, CubeFaceColor, CubeFaceColor,
  CubeFaceColor, CubeFaceColor, CubeFaceColor,
];
export type CubeOrbit = 'EDGES' | 'CORNERS';
export type CubePieceId =
  | 'UF' | 'UR' | 'UB' | 'UL' | 'DF' | 'DR' | 'DB' | 'DL' | 'FR' | 'FL' | 'BR' | 'BL'
  | 'UFR' | 'URB' | 'UBL' | 'ULF' | 'DRF' | 'DFL' | 'DLB' | 'DBR';

export interface CubeState {
  readonly pattern: KPattern;
  readonly faces: Readonly<Record<CubeFaceId, CubeFacelets>>;
}
