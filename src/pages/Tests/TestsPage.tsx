import { useState } from 'react';
import { Badge, Button, Card, ProgressBar } from '../../components/ui';
import './TestsPage.css';

type TestQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

type SkillTest = {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  difficulty: string;
  difficultyVariant: 'basic' | 'intermediate' | 'advanced';
  progress: number;
  bestScore: number | null;
  accent: 'blue' | 'green' | 'yellow' | 'purple';
  questions: TestQuestion[];
};

type Attempt = {
  testId: string;
  title: string;
  score: number;
  dateLabel: string;
};

const SKILL_TESTS: SkillTest[] = [
  {
    id: 'coordination',
    title: 'Coordenação & movimentos',
    category: 'Controle',
    description: 'Confira sua familiaridade com giros e notação básica do cubo.',
    icon: '↻',
    difficulty: 'Iniciante',
    difficultyVariant: 'basic',
    progress: 72,
    bestScore: 80,
    accent: 'blue',
    questions: [
      {
        prompt: 'Na notação padrão, o que significa R?',
        options: ['Girar a face direita 90° no sentido horário', 'Girar a face esquerda 90°', 'Girar a face direita 180°', 'Girar a face de cima 90°'],
        correctIndex: 0,
      },
      {
        prompt: 'Qual movimento desfaz um giro U?',
        options: ['U2', 'U’', 'R’', 'D'],
        correctIndex: 1,
      },
      {
        prompt: 'O que indica o número 2 após uma letra, como F2?',
        options: ['Dois giros de 90° na mesma face', 'Giro anti-horário', 'Giro da face oposta', 'Pausa de dois segundos'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'patterns',
    title: 'Cores & padrões',
    category: 'Observação',
    description: 'Treine a leitura de cores, peças e padrões comuns no cubo.',
    icon: '◉',
    difficulty: 'Iniciante',
    difficultyVariant: 'basic',
    progress: 45,
    bestScore: 100,
    accent: 'green',
    questions: [
      {
        prompt: 'No cubo 3×3 tradicional, qual peça possui três cores?',
        options: ['Centro', 'Meio (aresta)', 'Canto', 'Nenhuma peça'],
        correctIndex: 2,
      },
      {
        prompt: 'Qual peça determina a cor central de cada face?',
        options: ['A peça de centro', 'A peça de canto', 'A peça de meio', 'A peça adjacente'],
        correctIndex: 0,
      },
      {
        prompt: 'Ao procurar uma aresta branca e vermelha, quantas cores essa peça tem?',
        options: ['Uma', 'Duas', 'Três', 'Quatro'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'speed',
    title: 'Desafio de velocidade',
    category: 'Agilidade',
    description: 'Avalie decisões rápidas e estratégias para uma resolução mais fluida.',
    icon: '⚡',
    difficulty: 'Intermediário',
    difficultyVariant: 'intermediate',
    progress: 28,
    bestScore: null,
    accent: 'yellow',
    questions: [
      {
        prompt: 'Qual hábito ajuda a manter uma resolução rápida e contínua?',
        options: ['Parar após cada movimento', 'Planejar a cruz durante a inspeção', 'Girar o cubo sem observar', 'Executar movimentos aleatórios'],
        correctIndex: 1,
      },
      {
        prompt: 'O que é lookahead no speedcubing?',
        options: ['Girar as faces com mais força', 'Observar e localizar as próximas peças enquanto executa', 'Pular a etapa de inspeção', 'Memorizar o scramble inteiro'],
        correctIndex: 1,
      },
      {
        prompt: 'Qual é uma boa estratégia para reduzir pausas entre pares de F2L?',
        options: ['Girar mais rápido sem olhar', 'Acompanhar outra peça enquanto insere o par atual', 'Fazer rotações de cubo em toda etapa', 'Ignorar a posição dos cantos'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'notation',
    title: 'Algoritmos & notação',
    category: 'Técnica',
    description: 'Identifique sequências, símbolos e fundamentos dos algoritmos.',
    icon: 'ƒ',
    difficulty: 'Avançado',
    difficultyVariant: 'advanced',
    progress: 16,
    bestScore: 60,
    accent: 'purple',
    questions: [
      {
        prompt: 'Em R U R’ U’, o que representa o apóstrofo?',
        options: ['Giro de 180°', 'Giro no sentido anti-horário', 'Giro mais rápido', 'Movimento de duas camadas'],
        correctIndex: 1,
      },
      {
        prompt: 'Qual é o objetivo principal de um algoritmo de PLL?',
        options: ['Orientar as peças da última camada', 'Permutar as peças da última camada', 'Resolver a cruz branca', 'Misturar o cubo'],
        correctIndex: 1,
      },
      {
        prompt: 'O que representa a letra U na notação?',
        options: ['Face de baixo', 'Face de cima', 'Face de trás', 'Face da frente'],
        correctIndex: 1,
      },
    ],
  },
];

const MOCK_HISTORY: Attempt[] = [
  { testId: 'patterns', title: 'Cores & padrões', score: 100, dateLabel: 'Ontem' },
  { testId: 'coordination', title: 'Coordenação & movimentos', score: 80, dateLabel: '3 dias atrás' },
];

function TestsPage() {
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [result, setResult] = useState<Attempt | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>(MOCK_HISTORY);

  const activeTest = SKILL_TESTS.find((test) => test.id === activeTestId);

  const startTest = (testId: string) => {
    setActiveTestId(testId);
    setQuestionIndex(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setResult(null);
  };

  const submitAnswer = () => {
    if (!activeTest || selectedOption === null) return;

    const isCorrect = selectedOption === activeTest.questions[questionIndex].correctIndex;
    const updatedCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
    setCorrectAnswers(updatedCorrectAnswers);

    if (questionIndex === activeTest.questions.length - 1) {
      const score = Math.round((updatedCorrectAnswers / activeTest.questions.length) * 100);
      const completedAttempt: Attempt = {
        testId: activeTest.id,
        title: activeTest.title,
        score,
        dateLabel: 'Agora',
      };
      setResult(completedAttempt);
      setAttempts((currentAttempts) => [completedAttempt, ...currentAttempts]);
      setActiveTestId(null);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOption(null);
  };

  const returnToCatalog = () => {
    setActiveTestId(null);
    setResult(null);
    setSelectedOption(null);
  };

  return (
    <div className="tests-page">
      <div className="container tests-page-shell">
        <header className="tests-header">
          <span className="hero-eyebrow">Desafie suas habilidades</span>
          <h1>Testes para cada etapa da sua jornada.</h1>
          <p>
            Avalie seus conhecimentos com desafios rápidos de cubo. Os testes são opcionais:
            faça no seu ritmo e use os resultados para descobrir onde evoluir.
          </p>
          <div className="tests-header-note">
            <span className="tests-info-icon" aria-hidden="true">i</span>
            <span>Seus resultados são demonstrativos e não afetam seu progresso nos cursos.</span>
          </div>
        </header>

        {result && (
          <section className="test-result-section" aria-labelledby="test-result-title">
            <Card variant="elevated" className={`test-result-card ${result.score >= 70 ? 'test-result--success' : 'test-result--retry'}`}>
              <div className="test-result-icon" aria-hidden="true">{result.score >= 70 ? '✓' : '↻'}</div>
              <Badge variant={result.score >= 70 ? 'success' : 'warning'}>
                {result.score >= 70 ? 'Muito bem!' : 'Continue praticando'}
              </Badge>
              <h2 id="test-result-title">{result.title}</h2>
              <p>
                {result.score >= 70
                  ? 'Você demonstrou um bom domínio neste desafio. Que tal tentar superar sua pontuação?'
                  : 'Cada tentativa ajuda a fixar o conteúdo. Revise e tente novamente quando quiser.'}
              </p>
              <div className="test-result-score">
                <strong>{result.score}%</strong>
                <span>Pontuação demonstrativa</span>
              </div>
              <div className="test-result-feedback">
                <span>Acertos</span>
                <strong>{Math.round((result.score / 100) * 3)} de 3 questões</strong>
              </div>
              <div className="test-result-actions">
                <Button type="button" variant="cube-accent" onClick={() => startTest(result.testId)}>
                  Tentar novamente
                </Button>
                <Button type="button" variant="ghost" onClick={returnToCatalog}>
                  Ver outros testes
                </Button>
              </div>
            </Card>
          </section>
        )}

        {activeTest && (
          <section className="test-session" aria-labelledby="test-session-title">
            <div className="test-session-top">
              <Button type="button" variant="ghost" size="sm" onClick={returnToCatalog}>
                ← Voltar aos testes
              </Button>
              <span>Questão {questionIndex + 1} de {activeTest.questions.length}</span>
            </div>
            <ProgressBar value={((questionIndex + 1) / activeTest.questions.length) * 100} color="gradient" height={8} />
            <Card variant="elevated" className="test-question-card">
              <Badge level={activeTest.difficultyVariant} size="sm">{activeTest.difficulty}</Badge>
              <h2 id="test-session-title">{activeTest.title}</h2>
              <p className="test-question-prompt">{activeTest.questions[questionIndex].prompt}</p>
              <div className="test-answer-options">
                {activeTest.questions[questionIndex].options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    className={`test-answer-option ${selectedOption === index ? 'is-selected' : ''}`}
                    onClick={() => setSelectedOption(index)}
                    aria-pressed={selectedOption === index}
                  >
                    <span className="test-answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
              <div className="test-question-footer">
                <span>Escolha a resposta que considerar correta.</span>
                <Button type="button" variant="primary" disabled={selectedOption === null} onClick={submitAnswer}>
                  {questionIndex === activeTest.questions.length - 1 ? 'Ver resultado' : 'Continuar'}
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </Card>
          </section>
        )}

        {!activeTest && !result && (
          <>
            <section className="tests-catalog" aria-labelledby="tests-catalog-title">
              <div className="tests-section-heading">
                <div>
                  <h2 id="tests-catalog-title">Escolha um teste</h2>
                  <p>Desafios curtos para avaliar diferentes habilidades.</p>
                </div>
                <Badge variant="default">4 testes disponíveis</Badge>
              </div>

              <div className="tests-grid">
                {SKILL_TESTS.map((test) => (
                  <Card key={test.id} variant="interactive" className={`skill-test-card skill-test-card--${test.accent}`}>
                    <div className="skill-test-top">
                      <span className="skill-test-icon" aria-hidden="true">{test.icon}</span>
                      <Badge variant="default" size="sm">{test.category}</Badge>
                    </div>
                    <h3>{test.title}</h3>
                    <p className="skill-test-description">{test.description}</p>
                    <div className="skill-test-meta">
                      <Badge level={test.difficultyVariant} size="sm">{test.difficulty}</Badge>
                      <span>{test.questions.length} questões</span>
                    </div>
                    <div className="skill-test-progress">
                      <div className="skill-test-progress-label">
                        <span>Progresso pessoal</span>
                        <strong>{test.progress}%</strong>
                      </div>
                      <ProgressBar value={test.progress} color={test.difficultyVariant} height={7} />
                    </div>
                    <div className="skill-test-best">
                      <span>Melhor pontuação</span>
                      <strong>{test.bestScore === null ? 'Ainda não realizado' : `${test.bestScore}%`}</strong>
                    </div>
                    <Button type="button" variant="outline" fullWidth onClick={() => startTest(test.id)}>
                      Iniciar teste
                      <span aria-hidden="true">→</span>
                    </Button>
                  </Card>
                ))}
              </div>
            </section>

            <section className="tests-history" aria-labelledby="tests-history-title">
              <div className="tests-section-heading">
                <div>
                  <h2 id="tests-history-title">Seu histórico</h2>
                  <p>Um resumo demonstrativo das suas tentativas recentes.</p>
                </div>
                <span className="tests-history-count">{attempts.length} tentativas</span>
              </div>
              <Card padding="none" className="tests-history-card">
                {attempts.map((attempt, index) => (
                  <div className="tests-history-row" key={`${attempt.testId}-${attempt.dateLabel}-${index}`}>
                    <span className={`tests-history-mark ${attempt.score >= 70 ? 'is-passed' : 'is-review'}`} aria-hidden="true">
                      {attempt.score >= 70 ? '✓' : '↻'}
                    </span>
                    <div className="tests-history-name">
                      <strong>{attempt.title}</strong>
                      <span>{attempt.dateLabel}</span>
                    </div>
                    <ProgressBar value={attempt.score} color={attempt.score >= 70 ? 'basic' : 'intermediate'} height={6} className="tests-history-progress" />
                    <strong className="tests-history-score">{attempt.score}%</strong>
                  </div>
                ))}
              </Card>
              <p className="tests-mock-note">Histórico e progresso são dados de demonstração, armazenados apenas nesta tela.</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default TestsPage;
