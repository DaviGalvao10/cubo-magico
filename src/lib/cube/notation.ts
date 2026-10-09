/**
 * Parser e utilitários para validação e desestruturação de notações de movimentos.
 */

export interface ParsedMove {
  raw: string;
  face: string;
  modifier: '' | "'" | '2';
  isClockwise: boolean;
  isDouble: boolean;
  isWide: boolean;
}

/** Divide uma sequência string em tokens de movimentos individuais */
export function tokenizeNotation(sequence: string): string[] {
  if (!sequence) return [];
  // Remove parênteses e espaços redundantes
  const clean = sequence.replace(/[()]/g, ' ').trim();
  return clean.split(/\s+/).filter(Boolean);
}

/** Analisa um movimento individual em sua estrutura semântica */
export function parseMove(token: string): ParsedMove {
  const trimmed = token.trim();
  const isWide = trimmed.includes('w') || /^[a-z]/.test(trimmed);
  const isDouble = trimmed.endsWith('2');
  const isPrime = trimmed.endsWith("'");

  const modifier: '' | "'" | '2' = isDouble ? '2' : isPrime ? "'" : '';
  const face = trimmed.replace(/['2w]/g, '');

  return {
    raw: trimmed,
    face,
    modifier,
    isClockwise: !isPrime && !isDouble,
    isDouble,
    isWide,
  };
}

/** Calcula a notação inversa de uma sequência */
export function invertMoveNotation(sequence: string): string {
  const tokens = tokenizeNotation(sequence);
  const reversed = [...tokens].reverse();

  return reversed
    .map((m) => {
      if (m.endsWith('2')) return m;
      if (m.endsWith("'")) return m.slice(0, -1);
      return `${m}'`;
    })
    .join(' ');
}
