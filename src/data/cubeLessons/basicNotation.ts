import type { StateDrivenCubeLesson } from '../../types';

export const BASIC_NOTATION_PROOF: StateDrivenCubeLesson = {
  id: 'basic-notation-right-turn',
  lessonId: 'basic-notation',
  title: 'Demonstração real: giro R',
  initialStateAlgorithm: '',
  steps: [
    {
      id: 'turn-right-face',
      title: 'Gire a face direita',
      instruction: 'Execute R. O canto UFR deve acompanhar a camada direita e chegar à posição URB.',
      expectedMove: 'R',
      expectedStateAlgorithm: 'R',
      pieces: [
        { orbit: 'CORNERS', id: 'UFR', label: 'Canto UFR (cima-frente-direita)' },
      ],
      goal: {
        description: 'O canto UFR ocupa a posição URB.',
        piecePositions: [
          { piece: { orbit: 'CORNERS', id: 'UFR' }, position: 'URB' },
        ],
      },
    },
  ],
};
