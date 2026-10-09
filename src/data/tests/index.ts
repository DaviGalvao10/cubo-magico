import type { CubeId, CubeLevel, SkillTest } from '../../types';

export const SKILL_TESTS: SkillTest[] = [
  {
    id: 'test-3x3-basic',
    cubeId: '3x3',
    level: 'basic',
    type: 'quiz-theory',
    title: 'Avaliação de Fundamentos 3×3',
    description: 'Teste seus conhecimentos sobre a estrutura do cubo, notação de giros e regras de resolução do método por camadas.',
    passingScorePercentage: 70,
    timeLimitSeconds: 300,
    questions: [
      {
        id: 'q1',
        title: 'Estrutura das peças',
        prompt: 'Qual a principal característica das peças de centro do cubo mágico 3×3 tradicional?',
        options: [
          { id: 'a', text: 'Eles mudam de posição conforme giramos as faces.', isCorrect: false },
          { id: 'b', text: 'Eles são fixos em relação uns aos outros e definem a cor de cada face.', isCorrect: true, explanation: 'Os 6 centros estão presos ao núcleo central e nunca mudam de posição relativa.' },
          { id: 'c', text: 'Possuem 2 cores diferentes.', isCorrect: false },
          { id: 'd', text: 'Podem ser trocados de lugar com os cantos.', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        title: 'Notação de movimentos',
        prompt: 'O que significa o movimento R\' na notação padrão WCA?',
        options: [
          { id: 'a', text: 'Girar a face direita 90° no sentido horário.', isCorrect: false },
          { id: 'b', text: 'Girar a face direita 180°.', isCorrect: false },
          { id: 'c', text: 'Girar a face direita 90° no sentido anti-horário (para baixo).', isCorrect: true, explanation: 'O apóstrofo (\') indica sentido anti-horário (Prime).' },
          { id: 'd', text: 'Girar a face esquerda no sentido horário.', isCorrect: false },
        ],
      },
      {
        id: 'q3',
        title: 'Primeira Camada',
        prompt: 'Para encaixar um canto branco na primeira camada com a técnica do Sexy Move, qual a sequência de 4 movimentos utilizada?',
        options: [
          { id: 'a', text: "R U R' U'", isCorrect: true, explanation: "R U R' U' é o gatilho clássico de 4 movimentos para posicionar e orientar cantos." },
          { id: 'b', text: "F R U' R'", isCorrect: false },
          { id: 'c', text: "R' D' R D", isCorrect: false },
          { id: 'd', text: "M2 U M2 U2", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'test-3x3-intermediate',
    cubeId: '3x3',
    level: 'intermediate',
    type: 'case-recognition',
    title: 'Desafio CFOP Reduzido: OLL e PLL',
    description: 'Teste sua capacidade de identificar rapidamente os casos de OLL e PLL e escolher o algoritmo ideal.',
    passingScorePercentage: 80,
    timeLimitSeconds: 240,
    questions: [
      {
        id: 'q-cfop-1',
        title: 'Reconhecimento de PLL',
        prompt: 'Quando você identifica "faróis" (dois cantos da mesma cor) na face traseira e precisa trocar os cantos da frente e meios adjacentes, qual algoritmo aplica?',
        options: [
          { id: 'a', text: 'T-Permutation', isCorrect: true, explanation: 'A T-Perm é o caso ideal de troca de cantos adjacentes mantendo os faróis traseiros intactos.' },
          { id: 'b', text: 'H-Permutation', isCorrect: false },
          { id: 'c', text: 'Sune', isCorrect: false },
          { id: 'd', text: 'Y-Permutation', isCorrect: false },
        ],
      },
    ],
  },
];

export function getTestsByCube(cubeId: CubeId, level?: CubeLevel): SkillTest[] {
  return SKILL_TESTS.filter((t) => t.cubeId === cubeId && (!level || t.level === level));
}

export function getTestById(id: string): SkillTest | undefined {
  return SKILL_TESTS.find((t) => t.id === id);
}
