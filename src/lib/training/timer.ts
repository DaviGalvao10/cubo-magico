import type { TimerSettings } from '../../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  cubeId: '3x3',
  inspectionEnabled: true,
  inspectionSeconds: 15,
  showMillisecondsWhileRunning: true,
  manualInputEnabled: false,
};

export type TimerPhase = 'idle' | 'holding' | 'ready' | 'inspecting' | 'running' | 'stopped';
