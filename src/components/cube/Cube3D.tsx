import { useEffect, useRef } from 'react';
import type { TwistyPlayer } from 'cubing/twisty';
import './Cube3D.css';

type CubeFace = 'top' | 'front' | 'right';
type CubeMode = 'mixed' | 'cross' | 'last-layer' | 'solved';
type CubeFocus = 'cross' | 'corners' | 'edges' | 'top';
export type CubeVisibleFace = 'top' | 'front' | 'right';
export type CubeVisibleFacelet = { face: CubeVisibleFace; index: number };
export type CubeFaceColors = readonly [
  string, string, string,
  string, string, string,
  string, string, string,
];
export type Cube3DAnimation = {
  setupAlgorithm: string;
  algorithm: string;
  onPlayerReady: (player: TwistyPlayer | null) => void;
  onPlayerError: (error: Error) => void;
};

type Cube3DProps = {
  label?: string;
  top?: CubeFaceColors;
  front?: CubeFaceColors;
  right?: CubeFaceColors;
  mode?: CubeMode;
  variant?: number;
  focus?: CubeFocus;
  highlightedFacelets?: readonly CubeVisibleFacelet[];
  animation?: Cube3DAnimation;
  className?: string;
};

type Point = readonly [number, number];

const COLOR_NAMES = ['white', 'red', 'green', 'yellow', 'orange', 'blue'] as const;
const BASE_COLORS: Record<CubeFace, string> = {
  top: 'yellow',
  front: 'blue',
  right: 'orange',
};
const FACE_ORDER: readonly CubeFace[] = ['front', 'right', 'top'];
const CROSS_POSITIONS = new Set([1, 3, 4, 5, 7]);
const EDGE_POSITIONS = new Set([1, 3, 5, 7]);
const CORNER_POSITIONS = new Set([0, 2, 6, 8]);
const ISO_EDGE_LENGTH = 90;
const ISO_HORIZONTAL = (ISO_EDGE_LENGTH * Math.sqrt(3)) / 2;
const ISO_DEPTH = ISO_EDGE_LENGTH / 2;

function project(x: number, y: number, z: number): Point {
  return [
    110 + (x - y) * ISO_HORIZONTAL,
    120 + (x + y) * ISO_DEPTH - z * ISO_EDGE_LENGTH,
  ];
}

