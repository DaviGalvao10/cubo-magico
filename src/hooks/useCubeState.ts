import { useState, useCallback } from 'react';
import type { CubeId, CubeState } from '../types';
import { createSolvedCube, applyMoveToState, isCubeSolved } from '../lib/cube';

export function useCubeState(initialCubeId: CubeId = '3x3') {
  const [cube, setCube] = useState<CubeState>(() => createSolvedCube(initialCubeId));

  const reset = useCallback((cubeId?: CubeId) => {
    setCube(createSolvedCube(cubeId || cube.cubeId));
  }, [cube.cubeId]);

  const applyMove = useCallback((move: string) => {
    setCube((prev) => {
      const updated = applyMoveToState(prev, move);
      return {
        ...updated,
        isSolved: isCubeSolved(updated),
      };
    });
  }, []);

  return {
    cube,
    reset,
    applyMove,
    isSolved: cube.isSolved,
  };
}
