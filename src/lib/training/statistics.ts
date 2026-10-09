import type { SolveResult, TrainingStats } from '../../types';

/** Calcula estatísticas completas de uma lista de tempos */
export function calculateTrainingStats(solves: SolveResult[]): TrainingStats {
  const validSolves = solves.filter((s) => s.penalty !== 'DNF');

  if (validSolves.length === 0) {
    return {
      totalSolves: solves.length,
      bestTimeMs: 0,
      worstTimeMs: 0,
      averageMs: 0,
      ao5Ms: null,
      ao12Ms: null,
      ao50Ms: null,
      ao100Ms: null,
    };
  }

  const times = validSolves.map((s) => s.effectiveTimeMs);
  const bestTimeMs = Math.min(...times);
  const worstTimeMs = Math.max(...times);
  const averageMs = Math.round(times.reduce((acc, t) => acc + t, 0) / times.length);

  return {
    totalSolves: solves.length,
    bestTimeMs,
    worstTimeMs,
    averageMs,
    ao5Ms: calculateAverageOfN(solves, 5),
    ao12Ms: calculateAverageOfN(solves, 12),
    ao50Ms: calculateAverageOfN(solves, 50),
    ao100Ms: calculateAverageOfN(solves, 100),
  };
}

/** Calcula Average of N (AoN) descartando o melhor e o pior 5% (regra oficial WCA) */
export function calculateAverageOfN(solves: SolveResult[], n: number): number | null {
  if (solves.length < n) return null;

  const windowSolves = solves.slice(-n);
  const dnfCount = windowSolves.filter((s) => s.penalty === 'DNF').length;

  // Se houver mais de 1 DNF em uma média de 5, a média é DNF (representado por null ou Infinity)
  if (dnfCount > 1) return null;

  const times = windowSolves.map((s) => (s.penalty === 'DNF' ? Infinity : s.effectiveTimeMs));
  times.sort((a, b) => a - b);

  // Descarta o melhor e o pior
  const trimmed = times.slice(1, times.length - 1);
  if (trimmed.includes(Infinity)) return null;

  const sum = trimmed.reduce((acc, t) => acc + t, 0);
  return Math.round(sum / trimmed.length);
}