function pointString(points: readonly Point[]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

function pointOnFace(face: CubeFace, u: number, v: number): Point {
  if (face === 'top') return project(u, v, 1);
  if (face === 'front') return project(u, 1, 1 - v);
  return project(1, u, 1 - v);
}

function faceCorners(face: CubeFace): readonly Point[] {
  return [
    pointOnFace(face, 0, 0),
    pointOnFace(face, 1, 0),
    pointOnFace(face, 1, 1),
    pointOnFace(face, 0, 1),
  ];
}

function faceletPoints(face: CubeFace, index: number): readonly Point[] {
  const row = Math.floor(index / 3);
  const column = index % 3;
  const u0 = column / 3;
  const u1 = (column + 1) / 3;
  const v0 = row / 3;
  const v1 = (row + 1) / 3;

  return [
    pointOnFace(face, u0, v0),
    pointOnFace(face, u1, v0),
    pointOnFace(face, u1, v1),
    pointOnFace(face, u0, v1),
  ];
}

function faceGridLines(face: CubeFace): string[] {
  return [1, 2].flatMap((division) => {
    const offset = division / 3;
    return [
      `M ${pointOnFace(face, offset, 0).join(',')} L ${pointOnFace(face, offset, 1).join(',')}`,
      `M ${pointOnFace(face, 0, offset).join(',')} L ${pointOnFace(face, 1, offset).join(',')}`,
    ];
  });
}

function isFocused(
  face: CubeFace,
  index: number,
  focus?: CubeFocus,
  highlightedFacelets?: readonly CubeVisibleFacelet[],
): boolean {
  if (highlightedFacelets?.some((facelet) => facelet.face === face && facelet.index === index)) {
    return true;
  }
  if (focus === 'top') return face === 'top';
  if (focus === 'cross') return face === 'front' && CROSS_POSITIONS.has(index);
  if (focus === 'corners') return face === 'front' && CORNER_POSITIONS.has(index);
  if (focus === 'edges') return face !== 'top' && EDGE_POSITIONS.has(index);
  return false;
}

function getGeneratedColor(face: CubeFace, index: number, mode: CubeMode, variant: number): string {
  const baseColor = BASE_COLORS[face];

  if (mode === 'solved') return `var(--cube-${baseColor})`;
  if (mode === 'cross') {
    return face === 'front' && CROSS_POSITIONS.has(index)
      ? 'var(--cube-white)'
      : `var(--cube-${baseColor})`;
  }

  if (mode === 'last-layer') {
    const row = Math.floor(index / 3);
    const column = index % 3;
    if (face === 'top') {
      const isYellow = variant % 3 === 0
        ? CROSS_POSITIONS.has(index)
        : variant % 3 === 1
          ? !CORNER_POSITIONS.has(index)
          : index === 4 || EDGE_POSITIONS.has(index);
      return `var(--cube-${isYellow ? 'yellow' : 'blue'})`;
    }
    if (row === 0 && variant % 2 === 0 && column !== 1) return 'var(--cube-yellow)';
    return `var(--cube-${baseColor})`;
  }

  if (index === 4) return `var(--cube-${baseColor})`;
  const colorIndex = (
    Math.floor(index / 3) * 5 +
    (index % 3) * 3 +
    variant * 2 +
    (face === 'right' ? 1 : face === 'front' ? 2 : 0)
  ) % COLOR_NAMES.length;
  let color = COLOR_NAMES[colorIndex];
  if (color === baseColor) color = COLOR_NAMES[(colorIndex + 1) % COLOR_NAMES.length];
  return `var(--cube-${color})`;
}

function getFaceColors(
  face: CubeFace,
  explicitColors: CubeFaceColors | undefined,
  mode: CubeMode,
  variant: number,
): readonly string[] {
  if (!explicitColors) {
    return Array.from({ length: 9 }, (_, index) => getGeneratedColor(face, index, mode, variant));
  }
  if (explicitColors.length !== 9) {
    throw new RangeError(`Cube3D ${face} face requires exactly 9 sticker colors.`);
  }
  return Array.from({ length: 9 }, (_, index) => explicitColors[index]);
}

function getCubeSilhouette(): string {
  const corners = [
    project(0, 0, 1),
    project(1, 0, 1),
    project(1, 0, 0),
    project(1, 1, 0),
    project(0, 1, 0),
    project(0, 1, 1),
  ];
  return `M ${pointString(corners)} Z`;
}

function getCubeEdges(): string[] {
  return [
    [project(0, 1, 1), project(1, 1, 1)],
    [project(1, 0, 1), project(1, 1, 1)],
    [project(1, 1, 1), project(1, 1, 0)],
  ].map((edge) => `M ${edge[0].join(',')} L ${edge[1].join(',')}`);
}

function getFaceColorsByName(
  face: CubeFace,
  colors: Pick<Cube3DProps, 'top' | 'front' | 'right'>,
  mode: CubeMode,
  variant: number,
): readonly string[] {
  if (face === 'top') return getFaceColors(face, colors.top, mode, variant);
  if (face === 'front') return getFaceColors(face, colors.front, mode, variant);
  return getFaceColors(face, colors.right, mode, variant);
}

export function Cube3D({
  label = 'Cubo mágico 3×3',
  top,
  front,
  right,
  mode = 'mixed',
  variant = 0,
  focus,
  highlightedFacelets,
  animation,
  className = '',
}: Cube3DProps) {
  const animationHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animation) return undefined;
    let active = true;
    let player: TwistyPlayer | null = null;

    void import('cubing/twisty').then(({ TwistyPlayer: TwistyPlayerClass }) => {
      if (!active || !animationHost.current) return;
      player = new TwistyPlayerClass({
        puzzle: '3x3x3',
        experimentalSetupAlg: animation.setupAlgorithm,
        experimentalSetupAnchor: 'start',
        alg: animation.algorithm,
        visualization: '3D',
        controlPanel: 'none',
        hintFacelets: 'none',
        experimentalInitialHintFaceletsAnimation: 'none',
        background: 'none',
        tempoScale: 1,
      });
      animationHost.current.replaceChildren(player);
      animation.onPlayerReady(player);
    }).catch((reason: unknown) => {
      if (active) {
        animation.onPlayerError(reason instanceof Error ? reason : new Error('Não foi possível iniciar o cubo 3D.'));
      }
    });

    return () => {
      active = false;
      if (player) {
        animation.onPlayerReady(null);
        player.remove();
      }
    };
  }, [animation]);

  if (animation) {
    return (
      <div
        ref={animationHost}
        className={`cube3d cube3d--animated ${className}`.trim()}
        role="img"
        aria-label={label}
      />
    );
  }

  return (
    <svg
      className={`cube3d ${className}`.trim()}
      viewBox="0 0 220 240"
      role="img"
      aria-label={label}
      focusable="false"
    >
      <path className="cube3d-shell" d={getCubeSilhouette()} />
      {FACE_ORDER.map((face) => {
        const colors = getFaceColorsByName(face, { top, front, right }, mode, variant);
        return (
          <g className={`cube3d-face cube3d-face--${face}`} key={face}>
            <polygon className="cube3d-face-base" points={pointString(faceCorners(face))} />
            {colors.map((color, index) => (
              <polygon
                key={`${face}-${index}`}
                className={`cube3d-sticker${isFocused(face, index, focus, highlightedFacelets) ? ' is-focused' : ''}`}
                points={pointString(faceletPoints(face, index))}
                fill={color}
              />
            ))}
            <path className="cube3d-grid" d={faceGridLines(face).join(' ')} />
          </g>
        );
      })}
      <path className="cube3d-edges" d={getCubeEdges().join(' ')} />
      <path className="cube3d-outline" d={getCubeSilhouette()} />
    </svg>
  );
}
