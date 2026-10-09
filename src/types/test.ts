/**
 * Tipos para testes de habilidade e avaliações de conhecimento do cubo.
 */

import type { CubeId, CubeLevel } from './cube';

export type TestType = 'quiz-theory' | 'notation-test' | 'case-recognition' | 'timed-solve-test';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface TestQuestion {
  id: string;
  title: string;
  prompt: string;
  diagramUrl?: string;
  notationPrompt?: string;
  options: QuizOption[];
}

export interface SkillTest {
  id: string;
  cubeId: CubeId;
  level: CubeLevel;
  type: TestType;
  title: string;
  description: string;
  passingScorePercentage: number;
  timeLimitSeconds?: number;
  questions: TestQuestion[];
}

export interface TestAttemptResult {
  testId: string;
  cubeId: CubeId;
  level: CubeLevel;
  scorePercentage: number;
  passed: boolean;
  completedAt: number;
  correctCount: number;
  totalQuestions: number;
}
