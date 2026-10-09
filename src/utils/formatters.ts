import type { CubeLevel } from '../types';

/** Formata milissegundos para formato cronômetro (ex: "12.34" ou "1:23.45") */
export function formatSolveTime(ms: number): string {
  if (ms <= 0 || !isFinite(ms)) return '--.--';

  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const hundredths = Math.floor((ms % 1000) / 10);

  const secStr = seconds.toString().padStart(2, '0');
  const hundredthsStr = hundredths.toString().padStart(2, '0');

  if (minutes > 0) {
    return `${minutes}:${secStr}.${hundredthsStr}`;
  }
  return `${seconds}.${hundredthsStr}`;
}

/** Formata nível do cubo em português legível */
export function formatLevelLabel(level: CubeLevel): string {
  switch (level) {
    case 'basic':
      return 'Básico';
    case 'intermediate':
      return 'Médio';
    case 'advanced':
      return 'Avançado';
    default:
      return level;
  }
}

/** Formata tempo em minutos para texto legível (ex: "1h 30m" ou "45 min") */
export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes} min`;
}
