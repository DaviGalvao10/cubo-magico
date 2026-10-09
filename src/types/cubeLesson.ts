import type { CubeOrbit, CubePieceId } from '../domain/cube';

export interface PieceHighlight {
  orbit: CubeOrbit;
  id: CubePieceId;
  label: string;
}

export interface LessonGoal {
  description: string;
  piecePositions: Array<{
    piece: Pick<PieceHighlight, 'orbit' | 'id'>;
    position: string;
  }>;
}

export interface CubeLessonStep {
  id: string;
  title: string;
  instruction: string;
  expectedMove: string;
  expectedStateAlgorithm: string;
  pieces: PieceHighlight[];
  goal: LessonGoal;
}

export interface StateDrivenCubeLesson {
  id: string;
  lessonId: string;
  title: string;
  initialStateAlgorithm: string;
  steps: CubeLessonStep[];
}