import type { Lesson } from '../../../types';

export const LESSONS_3X3_INTERMEDIATE: Lesson[] = [
  {
    id: 'les-3x3-i-1',
    moduleId: 'mod-3x3-i-1',
    courseId: '3x3-intermediate',
    cubeId: '3x3',
    level: 'intermediate',
    order: 1,
    title: 'Fundamentos do F2L intuitivo',
    description: 'Aprenda a formar pares de canto e aresta e inseri-los juntos nos slots das duas primeiras camadas.',
    durationMinutes: 30,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Como funciona o pareamento',
        type: 'explanation',
        content: 'F2L significa formar e inserir os quatro pares que ocupam as duas primeiras camadas. Para cada slot, identifique o canto pelas três cores e a aresta correspondente pelas duas cores em comum; forme o par na camada superior e insira ambos juntos. A orientação inicial das peças determina como formar o par, então não existe um único gatilho válido para todos os casos.',
      },
    ],
  },
  {
    id: 'les-3x3-i-2',
    moduleId: 'mod-3x3-i-2',
    courseId: '3x3-intermediate',
    cubeId: '3x3',
    level: 'intermediate',
    order: 2,
    title: '2-Look OLL Essencial',
    description: 'O 2-Look OLL orienta primeiro as arestas para formar a cruz amarela e depois orienta os cantos. A sequência depende do padrão observado.',
    durationMinutes: 25,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Etapa 1: Formar a Cruz Amarela',
        type: 'algorithm-demo',
        content: 'Com amarelo em cima, observe as arestas amarelas. A sequência F R U R’ U’ F’ resolve os casos L ou linha quando mantidos na orientação correspondente; depois reavalie o topo. Para o ponto, é necessário criar e posicionar um novo caso antes de aplicar a sequência novamente.',
        algorithmNotation: "F R U R' U' F'",
      },
    ],
  },
  {
    id: 'les-3x3-i-3',
    moduleId: 'mod-3x3-i-3',
    courseId: '3x3-intermediate',
    cubeId: '3x3',
    level: 'intermediate',
    order: 3,
    title: '2-Look PLL Essencial',
    description: 'O 2-Look PLL posiciona primeiro os cantos da última camada e depois permuta suas arestas. Reconheça o caso antes de escolher o algoritmo.',
    durationMinutes: 25,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'T-Perm para Cantos',
        type: 'algorithm-demo',
        content: 'T-Perm troca um par de cantos adjacentes e um par de arestas adjacentes, mantendo a face superior orientada. Use-a somente quando o padrão corresponder ao caso T e mantenha a frente e o topo definidos durante a sequência.',
        algorithmNotation: "R U R' U' R' F R2 U' R' U' R U R' F'",
      },
    ],
  },
];
