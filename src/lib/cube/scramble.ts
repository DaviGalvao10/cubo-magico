import type { CubeId } from '../../types';

const MOVES_3X3 = ['R', 'L', 'U', 'D', 'F', 'B'];
const MOVES_2X2 = ['R', 'U', 'F'];
const MOVES_4X4_WIDE = ['Rw', 'Uw', 'Fw'];
const MODIFIERS = ['', "'", '2'];

const OPPOSITE_AXIS: Record<string, string> = {
  R: 'L',
  L: 'R',
  U: 'D',
  D: 'U',
  F: 'B',
  B: 'F',
};

/** Gera um scramble aleatório que obedece às regras WCA de não repetição imediata de eixo */
export function generateScramble(cubeId: CubeId = '3x3', moveCount?: number): string {
  let length = moveCount;
  let pool = MOVES_3X3;

  if (cubeId === '2x2') {
    length = length || 9;
    pool = MOVES_2X2;
  } else if (cubeId === '3x3') {
    length = length || 20;
    pool = MOVES_3X3;
  } else if (cubeId === '4x4') {
    length = length || 40;
    pool = [...MOVES_3X3, ...MOVES_4X4_WIDE];
  } else if (cubeId === '5x5') {
    length = length || 60;
    pool = [...MOVES_3X3, ...MOVES_4X4_WIDE];
  } else if (cubeId === 'pyraminx') {
    length = length || 11;
    pool = ['U', 'L', 'R', 'B'];
  } else {
    length = length || 20;
    pool = MOVES_3X3;
  }

  const result: string[] = [];
  let lastMove = '';
  let secondLastMove = '';

  for (let i = 0; i < length; i++) {
    let availableMoves = pool.filter((m) => m !== lastMove);

    // Evita repetição de mesmo eixo redundante (ex: R L R)
    if (secondLastMove && OPPOSITE_AXIS[lastMove] === secondLastMove) {
      availableMoves = availableMoves.filter((m) => m !== secondLastMove);
    }

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];

    result.push(`${move}${mod}`);
    secondLastMove = lastMove;
    lastMove = move;
  }

  // Se for Pyraminx, adiciona giros de pontas (u, l, r, b)
  if (cubeId === 'pyraminx') {
    const tips = ['u', 'l', 'r', 'b'];
    tips.forEach((tip) => {
      const chance = Math.random();
      if (chance > 0.4) {
        const mod = Math.random() > 0.5 ? "'" : '';
        result.push(`${tip}${mod}`);
      }
    });
  }

  return result.join(' ');
}
