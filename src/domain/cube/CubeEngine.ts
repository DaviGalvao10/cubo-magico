import { Alg } from 'cubing/alg';
import { cube3x3x3 } from 'cubing/puzzles';
import { experimentalSolve3x3x3IgnoringCenters } from 'cubing/search';
import type { KPatternOrbitData, KPuzzle } from 'cubing/kpuzzle';
import type { CubeFaceColor, CubeFaceId, CubeFacelets, CubeOrbit, CubePieceId, CubeState } from './CubeState';

const EDGE_POSITIONS = ['UF', 'UR', 'UB', 'UL', 'DF', 'DR', 'DB', 'DL', 'FR', 'FL', 'BR', 'BL'] as const;
const CORNER_POSITIONS = ['UFR', 'URB', 'UBL', 'ULF', 'DRF', 'DFL', 'DLB', 'DBR'] as const;
const CENTER_POSITIONS = ['U', 'L', 'F', 'R', 'B', 'D'] as const;
const FACE_COLORS: Record<CubeFaceId, CubeFaceColor> = {
  U: 'yellow',
  D: 'white',
  R: 'orange',
  L: 'red',
  F: 'blue',
  B: 'green',
};

type MutableFaces = Record<CubeFaceId, CubeFaceColor[]>;
export type CubeVisibleFace = 'top' | 'front' | 'right';
export interface CubeVisibleFacelet {
  face: CubeVisibleFace;
  index: number;
}

function rotateLeft(value: string, amount: number): string {
  const offset = amount % value.length;
  return value.slice(offset) + value.slice(0, offset);
}

function cellIndex(position: string, face: CubeFaceId): number {
  const rowByFace: Record<CubeFaceId, (position: string) => number> = {
    U: (value) => value.includes('B') ? 0 : value.includes('F') ? 2 : 1,
    D: (value) => value.includes('F') ? 0 : value.includes('B') ? 2 : 1,
    R: (value) => value.includes('U') ? 0 : value.includes('D') ? 2 : 1,
    L: (value) => value.includes('U') ? 0 : value.includes('D') ? 2 : 1,
    F: (value) => value.includes('U') ? 0 : value.includes('D') ? 2 : 1,
    B: (value) => value.includes('U') ? 0 : value.includes('D') ? 2 : 1,
  };
  const columnByFace: Record<CubeFaceId, (position: string) => number> = {
    U: (value) => value.includes('L') ? 0 : value.includes('R') ? 2 : 1,
    D: (value) => value.includes('L') ? 0 : value.includes('R') ? 2 : 1,
    R: (value) => value.includes('B') ? 0 : value.includes('F') ? 2 : 1,
    L: (value) => value.includes('F') ? 0 : value.includes('B') ? 2 : 1,
    F: (value) => value.includes('L') ? 0 : value.includes('R') ? 2 : 1,
    B: (value) => value.includes('R') ? 0 : value.includes('L') ? 2 : 1,
  };
  return rowByFace[face](position) * 3 + columnByFace[face](position);
}

function emptyFaces(): MutableFaces {
  return {
    U: new Array<CubeFaceColor>(9),
    D: new Array<CubeFaceColor>(9),
    R: new Array<CubeFaceColor>(9),
    L: new Array<CubeFaceColor>(9),
    F: new Array<CubeFaceColor>(9),
    B: new Array<CubeFaceColor>(9),
  };
}

function asFacelets(colors: CubeFaceColor[], face: CubeFaceId): CubeFacelets {
  if (colors.length !== 9 || colors.some((color) => color === undefined)) {
    throw new Error(`Engine produced an invalid sticker set for face ${face}.`);
  }
  return [
    colors[0], colors[1], colors[2],
    colors[3], colors[4], colors[5],
    colors[6], colors[7], colors[8],
  ];
}

function orbitData(pattern: CubeState['pattern'], orbit: CubeOrbit): KPatternOrbitData {
  return pattern.patternData[orbit];
}

