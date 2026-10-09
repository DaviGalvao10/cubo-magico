import type { Lesson, CubeId, CubeLevel } from '../../types';
import { LESSONS_3X3_BASIC } from './rubik3x3/basic';
import { LESSONS_3X3_INTERMEDIATE } from './rubik3x3/intermediate';
import { LESSONS_3X3_ADVANCED } from './rubik3x3/advanced';

export const ALL_LESSONS: Lesson[] = [
  ...LESSONS_3X3_BASIC,
  ...LESSONS_3X3_INTERMEDIATE,
  ...LESSONS_3X3_ADVANCED,
];

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonsByModuleId(moduleId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function getLessonsByCubeAndLevel(cubeId: CubeId, level: CubeLevel): Lesson[] {
  return ALL_LESSONS.filter((l) => l.cubeId === cubeId && l.level === level).sort((a, b) => a.order - b.order);
}
