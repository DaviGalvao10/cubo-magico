import type { Lesson } from '../../../types';

export const LESSONS_3X3_ADVANCED: Lesson[] = [
  {
    id: 'les-3x3-a-1',
    moduleId: 'mod-3x3-a-1',
    courseId: '3x3-advanced',
    cubeId: '3x3',
    level: 'advanced',
    order: 1,
    title: 'Full PLL: Reconhecimento Instantâneo de 2 Lados',
    description: 'Aprenda a reconhecer qualquer um dos 21 casos de PLL olhando apenas para duas faces adjacentes sem girar o cubo.',
    durationMinutes: 40,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Regras de Blocos e Faróis',
        type: 'explanation',
        content: 'Identifique padrões de blocos 1x2, 1x3, faróis e opostos para determinar o caso sem AUF prévio.',
      },
    ],
  },
  {
    id: 'les-3x3-a-2',
    moduleId: 'mod-3x3-a-2',
    courseId: '3x3-advanced',
    cubeId: '3x3',
    level: 'advanced',
    order: 2,
    title: 'Full OLL: Domínio dos 57 Casos',
    description: 'Agrupamento inteligente por formas (T, W, L, Ponto, Quadrados) para memorização acelerada.',
    durationMinutes: 50,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Agrupamento por Famílias OLL',
        type: 'explanation',
        content: 'Divida os 57 casos em grupos menores para treinar 4 casos novos por dia.',
      },
    ],
  },
];
