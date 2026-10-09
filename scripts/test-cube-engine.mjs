import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const reports = [];

try {
  const { CubeEngine } = await vite.ssrLoadModule('/src/domain/cube/CubeEngine.ts');
  const { CubeAnimationController } = await vite.ssrLoadModule('/src/components/cube/CubeAnimationController.ts');
  const { Cube3D } = await vite.ssrLoadModule('/src/components/cube/Cube3D.tsx');
  const { BASIC_NOTATION_PROOF } = await vite.ssrLoadModule('/src/data/cubeLessons/basicNotation.ts');
  const { BASIC_NOTATION_ANIMATION } = await vite.ssrLoadModule('/src/data/cubeLessons/basicNotationAnimation.ts');
  const { createCourseAnimationLesson, COURSE_ANIMATION_LESSON_IDS } = await vite.ssrLoadModule('/src/data/cubeLessons/courseAnimations.ts');
  const { DAISY_STATE_ALGORITHM } = await vite.ssrLoadModule('/src/data/cubeLessons/daisy.ts');
  const { generateScramble } = await vite.ssrLoadModule('/src/lib/cube/scramble.ts');
  const engine = new CubeEngine();
  const solved = await engine.createState();
  const faceIds = ['U', 'D', 'R', 'L', 'F', 'B'];
  const colors = ['white', 'yellow', 'red', 'orange', 'blue', 'green'];
  const positions = {
    EDGES: ['UF', 'UR', 'UB', 'UL', 'DF', 'DR', 'DB', 'DL', 'FR', 'FL', 'BR', 'BL'],
    CORNERS: ['UFR', 'URB', 'UBL', 'ULF', 'DRF', 'DFL', 'DLB', 'DBR'],
  };
  const affectedPieces = {
    R: { EDGES: ['UR', 'DR', 'FR', 'BR'], CORNERS: ['UFR', 'URB', 'DRF', 'DBR'] },
    U: { EDGES: ['UF', 'UR', 'UB', 'UL'], CORNERS: ['UFR', 'URB', 'UBL', 'ULF'] },
    F: { EDGES: ['UF', 'DF', 'FR', 'FL'], CORNERS: ['UFR', 'ULF', 'DRF', 'DFL'] },
  };
  const affectedFacelets = {
    R: { U: [2, 5, 8], D: [2, 5, 8], F: [2, 5, 8], B: [0, 3, 6], R: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    U: { U: [0, 1, 2, 3, 4, 5, 6, 7, 8], F: [0, 1, 2], R: [0, 1, 2], B: [0, 1, 2], L: [0, 1, 2] },
    F: { F: [0, 1, 2, 3, 4, 5, 6, 7, 8], U: [6, 7, 8], R: [2, 5, 8], D: [0, 1, 2], L: [0, 3, 6] },
  };

  const assertLegalState = (state) => {
    const stickers = faceIds.flatMap((face) => state.faces[face]);
    assert.equal(stickers.length, 54);
    for (const face of faceIds) assert.equal(state.faces[face].length, 9, `${face} facelet count`);
    for (const color of colors) assert.equal(stickers.filter((sticker) => sticker === color).length, 9, `${color} count`);

    for (const orbitName of ['EDGES', 'CORNERS']) {
      const orbit = state.pattern.patternData[orbitName];
      const pieceCount = positions[orbitName].length;
      assert.deepEqual([...orbit.pieces].sort((a, b) => a - b), Array.from({ length: pieceCount }, (_, index) => index));
      assert.equal(
        orbit.orientation.reduce((sum, orientation) => sum + orientation, 0) % (orbitName === 'EDGES' ? 2 : 3),
        0,
        `${orbitName} orientation invariant`,
      );
    }

    const permutationParity = (permutation) => {
      let parity = 0;
      for (let first = 0; first < permutation.length; first++) {
        for (let second = first + 1; second < permutation.length; second++) {
          if (permutation[first] > permutation[second]) parity ^= 1;
        }
      }
      return parity;
    };
    assert.equal(
      permutationParity(state.pattern.patternData.EDGES.pieces),
      permutationParity(state.pattern.patternData.CORNERS.pieces),
      'edge and corner parity invariant',
    );
  };

  const visualColors = (state, face) => state.faces[face].map((color) => `var(--cube-${color})`);
  const renderCube = (state, highlightedFacelets = []) => renderToStaticMarkup(createElement(Cube3D, {
    top: visualColors(state, 'U'),
    front: visualColors(state, 'F'),
    right: visualColors(state, 'R'),
    highlightedFacelets,
  }));

  const assertVisualMatchesState = (state, highlightedFacelets = []) => {
    const svg = renderCube(state, highlightedFacelets);
    assert.equal((svg.match(/class="cube3d-sticker/g) ?? []).length, 27, 'three visible faces have 27 stickers');
    for (const [visualFace, stateFace] of [['top', 'U'], ['front', 'F'], ['right', 'R']]) {
      const start = svg.indexOf(`cube3d-face--${visualFace}`);
      const end = svg.indexOf('</g>', start);
      const stickers = [...svg.slice(start, end).matchAll(/<polygon class="([^"]+)"[^>]*fill="([^"]+)"/g)];
      assert.equal(stickers.length, 9, `${visualFace} rendered sticker count`);
      assert.deepEqual(stickers.map((sticker) => sticker[2]), visualColors(state, stateFace));
      const expectedHighlights = highlightedFacelets
        .filter((facelet) => facelet.face === visualFace)
        .map((facelet) => facelet.index);
      const actualHighlights = stickers.flatMap((sticker, index) => sticker[1].includes('is-focused') ? [index] : []);
      assert.deepEqual(actualHighlights, expectedHighlights, `${visualFace} highlighted facelets`);
    }
  };

  const daisyState = await engine.createState(DAISY_STATE_ALGORITHM);
  const topEdgeCells = [1, 3, 5, 7];
  assertLegalState(daisyState);
  assert.equal(daisyState.faces.U[4], 'yellow', 'yellow center stays on U');
  assert.ok(topEdgeCells.every((cell) => daisyState.faces.U[cell] === 'white'), 'all four white edges surround the yellow center');
  assert.ok(!topEdgeCells.every((cell) => daisyState.faces.D[cell] === 'white'), 'the white face is not a completed cross');
  assert.ok(
    daisyState.pattern.patternData.CORNERS.pieces.filter((piece, position) => piece !== position).length >= 6,
    'corners remain mixed',
  );
  assert.ok(
    daisyState.pattern.patternData.EDGES.pieces.filter((piece, position) => piece !== position).length >= 8,
    'the remaining edges remain mixed',
  );
  assert.ok(Object.values(daisyState.faces).every((stickers) => new Set(stickers).size > 1), 'no face is solved');
  assertVisualMatchesState(daisyState);
  reports.push('reachable daisy state: four white U edges, no white cross, mixed cubies/faces, exact Cube3D colors');

  assert.equal(COURSE_ANIMATION_LESSON_IDS.length, 39, 'all visible basic and intermediate lesson visuals have animation data');
  assert.equal(new Set(COURSE_ANIMATION_LESSON_IDS).size, 39, 'lesson animation data contains no duplicate ids');
  assert.deepEqual(COURSE_ANIMATION_LESSON_IDS, [
    'align-cross-edges', 'algorithm-stages', 'analyze-a-solve', 'apply-in-cases', 'basic-finger-tricks',
    'basic-notation', 'centers-edges-corners', 'check-first-layer', 'compare-solutions', 'cube-pieces',
    'efficient-moves', 'execute-algorithms-fluidly', 'faces-and-colors', 'finish-cube', 'find-target-slot',
    'fix-misplaced-edge', 'holding-the-cube', 'improve-turning-speed', 'insert-left', 'insert-right',
    'insert-white-corners', 'intermediate-finger-tricks', 'maintain-orientation', 'middle-layer-pieces',
    'notation-review', 'orient-yellow-corners', 'plan-next-moves', 'position-yellow-corners',
    'position-yellow-edges', 'quick-piece-recognition', 'recognize-patterns', 'reduce-unnecessary-moves',
    'remove-unnecessary-moves', 'repeat-and-memorize', 'smooth-algorithm-transitions', 'solve-without-pauses',
    'speedcubing-introduction', 'white-cross', 'yellow-cross',
  ].sort());
  const firstLayerIsSolved = (state) => state.faces.D.every((color) => color === 'white')
    && [['F', 'blue'], ['R', 'orange'], ['B', 'green'], ['L', 'red']]
      .every(([face, color]) => state.faces[face].slice(6, 9).every((sticker) => sticker === color));
  const lessonAnimations = COURSE_ANIMATION_LESSON_IDS.map((lessonId) => (
    createCourseAnimationLesson(lessonId, lessonId)
  ));
  const emptyAnimationPlayer = (initialState, moves) => createFakePlayer(initialState, moves, 1);
  for (const lesson of lessonAnimations) {
    assert.ok(lesson.steps.length > 0, `${lesson.lessonId} has demonstration moves`);
    const initial = await engine.createState(lesson.initialStateAlgorithm);
    assertLegalState(initial);
    const controllerPlayer = emptyAnimationPlayer(initial, lesson.steps.map((step) => step.expectedMove));
    const controller = new CubeAnimationController(initial, lesson.steps.map((step) => step.expectedMove), controllerPlayer.player);
    controller.setSpeed('fast');
    assert.equal(controllerPlayer.player.tempoScale, 1.8, `${lesson.lessonId} speed control`);
    const nextStarted = controllerPlayer.waitForStart();
    const next = controller.next();
    await nextStarted;
    await next;
    assert.equal(controller.getSnapshot().moveIndex, 1, `${lesson.lessonId} advances one move`);
    const afterOneMove = engine.applyAlgorithm(initial, lesson.steps[0].expectedMove);
    assert.ok(engine.areStatesEqual(controller.getSnapshot().state, afterOneMove), `${lesson.lessonId} next-step synchronization`);
    await controller.reset();
    assert.ok(engine.areStatesEqual(controller.getSnapshot().state, initial), `${lesson.lessonId} reset state`);
    assert.ok(engine.areStatesEqual(controllerPlayer.visualState, initial), `${lesson.lessonId} reset visual`);

    const pausePlayer = emptyAnimationPlayer(initial, lesson.steps.map((step) => step.expectedMove));
    const pauseController = new CubeAnimationController(initial, lesson.steps.map((step) => step.expectedMove), pausePlayer.player);
    const pauseStarted = pausePlayer.waitForStart();
    const pausedRun = pauseController.play();
    await pauseStarted;
    pauseController.pause();
    await pausedRun;
    assert.equal(pauseController.getSnapshot().moveIndex, 0, `${lesson.lessonId} pause does not commit a partial move`);
    await pauseController.play();
    const expectedFinal = await engine.createState(lesson.steps.at(-1).expectedStateAlgorithm);
    assert.ok(engine.areStatesEqual(pauseController.getSnapshot().state, expectedFinal), `${lesson.lessonId} play/resume final state`);
    assert.ok(engine.areStatesEqual(pausePlayer.visualState, expectedFinal), `${lesson.lessonId} visual and logical final state`);
    assert.equal(pausePlayer.maximumConcurrentAnimations, 1, `${lesson.lessonId} has no overlapping animations`);
    pauseController.dispose();

    assertLegalState(expectedFinal);
    for (const step of lesson.steps) {
      assertLegalState(await engine.createState(step.expectedStateAlgorithm));
    }
  }
  const animationById = new Map(lessonAnimations.map((lesson) => [lesson.lessonId, lesson]));
  const daisyLesson = animationById.get('white-cross');
  const daisyStart = await engine.createState(daisyLesson.initialStateAlgorithm);
  const daisyFinish = await engine.createState(daisyLesson.steps.at(-1).expectedStateAlgorithm);
  const daisyEdges = [1, 3, 5, 7];
  assert.equal(daisyEdges.filter((cell) => daisyStart.faces.U[cell] === 'white').length, 0, 'margarida starts before any petals are placed');
  assert.ok(daisyStart.pattern.patternData.CORNERS.pieces.filter((piece, position) => piece !== position).length >= 6);
  assert.ok(daisyStart.pattern.patternData.EDGES.pieces.filter((piece, position) => piece !== position).length >= 8);
  assert.ok(Object.values(daisyStart.faces).every((stickers) => new Set(stickers).size > 1));
  assert.equal(daisyFinish.faces.U[4], 'yellow');
  assert.ok(daisyEdges.every((cell) => daisyFinish.faces.U[cell] === 'white'), 'margarida lesson reaches the four white petals');
  const crossFinish = await engine.createState(animationById.get('align-cross-edges').steps.at(-1).expectedStateAlgorithm);
  assert.ok(daisyEdges.every((cell) => crossFinish.faces.D[cell] === 'white'), 'cross lesson transfers all white edges down');
  assert.ok([['F', 'blue'], ['R', 'orange'], ['B', 'green'], ['L', 'red']]
    .every(([face, color]) => crossFinish.faces[face][7] === color), 'white cross edges align to all side centers');
  assert.ok(!crossFinish.faces.D.every((color) => color === 'white'), 'cross lesson does not also finish the white corners');
  const alignedDaisyStart = await engine.createState(animationById.get('align-cross-edges').initialStateAlgorithm);
  assert.ok(daisyEdges.every((cell) => alignedDaisyStart.faces.U[cell] === 'white'), 'cross lesson starts with all four daisy petals');
  assert.ok([['F', 'blue'], ['R', 'orange'], ['B', 'green'], ['L', 'red']]
    .every(([face, color]) => alignedDaisyStart.faces[face][1] === color), 'daisy petals begin aligned to their centers');
  assert.ok(firstLayerIsSolved(await engine.createState(animationById.get('check-first-layer').steps.at(-1).expectedStateAlgorithm)));
  assert.ok(firstLayerIsSolved(await engine.createState(animationById.get('insert-right').steps.at(-1).expectedStateAlgorithm)));
  assert.ok(firstLayerIsSolved(await engine.createState(animationById.get('insert-left').steps.at(-1).expectedStateAlgorithm)));
  reports.push('all 39 course lessons: configured algorithms, valid states, Play/Pause/Resume/Next/Reset, speed, and CubeEngine sync');

  function createFakePlayer(initialState, moves, duration = 30) {
    const listeners = new Set();
    const startWaiters = [];
    let visualState = initialState;
    let moveCursor = 0;
    let timer = null;
    let isPlaying = false;
    let playCalls = 0;
    let activeAnimations = 0;
    let maximumConcurrentAnimations = 0;
    const emitPlaying = (playing) => listeners.forEach((listener) => listener({ playing }));

    const player = {
      tempoScale: 1,
      experimentalModel: {
        currentPattern: { get: async () => visualState.pattern },
        playingInfo: {
          addFreshListener: (listener) => listeners.add(listener),
          removeFreshListener: (listener) => listeners.delete(listener),
        },
      },
      controller: {
        animationController: {
          play: () => {
            if (isPlaying) return;
            isPlaying = true;
            activeAnimations++;
            maximumConcurrentAnimations = Math.max(maximumConcurrentAnimations, activeAnimations);
            playCalls++;
            startWaiters.splice(0).forEach((resolve) => resolve());
            emitPlaying(true);
            if (isPlaying) {
              timer = setTimeout(() => {
                visualState = engine.applyAlgorithm(visualState, moves[moveCursor]);
                moveCursor++;
                isPlaying = false;
                activeAnimations--;
                emitPlaying(false);
              }, duration / player.tempoScale);
            }
          },
          pause: () => {
            if (!isPlaying) return;
            clearTimeout(timer);
            isPlaying = false;
            activeAnimations--;
            emitPlaying(false);
          },
          jumpToStart: () => {
            clearTimeout(timer);
            isPlaying = false;
            moveCursor = 0;
            visualState = initialState;
          },
        },
      },
    };

    return {
      player,
      waitForStart: () => new Promise((resolve) => startWaiters.push(resolve)),
      get playCalls() { return playCalls; },
      get maximumConcurrentAnimations() { return maximumConcurrentAnimations; },
      get moveCursor() { return moveCursor; },
      get visualState() { return visualState; },
    };
  }

  const animationMoves = BASIC_NOTATION_ANIMATION.steps.map((step) => step.expectedMove);
  const animationInitialState = await engine.createState(BASIC_NOTATION_ANIMATION.initialStateAlgorithm);
  const pausedPlayer = createFakePlayer(animationInitialState, animationMoves);
  const pausedController = new CubeAnimationController(animationInitialState, animationMoves, pausedPlayer.player);
  const firstStart = pausedPlayer.waitForStart();
  const firstPlay = pausedController.play();
  await firstStart;
  pausedController.pause();
  await firstPlay;
  assert.equal(pausedController.getSnapshot().moveIndex, 0, 'a paused partial move is not committed to CubeState');
  assert.equal(pausedController.getSnapshot().status, 'paused');
  assert.ok(engine.areStatesEqual(pausedController.getSnapshot().state, animationInitialState));
  await pausedController.play();
  assert.equal(pausedController.getSnapshot().status, 'complete', 'play resumes and completes the remaining sequence');
  const animationFinalState = await engine.createState(BASIC_NOTATION_ANIMATION.steps.at(-1).expectedStateAlgorithm);
  assert.ok(engine.areStatesEqual(pausedController.getSnapshot().state, animationFinalState));
  assert.equal(pausedPlayer.maximumConcurrentAnimations, 1, 'only one move animation runs at a time');

  const nextPlayer = createFakePlayer(animationInitialState, animationMoves);
  const nextController = new CubeAnimationController(animationInitialState, animationMoves, nextPlayer.player);
  const nextStart = nextPlayer.waitForStart();
  const nextOnce = nextController.next();
  const duplicateNext = nextController.next();
  await Promise.all([nextStart, nextOnce, duplicateNext]);
  assert.equal(nextController.getSnapshot().moveIndex, 1, 'Next performs exactly one move');
  assert.equal(nextPlayer.playCalls, 1, 'duplicate requests do not start concurrent animation');
  await nextController.reset();
  assert.equal(nextController.getSnapshot().moveIndex, 0);
  assert.ok(engine.areStatesEqual(nextController.getSnapshot().state, animationInitialState), 'reset restores CubeState');
  assert.ok(engine.areStatesEqual(nextPlayer.visualState, animationInitialState), 'reset restores the visual player');

  for (const moves of [['R', "R'"], ['R', 'R', 'R', 'R']]) {
    const player = createFakePlayer(animationInitialState, moves);
    const controller = new CubeAnimationController(animationInitialState, moves, player.player);
    await controller.play();
    assert.ok(engine.areStatesEqual(controller.getSnapshot().state, animationInitialState), `${moves.join(' ')} restores the initial state`);
    controller.dispose();
  }
  reports.push('animation controller: pause/resume, reset, single-step, no overlap, inverse and four-turn cycles');

  for (const move of ['R', "R'", 'U', "U'", 'F', "F'"]) {
    const state = engine.applyAlgorithm(solved, move);
    assert.ok(!engine.areStatesEqual(solved, state), `${move} changes the state`);
    assertLegalState(state);
    assertVisualMatchesState(state);

    const face = move[0];
    for (const orbitName of ['EDGES', 'CORNERS']) {
      const before = solved.pattern.patternData[orbitName];
      const after = state.pattern.patternData[orbitName];
      const changed = positions[orbitName].filter((_, index) => (
        before.pieces[index] !== after.pieces[index] || before.orientation[index] !== after.orientation[index]
      ));
      assert.deepEqual([...changed].sort(), [...affectedPieces[face][orbitName]].sort(), `${move} affects only expected cubies`);
    }

    for (const stateFace of faceIds) {
      const changed = state.faces[stateFace].flatMap((color, index) => (
        color !== solved.faces[stateFace][index] ? [index] : []
      ));
      assert.ok(
        changed.every((index) => (affectedFacelets[face][stateFace] ?? []).includes(index)),
        `${move} changes only stickers in its layer`,
      );
    }
  }
  reports.push('R/R\'/U/U\'/F/F\': state changes, legal cubies, exact SVG colors, and affected layers');

  for (const algorithm of ["R R'", "U U'", "F F'", 'R R R R', 'U U U U', 'F F F F']) {
    assert.ok(engine.areStatesEqual(solved, engine.applyAlgorithm(solved, algorithm)), `${algorithm} restores solved state`);
  }
  reports.push('inverse pairs and four quarter-turns restore solved state');

  const identitySequence = "R U R' U' U R U' R'";
  for (const algorithm of ["R U R' U'", identitySequence, "F R U R' U' F'", 'R2 D2 L2']) {
    const state = engine.applyAlgorithm(solved, algorithm);
    assertLegalState(state);
    assertVisualMatchesState(state);
    if (algorithm === identitySequence) {
      assert.ok(engine.areStatesEqual(solved, state), 'the listed sequence cancels algebraically');
    } else {
      assert.ok(!engine.areStatesEqual(solved, state), `${algorithm} changes the state`);
    }
  }
  reports.push('four short algorithms preserve legal states; the supplied cancelling sequence is identity');

  const scramble = generateScramble('3x3');
  assert.ok(scramble.length > 0);
  const scrambled = engine.applyAlgorithm(solved, scramble);
  assert.ok(!engine.areStatesEqual(solved, scrambled), 'scramble changes solved state');
  assertLegalState(scrambled);
  const solution = await engine.solve(scrambled);
  const restored = engine.applyAlgorithm(scrambled, solution);
  assert.ok(engine.areStatesEqual(solved, restored), 'solver returns to the exact solved pattern');
  assertLegalState(restored);
  reports.push(`random 3x3 scramble and solver round-trip (${scramble.split(' ').length} moves)`);

  const proof = BASIC_NOTATION_PROOF;
  const proofStep = proof.steps[0];
  const initial = await engine.createState(proof.initialStateAlgorithm);
  const next = engine.applyAlgorithm(initial, proofStep.expectedMove);
  assert.ok(engine.areStatesEqual(next, await engine.createState(proofStep.expectedStateAlgorithm)));
  const proofPiece = proofStep.pieces[0];
  assert.equal(engine.findPiecePosition(initial, proofPiece.orbit, proofPiece.id), 'UFR');
  assert.equal(engine.findPiecePosition(next, proofPiece.orbit, proofPiece.id), 'URB');
  assert.equal(
    engine.findPiecePosition(next, proofStep.goal.piecePositions[0].piece.orbit, proofStep.goal.piecePositions[0].piece.id),
    proofStep.goal.piecePositions[0].position,
  );
  const highlights = engine.findVisiblePieceFacelets(next, proofPiece.orbit, proofPiece.id);
  assert.deepEqual(highlights, [{ face: 'top', index: 2 }, { face: 'right', index: 0 }]);
  assertLegalState(next);
  assertVisualMatchesState(next, highlights);
  reports.push('Notação básica proof: UFR -> URB and exact rendered highlight at top[2]/right[0]');

  console.log(`PASS ${reports.length} test groups`);
  for (const report of reports) console.log(`- ${report}`);
  console.log(`Scramble: ${scramble}`);
  console.log(`Solution: ${solution}`);
} finally {
  await vite.close();
}