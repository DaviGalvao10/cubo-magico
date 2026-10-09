import type { TwistyPlayer } from 'cubing/twisty';
import { cubeEngine, type CubeState } from '../../domain/cube';

export type CubeAnimationSpeed = 'slow' | 'normal' | 'fast';
export type CubeAnimationStatus = 'idle' | 'playing' | 'paused' | 'complete' | 'error';

export interface CubeAnimationSnapshot {
  state: CubeState;
  moveIndex: number;
  totalMoves: number;
  currentMove: string | null;
  status: CubeAnimationStatus;
  speed: CubeAnimationSpeed;
  error: string | null;
}

type MoveBoundary = NonNullable<
  Parameters<TwistyPlayer['controller']['animationController']['play']>[0]
>['untilBoundary'];

const TEMPO_SCALE: Record<CubeAnimationSpeed, number> = {
  slow: 0.45,
  normal: 1,
  fast: 1.8,
};

export class CubeAnimationController {
  private readonly initialState: CubeState;
  private readonly moves: readonly string[];
  private readonly player: TwistyPlayer;
  private readonly engine: typeof cubeEngine;
  private readonly listeners = new Set<(snapshot: CubeAnimationSnapshot) => void>();
  private state: CubeState;
  private moveIndex = 0;
  private status: CubeAnimationStatus = 'idle';
  private speed: CubeAnimationSpeed = 'normal';
  private error: string | null = null;
  private activeRun: Promise<void> | null = null;
  private pauseRequested = false;
  private resetting = false;
  private disposed = false;
  private generation = 0;

  constructor(
    initialState: CubeState,
    moves: readonly string[],
    player: TwistyPlayer,
    engine = cubeEngine,
  ) {
    this.initialState = initialState;
    this.state = initialState;
    this.moves = [...moves];
    this.player = player;
    this.engine = engine;
  }

  getSnapshot(): CubeAnimationSnapshot {
    return {
      state: this.state,
      moveIndex: this.moveIndex,
      totalMoves: this.moves.length,
      currentMove: this.moves[this.moveIndex] ?? null,
      status: this.status,
      speed: this.speed,
      error: this.error,
    };
  }

  subscribe(listener: (snapshot: CubeAnimationSnapshot) => void): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => this.listeners.delete(listener);
  }

  play(): Promise<void> {
    return this.run(false);
  }

  next(): Promise<void> {
    return this.run(true);
  }

  pause(): void {
    if (!this.activeRun) return;
    this.pauseRequested = true;
    this.player.controller.animationController.pause();
  }

  async reset(): Promise<void> {
    if (this.disposed || this.resetting) return;
    this.resetting = true;
    this.pauseRequested = true;
    this.generation++;
    this.player.controller.animationController.pause();

    if (this.activeRun) await this.activeRun;

    this.player.controller.animationController.jumpToStart({ flash: false });
    this.state = this.initialState;
    this.moveIndex = 0;
    this.status = 'idle';
    this.error = null;
    this.pauseRequested = false;
    this.resetting = false;
    this.emit();
  }

  setSpeed(speed: CubeAnimationSpeed): void {
    this.speed = speed;
    this.player.tempoScale = TEMPO_SCALE[speed];
    this.emit();
  }

  dispose(): void {
    this.disposed = true;
    this.pauseRequested = true;
    this.generation++;
    this.player.controller.animationController.pause();
    this.listeners.clear();
  }

  private run(singleMove: boolean): Promise<void> {
    if (this.activeRun) return this.activeRun;
    if (this.disposed || this.resetting || this.status === 'complete' || this.status === 'error') {
      return Promise.resolve();
    }

    this.pauseRequested = false;
    this.error = null;
    this.status = 'playing';
    this.emit();
    const generation = this.generation;
    const operation = this.runMoves(singleMove, generation);
    this.activeRun = operation;
    void operation.finally(() => {
      if (this.activeRun === operation) this.activeRun = null;
    });
    return operation;
  }

  private async runMoves(singleMove: boolean, generation: number): Promise<void> {
    try {
      while (this.moveIndex < this.moves.length) {
        const outcome = await this.animateToNextMoveBoundary();
        if (generation !== this.generation) return;
        if (outcome === 'paused' || this.pauseRequested) {
          this.status = 'paused';
          this.emit();
          return;
        }

        const nextState = this.engine.applyAlgorithm(this.state, this.moves[this.moveIndex]);
        const visualPattern = await this.player.experimentalModel.currentPattern.get();
        if (!visualPattern.isIdentical(nextState.pattern)) {
          throw new Error(`O estado visual divergiu do motor após ${this.moves[this.moveIndex]}.`);
        }

        this.state = nextState;
        this.moveIndex++;
        this.emit();
        if (singleMove) break;
      }

      if (generation !== this.generation) return;
      this.status = this.moveIndex === this.moves.length ? 'complete' : 'paused';
      this.emit();
    } catch (reason) {
      if (generation !== this.generation) return;
      this.error = reason instanceof Error ? reason.message : 'A animação do cubo falhou.';
      this.status = 'error';
      this.emit();
    }
  }

  private animateToNextMoveBoundary(): Promise<'finished' | 'paused'> {
    return new Promise((resolve, reject) => {
      let started = false;
      const cleanup = () => this.player.experimentalModel.playingInfo.removeFreshListener(listener);
      const listener = (info: { playing: boolean }) => {
        if (info.playing) {
          started = true;
          if (this.pauseRequested) this.player.controller.animationController.pause();
        } else if (started) {
          cleanup();
          resolve(this.pauseRequested ? 'paused' : 'finished');
        }
      };

      this.player.experimentalModel.playingInfo.addFreshListener(listener);
      try {
        this.player.controller.animationController.play({
          untilBoundary: 'move' as MoveBoundary,
          autoSkipToOtherEndIfStartingAtBoundary: false,
        });
      } catch (reason) {
        cleanup();
        reject(reason);
      }
    });
  }

  private emit(): void {
    const snapshot = this.getSnapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }
}