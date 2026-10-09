/**
 * Tipos para a área de treinos opcionais, drills e cronômetro (Speedcubing).
 */

import type { CubeId } from './cube';

/** Tipos de treino ou drill */
export type TrainingDrillType = 
  | 'free-timer' 
  | 'pll-recognition' 
  | 'oll-recognition' 
  | 'f2l-lookahead' 
  | 'cross-trainer' 
  | 'scramble-practice'
  | 'blind-drills';

/** Especificação de um treino / drill opcional */
export interface TrainingDrill {
  id: string;
  cubeId: CubeId;
  type: TrainingDrillType;
  title: string;
  description: string;
  targetMetric: 'time' | 'accuracy' | 'moveCount';
  rules: string[];
}

/** Resolução cronometrada */
export interface SolveResult {
  id: string;
  cubeId: CubeId;
  timeMs: number;
  scramble: string;
  timestamp: number;
  penalty: 'none' | '+2' | 'DNF';
  effectiveTimeMs: number;
  drillId?: string;
  notes?: string;
}

/** Estatísticas de uma sessão de treino */
export interface TrainingStats {
  totalSolves: number;
  bestTimeMs: number;
  worstTimeMs: number;
  averageMs: number;
  ao5Ms: number | null;
  ao12Ms: number | null;
  ao50Ms: number | null;
  ao100Ms: number | null;
}

/** Configuração do timer de treino */
export interface TimerSettings {
  cubeId: CubeId;
  inspectionEnabled: boolean;
  inspectionSeconds: number;
  showMillisecondsWhileRunning: boolean;
  manualInputEnabled: boolean;
}
