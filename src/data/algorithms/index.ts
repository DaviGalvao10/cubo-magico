import type { Algorithm, AlgorithmCategory, CubeId, CubeLevel } from '../../types';
import { F2L_ALGORITHMS } from './f2l';
import { OLL_ALGORITHMS } from './oll';
import { PLL_ALGORITHMS } from './pll';

export const ALL_ALGORITHMS: Algorithm[] = [
  ...F2L_ALGORITHMS,
  ...OLL_ALGORITHMS,
  ...PLL_ALGORITHMS,
];

export function getAlgorithmsByCube(cubeId: CubeId): Algorithm[] {
  return ALL_ALGORITHMS.filter((a) => a.cubeId === cubeId);
}

export function getAlgorithmsByCategory(category: AlgorithmCategory, cubeId: CubeId = '3x3'): Algorithm[] {
  return ALL_ALGORITHMS.filter((a) => a.category === category && a.cubeId === cubeId);
}

export function getAlgorithmsByLevel(level: CubeLevel, cubeId: CubeId = '3x3'): Algorithm[] {
  return ALL_ALGORITHMS.filter((a) => a.level === level && a.cubeId === cubeId);
}

export function searchAlgorithms(query: string): Algorithm[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_ALGORITHMS;
  return ALL_ALGORITHMS.filter((a) => 
    a.name.toLowerCase().includes(q) ||
    a.codeName?.toLowerCase().includes(q) ||
    a.notation.toLowerCase().includes(q) ||
    a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
