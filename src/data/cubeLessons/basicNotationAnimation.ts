import type { StateDrivenCubeLesson } from '../../types';

const initialStateAlgorithm = "D2 L' F2 U R B2 U' R2 F' D";
const moves = ['R', 'U', "R'", "U'"];

export const BASIC_NOTATION_ANIMATION: StateDrivenCubeLesson = {
  id: 'basic-notation-move-animation',
  lessonId: 'basic-notation',
  title: 'Execute a sequência movimento por movimento',
  initialStateAlgorithm,
  steps: moves.map((expectedMove, index) => ({
    id: `notation-move-${index + 1}`,
    title: `Movimento ${index + 1}`,
    instruction: `Observe a camada girar ao executar ${expectedMove}.`,
    expectedMove,
    expectedStateAlgorithm: `${initialStateAlgorithm} ${moves.slice(0, index + 1).join(' ')}`,
    pieces: [],
    goal: {
      description: `O estado do cubo corresponde à sequência aplicada até ${expectedMove}.`,
      piecePositions: [],
    },
  })),
};