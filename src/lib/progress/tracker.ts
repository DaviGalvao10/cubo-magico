import type { CourseId, CourseProgress, LessonProgress, UserProgressState } from '../../types';

export const INITIAL_USER_PROGRESS: UserProgressState = {
  courses: {
    '3x3-basic': {
      courseId: '3x3-basic',
      status: 'in-progress',
      completedLessonIds: [],
      percentage: 0,
      startedAt: Date.now(),
    },
    '3x3-intermediate': {
      courseId: '3x3-intermediate',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '3x3-advanced': {
      courseId: '3x3-advanced',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '2x2-basic': {
      courseId: '2x2-basic',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '2x2-intermediate': {
      courseId: '2x2-intermediate',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '2x2-advanced': {
      courseId: '2x2-advanced',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '4x4-basic': {
      courseId: '4x4-basic',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '4x4-intermediate': {
      courseId: '4x4-intermediate',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    '4x4-advanced': {
      courseId: '4x4-advanced',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    'pyraminx-basic': {
      courseId: 'pyraminx-basic',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    'pyraminx-intermediate': {
      courseId: 'pyraminx-intermediate',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
    'pyraminx-advanced': {
      courseId: 'pyraminx-advanced',
      status: 'not-started',
      completedLessonIds: [],
      percentage: 0,
      startedAt: 0,
    },
  },
  lessons: {},
  completedTestIds: [],
  favoriteAlgorithmIds: [],
  unlockedBadges: [],
  activeCube: '3x3',
  activeLevel: 'basic',
  lastActiveTimestamp: Date.now(),
};

/** Calcula a porcentagem de conclusão de um curso com base nas aulas totais */
export function calculateCoursePercentage(completedCount: number, totalCount: number): number {
  if (totalCount <= 0) return 0;
  return Math.min(100, Math.round((completedCount / totalCount) * 100));
}

/** Atualiza o progresso de uma aula */
export function markLessonCompleted(
  current: UserProgressState,
  courseId: CourseId,
  lessonId: string,
  totalLessonsInCourse: number
): UserProgressState {
  const updatedLessons: Record<string, LessonProgress> = {
    ...current.lessons,
    [lessonId]: {
      lessonId,
      status: 'completed',
      lastStepIndex: 999,
      completedAt: Date.now(),
    },
  };

  const course = current.courses[courseId] || {
    courseId,
    status: 'in-progress',
    completedLessonIds: [],
    percentage: 0,
    startedAt: Date.now(),
  };

  const completedIds = Array.from(new Set([...course.completedLessonIds, lessonId]));
  const percentage = calculateCoursePercentage(completedIds.length, totalLessonsInCourse);
  const isAllComplete = percentage >= 100;

  const updatedCourse: CourseProgress = {
    ...course,
    completedLessonIds: completedIds,
    percentage,
    status: isAllComplete ? 'completed' : 'in-progress',
    completedAt: isAllComplete ? Date.now() : course.completedAt,
    lastAccessedLessonId: lessonId,
  };

  return {
    ...current,
    lessons: updatedLessons,
    courses: {
      ...current.courses,
      [courseId]: updatedCourse,
    },
    lastActiveTimestamp: Date.now(),
  };
}
