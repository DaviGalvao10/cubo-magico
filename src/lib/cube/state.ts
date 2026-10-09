import type { CubeCell, CubeFace, CubeId, CubeState, FaceColor, FaceId } from '../../types';

export const FACE_COLORS: Record<FaceId, FaceColor> = {
  U: 'yellow',
  D: 'white',
  F: 'green',
  B: 'blue',
  L: 'orange',
  R: 'red',
};

export const CUBE_DIMENSIONS: Record<CubeId, number> = {
  '2x2': 2,
  '3x3': 3,
  '4x4': 4,
  '5x5': 5,
  'pyraminx': 3,
  'skewb': 2,
  'megaminx': 3,
};

/** Cria uma face do cubo preenchida com sua cor original */
export function createFace(faceId: FaceId, size: number): CubeFace {
  const color = FACE_COLORS[faceId];
  const cells: CubeCell[][] = [];

  for (let r = 0; r < size; r++) {
    const row: CubeCell[] = [];
    for (let c = 0; c < size; c++) {
      row.push({ color, originalFace: faceId });
    }
    cells.push(row);
  }

  return { id: faceId, cells };
}

/** Cria um estado resolvido do cubo especificado */
export function createSolvedCube(cubeId: CubeId = '3x3'): CubeState {
  const size = CUBE_DIMENSIONS[cubeId] || 3;
  const faces: Record<FaceId, CubeFace> = {
    U: createFace('U', size),
    D: createFace('D', size),
    F: createFace('F', size),
    B: createFace('B', size),
    L: createFace('L', size),
    R: createFace('R', size),
  };

  return {
    cubeId,
    size,
    faces,
    isSolved: true,
  };
}

/** Verifica se todas as faces estão homogêneas (resolvido) */
export function isCubeSolved(cube: CubeState): boolean {
  const faceIds: FaceId[] = ['U', 'D', 'F', 'B', 'L', 'R'];

  for (const faceId of faceIds) {
    const face = cube.faces[faceId];
    const firstColor = face.cells[0][0]?.color;
    for (const row of face.cells) {
      for (const cell of row) {
        if (cell.color !== firstColor) {
          return false;
        }
      }
    }
  }

  return true;
}
