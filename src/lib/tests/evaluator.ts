import type { SkillTest, TestAttemptResult } from '../../types';

export interface EvaluationInput {
  test: SkillTest;
  selectedAnswers: Record<string, string>; // questionId -> optionId
}

/** Avalia o resultado de um teste ou quiz */
export function evaluateSkillTest({ test, selectedAnswers }: EvaluationInput): TestAttemptResult {
  let correctCount = 0;
  const totalQuestions = test.questions.length;

  test.questions.forEach((q) => {
    const selectedOptionId = selectedAnswers[q.id];
    const correctOption = q.options.find((opt) => opt.isCorrect);
    if (correctOption && selectedOptionId === correctOption.id) {
      correctCount++;
    }
  });

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = scorePercentage >= test.passingScorePercentage;

  return {
    testId: test.id,
    cubeId: test.cubeId,
    level: test.level,
    scorePercentage,
    passed,
    completedAt: Date.now(),
    correctCount,
    totalQuestions,
  };
}
