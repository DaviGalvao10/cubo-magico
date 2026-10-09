import { useState, useEffect, useCallback } from 'react';
import type { CourseId, UserProgressState } from '../types';
import { INITIAL_USER_PROGRESS, markLessonCompleted } from '../lib/progress';
import { loadFromStorage, saveToStorage } from '../utils';

const STORAGE_KEY = 'cubo_magico_user_progress_v1';

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgressState>(() =>
    loadFromStorage<UserProgressState>(STORAGE_KEY, INITIAL_USER_PROGRESS)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, progress);
  }, [progress]);

  const completeLesson = useCallback((courseId: CourseId, lessonId: string, totalLessons: number) => {
    setProgress((prev) => markLessonCompleted(prev, courseId, lessonId, totalLessons));
  }, []);

  return {
    progress,
    completeLesson,
    activeCube: progress.activeCube,
    activeLevel: progress.activeLevel,
  };
}
