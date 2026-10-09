/**
 * Tipos para estrutura de aulas e passos pedagógicos.
 */

import type { CubeId, CubeLevel } from './cube';

/** Tipos de blocos de conteúdo em uma aula */
export type LessonContentType = 
  | 'explanation' 
  | 'algorithm-demo' 
  | 'movement-guide' 
  | 'interactive-step' 
  | 'tip' 
  | 'warning' 
  | 'checkpoint';

/** Passo individual de uma aula */
export interface LessonStep {
  id: string;
  order: number;
  title: string;
  type: LessonContentType;
  content: string;
  algorithmNotation?: string;
  keyMoves?: string[];
  visualCue?: string;
  tip?: string;
}

/** Estrutura de uma aula */
export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  cubeId: CubeId;
  level: CubeLevel;
  order: number;
  title: string;
  description: string;
  durationMinutes: number;
  steps: LessonStep[];
  associatedAlgorithms?: string[];
  hasPracticeChallenge?: boolean;
}
