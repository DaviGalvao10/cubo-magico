import type { CubeId, TrainingDrill } from '../../types';

export const TRAINING_DRILLS: TrainingDrill[] = [
  {
    id: 'drill-free-timer',
    cubeId: '3x3',
    type: 'free-timer',
    title: 'Resolução Livre com Cronômetro WCA',
    description: 'Embaralhe com notação oficial WCA, faça os 15 segundos de inspeção e meça seus tempos com cálculo de Ao5 e Ao12.',
    targetMetric: 'time',
    rules: [
      'Siga o scramble oficial exibido no topo.',
      'Aproveite até 15 segundos de inspeção.',
      'Pressione a barra de espaço para iniciar e parar o cronômetro.',
    ],
  },
  {
    id: 'drill-pll-trainer',
    cubeId: '3x3',
    type: 'pll-recognition',
    title: 'Treino de Reconhecimento de PLL',
    description: 'O sistema exibe uma configuração de última camada e você deve identificar o caso e executar o algoritmo correspondente o mais rápido possível.',
    targetMetric: 'time',
    rules: [
      'Identifique o caso de PLL em até 2 segundos.',
      'Execute o algoritmo sem hesitação.',
      'Evite pausar entre a rotação e o primeiro movimento.',
    ],
  },
  {
    id: 'drill-cross-trainer',
    cubeId: '3x3',
    type: 'cross-trainer',
    title: 'Planejamento de Cruz Cega',
    description: 'Planeje toda a cruz branca na inspeção e tente executá-la de olhos vendados em no máximo 8 movimentos.',
    targetMetric: 'moveCount',
    rules: [
      'Inspecione o cubo sem limite de tempo até memorizar todos os movimentos da cruz.',
      'Feche os olhos ou cubra a visão.',
      'Execute a sequência sem parar e verifique se a cruz ficou correta.',
    ],
  },
  {
    id: 'drill-f2l-lookahead',
    cubeId: '3x3',
    type: 'f2l-lookahead',
    title: 'Treino de Lookahead com Metrônomo',
    description: 'Gire em velocidade constante (1 a 2 TPS) sem parar o cubo entre os pares de F2L.',
    targetMetric: 'accuracy',
    rules: [
      'Acompanhe a batida do ritmo.',
      'Nunca pare o cubo para procurar peças.',
      'Enquanto insere um par, rastreie visualmente o próximo par de peças.',
    ],
  },
];

export function getDrillsByCube(cubeId: CubeId = '3x3'): TrainingDrill[] {
  return TRAINING_DRILLS.filter((d) => d.cubeId === cubeId);
}
