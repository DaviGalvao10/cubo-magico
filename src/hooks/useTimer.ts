import { useState, useRef, useCallback, useEffect } from 'react';
import type { CubeId, SolveResult } from '../types';
import type { TimerPhase } from '../lib/training';

export function useTimer(cubeId: CubeId = '3x3') {
  const [phase, setPhase] = useState<TimerPhase>('idle');
  const [timeMs, setTimeMs] = useState(0);
  const [solves, setSolves] = useState<SolveResult[]>([]);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    setPhase('running');
    startTimeRef.current = performance.now();
    intervalRef.current = window.setInterval(() => {
      setTimeMs(Math.floor(performance.now() - startTimeRef.current));
    }, 10);
  }, []);

  const stopTimer = useCallback((scramble: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const finalTime = Math.floor(performance.now() - startTimeRef.current);
    setTimeMs(finalTime);
    setPhase('stopped');

    const newSolve: SolveResult = {
      id: `solve-${Date.now()}`,
      cubeId,
      timeMs: finalTime,
      scramble,
      timestamp: Date.now(),
      penalty: 'none',
      effectiveTimeMs: finalTime,
    };

    setSolves((prev) => [newSolve, ...prev]);
  }, [cubeId]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPhase('idle');
    setTimeMs(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    phase,
    setPhase,
    timeMs,
    solves,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
