import type { Course, CourseId, CourseModule, CubeId, CubeLevel } from '../../types';
import { COURSES_3X3, MODULES_3X3 } from './rubik3x3';
import { COURSES_2X2, MODULES_2X2 } from './pocket2x2';
import { COURSES_4X4, MODULES_4X4 } from './revenge4x4';
import { COURSES_PYRAMINX, MODULES_PYRAMINX } from './pyraminx';

export const ALL_COURSES: Course[] = [
  ...COURSES_3X3,
  ...COURSES_2X2,
  ...COURSES_4X4,
  ...COURSES_PYRAMINX,
];

export const ALL_MODULES: CourseModule[] = [
  ...MODULES_3X3,
  ...MODULES_2X2,
  ...MODULES_4X4,
  ...MODULES_PYRAMINX,
];

/** Busca curso pelo ID */
export function getCourseById(id: CourseId): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}

/** Retorna cursos filtrados por cubo e opcionalmente nível */
export function getCoursesByCube(cubeId: CubeId, level?: CubeLevel): Course[] {
  return ALL_COURSES.filter((c) => c.cubeId === cubeId && (!level || c.level === level));
}

/** Retorna os módulos de um determinado curso */
export function getModulesByCourseId(courseId: CourseId): CourseModule[] {
  return ALL_MODULES.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
}
