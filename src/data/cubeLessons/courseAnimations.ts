import type { StateDrivenCubeLesson } from '../../types';
import { BASIC_NOTATION_ANIMATION } from './basicNotationAnimation';
import { DAISY_STATE_ALGORITHM } from './daisy';

interface CourseAnimationDefinition {
  targetStateAlgorithm: string;
  moves: string;
}

const SCRAMBLED_TARGET = "D2 L' F2 U R B2 U' R2 F' D";
const DAISY_TARGET = DAISY_STATE_ALGORITHM;
const DAISY_SETUP_SCRAMBLE = "F2 B' R2 B' L R U' F B2 D U' B2";
const DAISY_FORMATION = "B2 U D' B2 F' U R' L' B R2 B F2";
const DAISY_TRANSFER = 'F2 R2 B2 L2';
const FIRST_LAYER_TARGET = "U R U' R' U' F' U F";
const TOP_LAYER_TARGET = 'U';
const CORNER_TRIGGER = "R U R' U'";
const RIGHT_INSERTION = "U R U' R' U' F' U F";
const LEFT_INSERTION = "U' L' U L U F U' F'";
const YELLOW_CROSS_ALGORITHM = "F R U R' U' F'";
const SUNE_ALGORITHM = "R U R' U R U2 R'";
const CORNER_CYCLE = "U R U' L' U R' U' L";
const UA_ALGORITHM = "R U' R U R U R U' R' U' R2";

const DEFINITIONS: Record<string, CourseAnimationDefinition> = {
  'cube-pieces': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: 'R' },
  'centers-edges-corners': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: 'F R' },
  'faces-and-colors': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: 'U R F' },
  'holding-the-cube': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'white-cross': { targetStateAlgorithm: DAISY_TARGET, moves: DAISY_FORMATION },
  'align-cross-edges': { targetStateAlgorithm: CORNER_TRIGGER, moves: DAISY_TRANSFER },
  'insert-white-corners': { targetStateAlgorithm: FIRST_LAYER_TARGET, moves: CORNER_TRIGGER },
  'check-first-layer': { targetStateAlgorithm: FIRST_LAYER_TARGET, moves: 'U' },
  'middle-layer-pieces': { targetStateAlgorithm: FIRST_LAYER_TARGET, moves: 'U' },
  'find-target-slot': { targetStateAlgorithm: FIRST_LAYER_TARGET, moves: 'U' },
  'insert-right': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: RIGHT_INSERTION },
  'insert-left': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: LEFT_INSERTION },
  'fix-misplaced-edge': { targetStateAlgorithm: FIRST_LAYER_TARGET, moves: RIGHT_INSERTION },
  'yellow-cross': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: YELLOW_CROSS_ALGORITHM },
  'orient-yellow-corners': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: SUNE_ALGORITHM },
  'position-yellow-corners': { targetStateAlgorithm: '', moves: CORNER_CYCLE },
  'position-yellow-edges': { targetStateAlgorithm: '', moves: UA_ALGORITHM },
  'finish-cube': { targetStateAlgorithm: '', moves: 'U' },
  'notation-review': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'efficient-moves': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "U U' U2" },
  'basic-finger-tricks': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "U U' R U R'" },
  'quick-piece-recognition': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: 'F U R' },
  'reduce-unnecessary-moves': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "U U'" },
  'recognize-patterns': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: YELLOW_CROSS_ALGORITHM },
  'algorithm-stages': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: YELLOW_CROSS_ALGORITHM },
  'maintain-orientation': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: YELLOW_CROSS_ALGORITHM },
  'repeat-and-memorize': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: YELLOW_CROSS_ALGORITHM },
  'apply-in-cases': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: `U ${YELLOW_CROSS_ALGORITHM}` },
  'speedcubing-introduction': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'improve-turning-speed': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: "U U' U2" },
  'intermediate-finger-tricks': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: "R U R'" },
  'execute-algorithms-fluidly': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'solve-without-pauses': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'analyze-a-solve': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: CORNER_TRIGGER },
  'remove-unnecessary-moves': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "U U' U2" },
  'plan-next-moves': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "R U R' U' U L U' L'" },
  'smooth-algorithm-transitions': { targetStateAlgorithm: TOP_LAYER_TARGET, moves: `${YELLOW_CROSS_ALGORITHM} U` },
  'compare-solutions': { targetStateAlgorithm: SCRAMBLED_TARGET, moves: "R U R' F R U R' U' F'" },
};

export const COURSE_ANIMATION_LESSON_IDS = [
  ...Object.keys(DEFINITIONS),
  BASIC_NOTATION_ANIMATION.lessonId,
].sort();

function invertAlgorithm(algorithm: string): string {
  return algorithm.split(/\s+/).filter(Boolean).reverse().map((move) => {
    if (move.endsWith("'")) return move.slice(0, -1);
    if (move.endsWith('2')) return move;
    return `${move}'`;
  }).join(' ');
}

function joinAlgorithms(...algorithms: string[]): string {
  return algorithms.filter(Boolean).join(' ');
}

export function createCourseAnimationLesson(lessonId: string, title: string): StateDrivenCubeLesson {
  if (lessonId === BASIC_NOTATION_ANIMATION.lessonId) {
    return { ...BASIC_NOTATION_ANIMATION, title };
  }

  const definition = DEFINITIONS[lessonId];
  if (!definition) throw new Error(`No cube animation configured for lesson: ${lessonId}`);

  const moves = definition.moves.split(/\s+/).filter(Boolean);
  const initialStateAlgorithm = joinAlgorithms(
    definition.targetStateAlgorithm,
    lessonId === 'white-cross'
      ? DAISY_SETUP_SCRAMBLE
      : invertAlgorithm(definition.moves),
  );

  return {
    id: `cube-animation-${lessonId}`,
    lessonId,
    title,
    initialStateAlgorithm,
    steps: moves.map((expectedMove, index) => ({
      id: `${lessonId}-move-${index + 1}`,
      title: `Movimento ${index + 1}`,
      instruction: `Observe a camada girar ao executar ${expectedMove}.`,
      expectedMove,
      expectedStateAlgorithm: joinAlgorithms(initialStateAlgorithm, moves.slice(0, index + 1).join(' ')),
      pieces: [],
      goal: {
        description: `Estado esperado após ${expectedMove}.`,
        piecePositions: [],
      },
    })),
  };
}