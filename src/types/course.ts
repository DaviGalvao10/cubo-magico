/**
 * Tipos para estrutura de cursos e módulos.
 * Cada cubo possui cursos divididos em Básico, Médio e Avançado.
 */

import type { CubeId, CubeLevel } from './cube';

/** Identificador único do curso */
export type CourseId = `${CubeId}-${CubeLevel}`;

/** Módulo dentro de um curso */
export interface CourseModule {
  id: string;
  courseId: CourseId;
  order: number;
  title: string;
  description: string;
  lessonIds: string[];
  estimatedMinutes: number;
}

/** Estrutura completa de um curso */
export interface Course {
  id: CourseId;
  cubeId: CubeId;
  level: CubeLevel;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  prerequisites: string[];
  moduleIds: string[];
  estimatedTotalHours: number;
  badgeAwarded?: string;
}
