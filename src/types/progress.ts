/**
 * Tipos para acompanhamento de progresso do usuário na plataforma.
 */

import type { CubeId, CubeLevel } from './cube';
import type { CourseId } from './course';

/** Status de conclusão de uma aula */
export type CompletionStatus = 'not-started' | 'in-progress' | 'completed';

/** Registro de progresso de uma aula */
export interface LessonProgress {
  lessonId: string;
  status: CompletionStatus;
  lastStepIndex: number;
  completedAt?: number;
}

/** Registro de progresso de um curso */
export interface CourseProgress {
  courseId: CourseId;
  status: CompletionStatus;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  startedAt: number;
  completedAt?: number;
  percentage: number;
}

/** Progresso geral do usuário */
export interface UserProgressState {
  courses: Partial<Record<CourseId, CourseProgress>>;
  lessons: Record<string, LessonProgress>;
  completedTestIds: string[];
  favoriteAlgorithmIds: string[];
  unlockedBadges: string[];
  activeCube: CubeId;
  activeLevel: CubeLevel;
  lastActiveTimestamp: number;
}
