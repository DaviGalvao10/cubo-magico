/**
 * Tipos para a seção de Speedcubing (métodos avançados, sub-X benchmarks e técnicas).
 */

import type { CubeId } from './cube';

export type SpeedcubingMethod = 'CFOP' | 'Roux' | 'ZZ' | 'Ortega' | 'CLL' | 'EG' | 'Yau' | 'Hoya';

export interface MethodStepInfo {
  name: string;
  code: string;
  goal: string;
  caseCount: number;
  averageMoveCount: number;
}

export interface SpeedcubingMethodGuide {
  id: string;
  method: SpeedcubingMethod;
  cubeId: CubeId;
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  steps: MethodStepInfo[];
  idealFor: string;
}
