import { Button, Card, Badge } from '../../components/ui';
import './HomePage.css';

/* ─── SVG do cubo isométrico para o Hero ─── */
function CubeHeroSvg() {
  return (
    <svg
      className="hero-cube-svg"
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="htop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="hleft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="hright" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow halo */}
      <ellipse cx="100" cy="210" rx="60" ry="12" fill="rgba(59,130,246,0.18)" />

      {/* Top face */}
      <path d="M100 20 L180 65 L100 110 L20 65 Z" fill="url(#htop)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" filter="url(#glow)" />
      <line x1="46.67" y1="78.33" x2="126.67" y2="33.33" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="73.33" y1="91.67" x2="153.33" y2="46.67" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="60" y1="72.5" x2="140" y2="117.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="140" y1="65" x2="60" y2="110" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

      {/* Left face */}
      <path d="M20 65 L100 110 L100 200 L20 155 Z" fill="url(#hleft)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <line x1="20" y1="95" x2="100" y2="140" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="20" y1="125" x2="100" y2="170" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="46.67" y1="110" x2="46.67" y2="200" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="73.33" y1="125" x2="73.33" y2="215" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

      {/* Right face */}
      <path d="M100 110 L180 65 L180 155 L100 200 Z" fill="url(#hright)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <line x1="100" y1="140" x2="180" y2="95" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="100" y1="170" x2="180" y2="125" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="126.67" y1="125" x2="126.67" y2="215" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="153.33" y1="110" x2="153.33" y2="200" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

      {/* Highlight edge */}
      <path d="M100 20 L180 65" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Dados dos cursos ─── */
const COURSES = [
  {
    id: 'cube-2x2',
    name: '2×2',
    subtitle: 'Cubo de Bolso',
    facetColor: 'orange' as const,
    description: 'O ponto de partida ideal. Menos peças, lógica essencial.',
    icon: '▪',
  },
  {
    id: 'cube-3x3',
    name: '3×3',
    subtitle: 'Clássico',
    facetColor: 'blue' as const,
    description: 'O icônico cubo de Rubik. Fundamentos completos e métodos eficientes.',
    icon: '▪',
  },
  {
    id: 'cube-4x4',
    name: '4×4',
    subtitle: 'Revenge',
    facetColor: 'red' as const,
    description: 'Desafio intermediário com centros móveis e paridade.',
    icon: '▪',
  },
  {
    id: 'pyraminx',
    name: 'Pyraminx',
    subtitle: 'Tetraedro',
    facetColor: 'green' as const,
    description: 'Forma piramidal com rotações únicas e sequências especiais.',
    icon: '▲',
  },
];

/* ─── Dados dos treinos ─── */
const TRAININGS = [
  {
    id: 'train-movements',
    title: 'Movimentos',
    description: 'Domine a notação oficial e execute cada face com precisão e agilidade.',
    color: 'var(--cube-blue)',
  },
  {
    id: 'train-speed',
    title: 'Velocidade',
    description: 'Treine com timer integrado e acompanhe sua evolução em tempo real.',
    color: 'var(--cube-yellow)',
  },
  {
    id: 'train-recognition',
    title: 'Reconhecimento',
    description: 'Identifique casos e padrões em milissegundos para ganhar tempo na resolução.',
    color: 'var(--cube-green)',
  },
  {
    id: 'train-algorithms',
    title: 'Algoritmos',
    description: 'Memorize e pratique sequências com feedback interativo passo a passo.',
    color: 'var(--brand-secondary)',
  },
];

/* ─── Componente principal ─── */
export default function HomePage() {
  return (
    <div className="home-page">

      {/* ══════════ 1. HERO ══════════ */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">Plataforma de aprendizado</span>
            <h1 id="hero-title" className="hero-title">
              Aprenda a resolver{' '}
              <span className="hero-title-highlight">qualquer cubo</span>
            </h1>
            <p className="hero-subtitle">
              Do zero ao speedcubing — cursos estruturados, treinos práticos e
              testes para medir sua evolução em cada etapa.
            </p>
            <div className="hero-ctas">
              <Button variant="cube-accent" size="lg" id="hero-cta-primary">
                Começar a aprender
              </Button>
              <Button variant="outline" size="lg" id="hero-cta-secondary">
                Explorar cubos
              </Button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">4</span>
                <span className="hero-stat-label">Cubos</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">3</span>
                <span className="hero-stat-label">Níveis</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">∞</span>
                <span className="hero-stat-label">Treinos</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-cube-wrapper">
              <div className="hero-cube-glow" />
              <CubeHeroSvg />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. COMO FUNCIONA ══════════ */}
      <section className="how-section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-header">
            <h2 id="how-title" className="section-title">Como funciona</h2>
            <p className="section-subtitle">
              Uma jornada progressiva, do conceito à execução fluida.
            </p>
          </div>

          <div className="how-steps">
            {[
              {
                step: '01',
                title: 'Aprenda',
                description:
                  'Acesse cursos didáticos com teoria, notações e movimentos explicados passo a passo.',
                color: 'var(--cube-blue)',
              },
              {
                step: '02',
                title: 'Pratique',
                description:
                  'Treine movimentos, velocidade e memorização de algoritmos com exercícios interativos.',
                color: 'var(--cube-yellow)',
              },
              {
                step: '03',
                title: 'Evolua',
                description:
                  'Faça testes, receba avaliações e acompanhe sua evolução em cada cubo e habilidade.',
                color: 'var(--cube-green)',
              },
            ].map((item, idx, arr) => (
              <div className="how-step-wrapper" key={item.step}>
                <div className="how-step">
                  <div
                    className="how-step-icon"
                    style={{ color: item.color, background: `${item.color}18`, borderColor: `${item.color}30` }}
                  >
                    <span className="how-step-number" style={{ color: item.color }}>{item.step}</span>
                  </div>
                  <h3 className="how-step-title">{item.title}</h3>
                  <p className="how-step-desc">{item.description}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="how-connector" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--border-medium)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. CURSOS ══════════ */}
      <section className="courses-section" aria-labelledby="courses-title">
        <div className="container">
          <div className="section-header">
            <h2 id="courses-title" className="section-title">Cursos disponíveis</h2>
            <p className="section-subtitle">
              Cada cubo tem seu próprio currículo com três níveis progressivos.
            </p>
          </div>

          <div className="courses-levels" aria-label="Níveis disponíveis">
            <Badge level="basic">Básico</Badge>
            <span className="levels-separator" aria-hidden="true">·</span>
            <Badge level="intermediate">Médio</Badge>
            <span className="levels-separator" aria-hidden="true">·</span>
            <Badge level="advanced">Avançado</Badge>
          </div>

          <div className="courses-grid">
            {COURSES.map((course) => (
              <Card
                key={course.id}
                variant="interactive"
                facetColor={course.facetColor}
                className="course-card"
                role="article"
              >
                <div className="course-card-header">
                  <span className="course-icon-char" aria-hidden="true"
                    style={{ color: `var(--cube-${course.facetColor})` }}>
                    {course.icon}
                  </span>
                  <div>
                    <div className="course-name">{course.name}</div>
                    <div className="course-subtitle">{course.subtitle}</div>
                  </div>
                </div>
                <p className="course-desc">{course.description}</p>
                <div className="course-levels">
                  <Badge level="basic" size="sm">Básico</Badge>
                  <Badge level="intermediate" size="sm">Médio</Badge>
                  <Badge level="advanced" size="sm">Avançado</Badge>
                </div>
                <div className="course-card-footer">
                  <span className="course-cta-text">Ver curso</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. TREINOS ══════════ */}
      <section className="training-section" aria-labelledby="training-title">
        <div className="container">
          <div className="section-header">
            <h2 id="training-title" className="section-title">Treinos</h2>
            <p className="section-subtitle">
              Módulos focados para aperfeiçoar habilidades específicas.
            </p>
          </div>

          <div className="training-grid">
            {TRAININGS.map((t) => (
              <Card key={t.id} variant="default" className="training-card">
                <div
                  className="training-dot"
                  style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }}
                  aria-hidden="true"
                />
                <h3 className="training-title-text">{t.title}</h3>
                <p className="training-desc">{t.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 5. TESTES ══════════ */}
      <section className="tests-section" aria-labelledby="tests-title">
        <div className="container">
          <Card variant="elevated" className="tests-card">
            <div className="tests-inner">
              <div className="tests-content">
                <span className="tests-eyebrow">Avaliação</span>
                <h2 id="tests-title" className="tests-heading">Testes de desempenho</h2>
                <p className="tests-desc">
                  Avalie seu conhecimento em execução de movimentos, reconhecimento de casos,
                  memorização de algoritmos e habilidades gerais no cubo. Cada teste gera um
                  resultado detalhado para guiar seus próximos passos.
                </p>
                <ul className="tests-items" aria-label="Tipos de teste">
                  {[
                    { label: 'Execução de movimentos', color: 'var(--cube-blue)' },
                    { label: 'Habilidades no cubo', color: 'var(--cube-green)' },
                    { label: 'Reconhecimento de padrões', color: 'var(--cube-yellow)' },
                    { label: 'Memorização de algoritmos', color: 'var(--brand-secondary)' },
                  ].map((item) => (
                    <li key={item.label} className="tests-item">
                      <span
                        className="tests-item-dot"
                        style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                        aria-hidden="true"
                      />
                      <span className="tests-item-label">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tests-visual" aria-hidden="true">
                <div className="tests-score-ring">
                  <svg viewBox="0 0 120 120" className="tests-ring-svg" role="img" aria-label="Exemplo de resultado de teste: 75%">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="url(#ring-grad)"
                      strokeWidth="8"
                      strokeDasharray="314"
                      strokeDashoffset="78"
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="tests-ring-label">
                    <span className="tests-ring-value">75%</span>
                    <span className="tests-ring-text">Exemplo</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ══════════ 6. CTA FINAL ══════════ */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-glow" aria-hidden="true" />
            <span className="cta-eyebrow">Pronto para começar?</span>
            <h2 id="cta-title" className="cta-title">
              Comece seu primeiro curso agora
            </h2>
            <p className="cta-desc">
              Escolha um cubo, selecione o nível e inicie sua jornada.
              É gratuito, progressivo e feito para todos os níveis.
            </p>
            <div className="cta-actions">
              <Button variant="cube-accent" size="lg" id="cta-final-primary">
                Começar agora
              </Button>
              <Button variant="secondary" size="lg" id="cta-final-secondary">
                Ver todos os cursos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
