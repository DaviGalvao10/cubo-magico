/**
 * Definições tipadas de todas as rotas e navegações do sistema.
 */

export const ROUTES = {
  HOME: '/',
  COURSES: '/cursos',
  COURSE_3X3: '/cursos/3x3',
  COURSE_DETAIL: '/cursos/:cubeId/:level',
  LESSON: '/aula/:lessonId',
  MOVEMENTS: '/movimentos',
  ALGORITHMS: '/algoritmos',
  SPEEDCUBING: '/speedcubing',
  PATTERNS: '/padroes',
  TRAINING: '/treino',
  TESTS: '/testes',
  TEST_DETAIL: '/testes/:testId',
  PROGRESS: '/progresso',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { id: 'nav-home', label: 'Início', path: ROUTES.HOME, iconName: 'Home' },
  { id: 'nav-courses', label: 'Cursos', path: ROUTES.COURSES, iconName: 'GraduationCap' },
  { id: 'nav-movements', label: 'Movimentos', path: ROUTES.MOVEMENTS, iconName: 'Hand' },
  { id: 'nav-algorithms', label: 'Algoritmos', path: ROUTES.ALGORITHMS, iconName: 'Binary' },
  { id: 'nav-training', label: 'Treino & Timer', path: ROUTES.TRAINING, iconName: 'Timer' },
  { id: 'nav-tests', label: 'Testes', path: ROUTES.TESTS, iconName: 'CheckCircle' },
  { id: 'nav-speedcubing', label: 'Speedcubing', path: ROUTES.SPEEDCUBING, iconName: 'Zap' },
  { id: 'nav-patterns', label: 'Padrões', path: ROUTES.PATTERNS, iconName: 'Palette' },
  { id: 'nav-progress', label: 'Meu Progresso', path: ROUTES.PROGRESS, iconName: 'TrendingUp' },
];
