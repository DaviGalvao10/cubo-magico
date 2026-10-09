import type { CubeCell, CubeFace, CubeState, FaceId } from '../../types';
import { parseMove } from './notation';

/** Gira uma matriz 2D de células 90° no sentido horário */
function rotateMatrixClockwise(matrix: CubeCell[][]): CubeCell[][] {
  const size = matrix.length;
  const result: CubeCell[][] = Array.from({ length: size }, () => Array(size));

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      result[c][size - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

/** Gira uma matriz 2D de células 90° no sentido anti-horário */
function rotateMatrixCounterClockwise(matrix: CubeCell[][]): CubeCell[][] {
  const size = matrix.length;
  const result: CubeCell[][] = Array.from({ length: size }, () => Array(size));

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      result[size - 1 - c][r] = matrix[r][c];
    }
  }
  return result;
}

/** Aplica a rotação de uma face principal do cubo */
export function rotateFace(face: CubeFace, direction: 'clockwise' | 'counter-clockwise' | 'double'): CubeFace {
  if (direction === 'double') {
    return {
      id: face.id,
      cells: rotateMatrixClockwise(rotateMatrixClockwise(face.cells)),
    };
  }
  return {
    id: face.id,
    cells: direction === 'clockwise' ? rotateMatrixClockwise(face.cells) : rotateMatrixCounterClockwise(face.cells),
  };
}

/** Clona o estado do cubo de forma imutável */
export function cloneCubeState(state: CubeState): CubeState {
  const newFaces = {} as Record<FaceId, CubeFace>;

  for (const key of Object.keys(state.faces) as FaceId[]) {
    const face = state.faces[key];
    newFaces[key] = {
      id: face.id,
      cells: face.cells.map((row) => row.map((cell) => ({ ...cell }))),
    };
  }

  return {
    ...state,
    faces: newFaces,
  };
}

/** Aplica um movimento textual (ex: "R", "U'", "F2") ao estado do cubo */
export function applyMoveToState(state: CubeState, moveStr: string): CubeState {
  const move = parseMove(moveStr);
  const next = cloneCubeState(state);

  const faceKey = move.face.toUpperCase() as FaceId;
  if (next.faces[faceKey]) {
    const dir = move.isDouble ? 'double' : move.isClockwise ? 'clockwise' : 'counter-clockwise';
    next.faces[faceKey] = rotateFace(next.faces[faceKey], dir);
  }

  return next;
}
