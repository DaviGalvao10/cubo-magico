import { useEffect, useMemo, useState } from 'react';
import type { TwistyPlayer } from 'cubing/twisty';
import { Badge, Button } from '../ui';
import { cubeEngine } from '../../domain/cube';
import type { StateDrivenCubeLesson } from '../../types';
import { Cube3D } from './Cube3D';
import {
  CubeAnimationController,
  type CubeAnimationSnapshot,
  type CubeAnimationSpeed,
} from './CubeAnimationController';
import './CubeAnimationLesson.css';

const SPEEDS: Array<{ id: CubeAnimationSpeed; label: string }> = [
  { id: 'slow', label: 'Lenta' },
  { id: 'normal', label: 'Normal' },
  { id: 'fast', label: 'Rápida' },
];

export function CubeAnimationLesson({
  lesson,
  showHeading = true,
}: {
  lesson: StateDrivenCubeLesson;
  showHeading?: boolean;
}) {
  const [player, setPlayer] = useState<TwistyPlayer | null>(null);
  const [controller, setController] = useState<CubeAnimationController | null>(null);
  const [snapshot, setSnapshot] = useState<CubeAnimationSnapshot | null>(null);
  const [initialState, setInitialState] = useState<Awaited<ReturnType<typeof cubeEngine.createState>> | null>(null);
  const [expectedFinalState, setExpectedFinalState] = useState<Awaited<ReturnType<typeof cubeEngine.createState>> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [finalStateVerified, setFinalStateVerified] = useState(false);

  useEffect(() => {
    let active = true;
    const finalAlgorithm = lesson.steps.at(-1)?.expectedStateAlgorithm ?? lesson.initialStateAlgorithm;
    void Promise.all([
      cubeEngine.createState(lesson.initialStateAlgorithm),
      cubeEngine.createState(finalAlgorithm),
    ]).then(([initial, expectedFinal]) => {
      if (!active) return;
      setInitialState(initial);
      setExpectedFinalState(expectedFinal);
    }).catch((reason: unknown) => {
      if (active) setLoadError(reason instanceof Error ? reason.message : 'Não foi possível preparar a animação.');
    });
    return () => { active = false; };
  }, [lesson]);

  useEffect(() => {
    if (!player || !initialState || !expectedFinalState) return undefined;
    let active = true;
    let animationController: CubeAnimationController | null = null;
    let unsubscribe = () => {};
    player.jumpToStart({ flash: false });

    void player.experimentalModel.currentPattern.get().then((visualPattern) => {
      if (!active) return;
      if (!visualPattern.isIdentical(initialState.pattern)) {
        throw new Error('O estado inicial do visualizador não corresponde ao CubeEngine.');
      }

      animationController = new CubeAnimationController(
        initialState,
        lesson.steps.map((step) => step.expectedMove),
        player,
      );
      unsubscribe = animationController.subscribe((nextSnapshot) => {
        setSnapshot(nextSnapshot);
        if (nextSnapshot.status === 'error') {
          setLoadError(nextSnapshot.error);
          setFinalStateVerified(false);
        } else if (nextSnapshot.status === 'complete') {
          const isExpectedFinalState = cubeEngine.areStatesEqual(nextSnapshot.state, expectedFinalState);
          setFinalStateVerified(isExpectedFinalState);
          if (!isExpectedFinalState) setLoadError('O estado final não corresponde à sequência definida para a aula.');
        } else {
          setFinalStateVerified(false);
        }
      });
      setController(animationController);
    }).catch((reason: unknown) => {
      if (active) setLoadError(reason instanceof Error ? reason.message : 'Não foi possível sincronizar o cubo animado.');
    });

    return () => {
      active = false;
      unsubscribe();
      animationController?.dispose();
    };
  }, [player, initialState, expectedFinalState, lesson]);

  const animation = useMemo(() => ({
    setupAlgorithm: lesson.initialStateAlgorithm,
    algorithm: lesson.steps.map((step) => step.expectedMove).join(' '),
    onPlayerReady: setPlayer,
    onPlayerError: (error: Error) => setLoadError(error.message),
  }), [lesson]);
  const currentMoveNumber = snapshot ? Math.min(snapshot.moveIndex + 1, snapshot.totalMoves) : 1;

  const reset = async () => {
    setLoadError(null);
    setFinalStateVerified(false);
    await controller?.reset();
  };

  return (
    <section className="cube-animation-lesson" aria-label={lesson.title} data-lesson-id={lesson.lessonId}>
      <div className="cube-animation-heading">
        {showHeading && (
          <div>
            <Badge variant="success" size="sm">Animação real · cubing.js</Badge>
            <h4>{lesson.title}</h4>
          </div>
        )}
        <span>{snapshot ? `${snapshot.moveIndex} / ${snapshot.totalMoves}` : `0 / ${lesson.steps.length}`}</span>
      </div>

      <div className="cube-animation-workspace">
        <Cube3D
          label="Cubo 3D embaralhado com animação de camada"
          animation={animation}
          className="cube-animation-viewer"
        />

        <div className="cube-animation-controls">
          {snapshot?.status === 'complete' ? (
            <p className="cube-animation-current-move" aria-live="polite">Sequência concluída</p>
          ) : (
            <p className="cube-animation-current-move" aria-live="polite">
              Movimento {currentMoveNumber} / {snapshot?.totalMoves ?? lesson.steps.length}
              {' — '}
              <code>{snapshot?.currentMove ?? lesson.steps[0]?.expectedMove}</code>
            </p>
          )}

          <progress
            className="cube-animation-progress"
            value={snapshot?.moveIndex ?? 0}
            max={snapshot?.totalMoves || lesson.steps.length || 1}
            aria-label="Progresso da sequência"
          />

          <div className="cube-animation-transport" aria-label="Controles da animação">
            {snapshot?.status === 'playing' ? (
              <Button type="button" variant="secondary" onClick={() => controller?.pause()} disabled={!controller}>
                <span aria-hidden="true">⏸</span> Pause
              </Button>
            ) : (
              <Button
                type="button"
                variant="cube-accent"
                onClick={() => void controller?.play()}
                disabled={!controller || snapshot?.status === 'complete' || snapshot?.status === 'error'}
              >
                <span aria-hidden="true">▶</span> Play
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => void reset()} disabled={!controller}>
              <span aria-hidden="true">↩</span> Reiniciar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void controller?.next()}
              disabled={!controller || snapshot?.status === 'playing' || snapshot?.status === 'complete' || snapshot?.status === 'error'}
            >
              <span aria-hidden="true">⏭</span> Próximo movimento
            </Button>
          </div>

          <div className="cube-animation-speed" role="group" aria-label="Velocidade da animação">
            {SPEEDS.map(({ id, label }) => (
              <Button
                key={id}
                type="button"
                variant={snapshot?.speed === id ? 'secondary' : 'ghost'}
                size="sm"
                aria-pressed={snapshot?.speed === id}
                onClick={() => controller?.setSpeed(id)}
                disabled={!controller}
              >
                {label}
              </Button>
            ))}
          </div>

          {snapshot?.status === 'complete' && finalStateVerified && (
            <p className="cube-animation-success" role="status">Estado final confirmado pelo CubeEngine.</p>
          )}
          {snapshot?.status === 'paused' && <p className="cube-animation-status" role="status">Animação pausada neste movimento.</p>}
          {loadError && <p className="cube-animation-error" role="alert">{loadError}</p>}
          {!controller && !loadError && <p className="cube-animation-status" role="status">Preparando estado e visualizador 3D…</p>}
        </div>
      </div>
    </section>
  );
}