function toFacelets(pattern: CubeState['pattern']): Readonly<Record<CubeFaceId, CubeFacelets>> {
  const faces = emptyFaces();
  const centerData = pattern.patternData.CENTERS;

  CENTER_POSITIONS.forEach((position, index) => {
    const currentCenter = CENTER_POSITIONS[centerData.pieces[index]];
    const face = position as CubeFaceId;
    faces[face][4] = FACE_COLORS[currentCenter as CubeFaceId];
  });

  const assignOrbit = (orbit: CubeOrbit, positions: readonly string[]) => {
    const data = orbitData(pattern, orbit);
    positions.forEach((position, index) => {
      const piece = positions[data.pieces[index]];
      const stickers = rotateLeft(piece, data.orientation[index]);
      [...position].forEach((face, stickerIndex) => {
        const faceId = face as CubeFaceId;
        faces[faceId][cellIndex(position, faceId)] = FACE_COLORS[stickers[stickerIndex] as CubeFaceId];
      });
    });
  };

  assignOrbit('EDGES', EDGE_POSITIONS);
  assignOrbit('CORNERS', CORNER_POSITIONS);

  return {
    U: asFacelets(faces.U, 'U'),
    D: asFacelets(faces.D, 'D'),
    R: asFacelets(faces.R, 'R'),
    L: asFacelets(faces.L, 'L'),
    F: asFacelets(faces.F, 'F'),
    B: asFacelets(faces.B, 'B'),
  };
}

function createState(pattern: CubeState['pattern']): CubeState {
  return { pattern, faces: toFacelets(pattern) };
}

export class CubeEngine {
  private readonly kpuzzle: Promise<KPuzzle> = cube3x3x3.kpuzzle();

  async createState(algorithm = ''): Promise<CubeState> {
    const puzzle = await this.kpuzzle;
    const parsedAlgorithm = Alg.fromString(algorithm);
    return createState(puzzle.defaultPattern().applyAlg(parsedAlgorithm));
  }

  applyAlgorithm(state: CubeState, algorithm: string): CubeState {
    const parsedAlgorithm = Alg.fromString(algorithm);
    return createState(state.pattern.applyAlg(parsedAlgorithm));
  }

  async solve(state: CubeState): Promise<string> {
    const solution = await experimentalSolve3x3x3IgnoringCenters(state.pattern);
    const solved = state.pattern.applyAlg(solution);
    const puzzle = await this.kpuzzle;
    if (!solved.isIdentical(puzzle.defaultPattern())) {
      throw new Error('The 3×3 solver returned an algorithm that did not solve the state.');
    }
    return solution.toString();
  }

  findPiecePosition(state: CubeState, orbit: CubeOrbit, pieceId: CubePieceId): string {
    const positions = orbit === 'EDGES' ? EDGE_POSITIONS : CORNER_POSITIONS;
    const pieceIndex = positions.findIndex((position) => position === pieceId);
    if (pieceIndex < 0) {
      throw new Error(`Piece ${pieceId} does not belong to the ${orbit} orbit.`);
    }
    const location = orbitData(state.pattern, orbit).pieces.indexOf(pieceIndex);
    if (location < 0) {
      throw new Error(`Piece ${pieceId} is missing from the ${orbit} orbit.`);
    }
    return positions[location];
  }

  findVisiblePieceFacelets(
    state: CubeState,
    orbit: CubeOrbit,
    pieceId: CubePieceId,
  ): CubeVisibleFacelet[] {
    const position = this.findPiecePosition(state, orbit, pieceId);
    const visibleFaces: Partial<Record<CubeFaceId, CubeVisibleFace>> = {
      U: 'top',
      F: 'front',
      R: 'right',
    };
    return [...position].flatMap((letter) => {
      const face = visibleFaces[letter as CubeFaceId];
      if (!face) return [];
      const faceId = letter as CubeFaceId;
      return [{ face, index: cellIndex(position, faceId) }];
    });
  }

  areStatesEqual(first: CubeState, second: CubeState): boolean {
    return first.pattern.isIdentical(second.pattern);
  }
}

export const cubeEngine = new CubeEngine();
