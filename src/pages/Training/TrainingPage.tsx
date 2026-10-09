import { Badge, Button, Card, ProgressBar } from '../../components/ui';
import './TrainingPage.css';

type Drill = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  difficulty: string;
  level: number;
  progress: number;
  xp: number;
  duration: string;
  accent: 'blue' | 'green' | 'yellow' | 'purple';
  locked?: boolean;
};

const DRILLS: Drill[] = [
  {
    id: 'movements',
    name: 'Movimentos',
    description: 'Ganhe confiança na notação e pratique giros precisos em cada face.',
    icon: '↻',
    category: 'Fundamentos',
    difficulty: 'Iniciante',
    level: 2,
    progress: 68,
    xp: 20,
    duration: '5 min',
    accent: 'blue',
  },
  {
    id: 'recognition',
    name: 'Reconhecimento',
    description: 'Identifique padrões e casos cada vez mais rápido, sem hesitar.',
    icon: '◉',
    category: 'Percepção',
    difficulty: 'Intermediário',
    level: 1,
    progress: 32,
    xp: 25,
    duration: '7 min',
    accent: 'green',
  },
  {
    id: 'speed',
    name: 'Velocidade',
    description: 'Trabalhe seu ritmo e mantenha os movimentos fluidos do início ao fim.',
    icon: '⚡',
    category: 'Agilidade',
    difficulty: 'Intermediário',
    level: 3,
    progress: 84,
    xp: 30,
    duration: '8 min',
    accent: 'yellow',
  },
  {
    id: 'algorithms',
    name: 'Algoritmos',
    description: 'Pratique sequências essenciais e fortaleça sua memória muscular.',
    icon: 'ƒ',
    category: 'Técnica',
    difficulty: 'Avançado',
    level: 0,
    progress: 0,
    xp: 35,
    duration: '10 min',
    accent: 'purple',
    locked: true,
  },
];

function LevelTrack({ level }: { level: number }) {
  return (
    <div className="training-level-track" aria-label={`Nível ${level} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`training-level-step ${index < level ? 'is-filled' : ''}`}
        />
      ))}
    </div>
  );
}

export default function TrainingPage() {
  return (
    <div className="training-page">
      <div className="container training-page-shell">
        <header className="training-header">
          <div className="training-header-copy">
            <span className="hero-eyebrow">Pratique no seu ritmo</span>
            <h1>Um pouco melhor a cada treino.</h1>
            <p>
              Exercícios rápidos e opcionais para desenvolver suas habilidades no cubo,
              um passo de cada vez.
            </p>
          </div>
          <Card variant="elevated" className="training-profile-card">
            <div className="training-profile-top">
              <span className="training-profile-label">Seu nível</span>
              <Badge variant="face" faceColor="blue" size="sm">Nível 4</Badge>
            </div>
            <strong className="training-profile-title">Cubista em evolução</strong>
            <ProgressBar value={68} color="gradient" height={8} />
            <div className="training-profile-progress">
              <span>680 XP</span>
              <span>1.000 XP para o próximo nível</span>
            </div>
          </Card>
        </header>

        <section className="training-summary" aria-label="Resumo de treino">
          <Card className="training-summary-card">
            <span className="training-summary-icon training-accent-yellow" aria-hidden="true">✦</span>
            <div>
              <strong>680</strong>
              <span>XP acumulado</span>
            </div>
          </Card>
          <Card className="training-summary-card">
            <span className="training-summary-icon training-accent-orange" aria-hidden="true">♨</span>
            <div>
              <strong>5 dias</strong>
              <span>Sequência atual</span>
            </div>
          </Card>
          <Card className="training-summary-card">
            <span className="training-summary-icon training-accent-green" aria-hidden="true">✓</span>
            <div>
              <strong>3 de 4</strong>
              <span>Treinos concluídos</span>
            </div>
          </Card>
        </section>

        <section className="daily-challenge" aria-labelledby="daily-challenge-title">
          <Card variant="elevated" facetColor="yellow" className="daily-challenge-card">
            <div className="daily-challenge-copy">
              <div className="daily-challenge-label">
                <span className="daily-challenge-spark" aria-hidden="true">✦</span>
                <span>Desafio do dia</span>
                <Badge variant="warning" size="sm">Opcional</Badge>
              </div>
              <h2 id="daily-challenge-title">Movimentos com propósito</h2>
              <p>Complete uma rodada curta de movimentos e some pontos à sua jornada.</p>
              <div className="daily-challenge-reward">
                <span>+30 XP</span>
                <span>·</span>
                <span>5 min</span>
              </div>
            </div>
            <div className="daily-challenge-action">
              <span className="daily-challenge-note">Um treino rápido já faz diferença.</span>
              <Button type="button" variant="cube-accent" size="md">
                Começar desafio
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </Card>
        </section>

        <section className="drills-section" aria-labelledby="drills-title">
          <div className="drills-section-heading">
            <div>
              <h2 id="drills-title">Escolha um treino</h2>
              <p>Pratique uma habilidade específica e acompanhe seu progresso.</p>
            </div>
            <span className="drills-optional-label">Todos os treinos são opcionais</span>
          </div>

          <div className="drills-grid">
            {DRILLS.map((drill) => (
              <Card
                key={drill.id}
                variant={drill.locked ? 'default' : 'interactive'}
                className={`drill-card drill-card--${drill.accent} ${drill.locked ? 'drill-card--locked' : ''}`}
              >
                <div className="drill-card-heading">
                  <span className="drill-icon" aria-hidden="true">{drill.icon}</span>
                  <Badge variant="default" size="sm">{drill.category}</Badge>
                </div>
                <div className="drill-card-title-row">
                  <h3>{drill.name}</h3>
                  {drill.locked && (
                    <span className="drill-lock" aria-label="Treino bloqueado">⌑</span>
                  )}
                </div>
                <p className="drill-description">{drill.description}</p>

                <div className="drill-meta">
                  <span>{drill.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{drill.duration}</span>
                  <span className="drill-xp">+{drill.xp} XP</span>
                </div>

                <div className="drill-progression">
                  <div className="drill-progression-label">
                    <span>Progresso</span>
                    <strong>{drill.progress}%</strong>
                  </div>
                  <ProgressBar value={drill.progress} color={drill.accent === 'purple' ? 'advanced' : drill.accent === 'yellow' ? 'intermediate' : drill.accent === 'green' ? 'basic' : 'primary'} height={7} />
                  <div className="drill-level-row">
                    <span>Nível {drill.level}</span>
                    <LevelTrack level={drill.level} />
                    <span>5</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant={drill.locked ? 'secondary' : 'outline'}
                  size="md"
                  fullWidth
                  disabled={drill.locked}
                  className="drill-cta"
                >
                  {drill.locked ? 'Disponível em breve' : 'Iniciar treino'}
                  {!drill.locked && <span aria-hidden="true">→</span>}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <p className="training-demo-note">
          XP, sequência e progresso são demonstrativos nesta versão.
        </p>
      </div>
    </div>
  );
}
