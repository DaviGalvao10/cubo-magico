import { Badge, Button, Card } from '../../components/ui';
import './CoursesPage.css';

type CourseStatus = 'available' | 'soon' | 'selected';

type CourseCardData = {
  id: string;
  name: string;
  subtitle: string;
  difficulty: string;
  description: string;
  status: CourseStatus;
  accent: string;
  accentColor: 'orange' | 'blue' | 'red' | 'green';
};

const COURSE_CARDS: CourseCardData[] = [
  {
    id: '2x2',
    name: '2×2',
    subtitle: 'Cubo de bolso',
    difficulty: 'Fácil',
    description: 'Perfeito para começar a entender movimentos, orientações e resolução direta.',
    status: 'available',
    accent: '◼',
    accentColor: 'orange',
  },
  {
    id: '3x3',
    name: '3×3',
    subtitle: 'Clássico',
    difficulty: 'Iniciante',
    description: 'A base do cubo mágico. Ideal para quem quer aprender o método completo com confiança.',
    status: 'selected',
    accent: '◻',
    accentColor: 'blue',
  },
  {
    id: '4x4',
    name: '4×4',
    subtitle: 'Revenge',
    difficulty: 'Médio',
    description: 'Desafio com mais peças, centros móveis e atenção especial para paridades.',
    status: 'soon',
    accent: '◼',
    accentColor: 'red',
  },
  {
    id: 'pyraminx',
    name: 'Pyraminx',
    subtitle: 'Pirâmide',
    difficulty: 'Médio',
    description: 'Uma lógica distinta, com movimento suave e resolução elegante para expandir sua técnica.',
    status: 'available',
    accent: '△',
    accentColor: 'green',
  },
];

const LEVELS = [
  { label: 'Básico', variant: 'basic' as const },
  { label: 'Médio', variant: 'intermediate' as const },
  { label: 'Avançado', variant: 'advanced' as const },
];

const statusConfig = {
  available: {
    badge: 'Disponível',
    variant: 'success' as const,
    buttonLabel: 'Acessar',
    buttonVariant: 'primary' as const,
  },
  selected: {
    badge: 'Selecionado',
    variant: 'default' as const,
    buttonLabel: 'Acessar curso',
    buttonVariant: 'cube-accent' as const,
  },
  soon: {
    badge: 'Em breve',
    variant: 'warning' as const,
    buttonLabel: 'Em breve',
    buttonVariant: 'secondary' as const,
  },
};

export default function CoursesPage({
  onNavigate,
}: {
  onNavigate?: (route: string) => void;
}) {
  return (
    <div className="courses-page">
      <div className="container courses-page-shell">
        <header className="courses-page-header">
          <span className="hero-eyebrow">Escolha seu cubo</span>
          <h1>Qual cubo você quer aprender hoje?</h1>
          <p>
            Comece pelo caminho certo: do 2×2 ao Pyraminx, com trilhas de aprendizado pensadas
            para cada nível de dificuldade.
          </p>
        </header>

        <div className="courses-grid">
          {COURSE_CARDS.map((course) => {
            const status = statusConfig[course.status];
            const cardClassName = [
              'course-card-item',
              course.status === 'selected' ? 'course-card--selected' : '',
              course.status === 'soon' ? 'course-card--soon' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={course.id} className={cardClassName}>
                <Card
                  variant={course.status === 'selected' ? 'elevated' : 'default'}
                  facetColor={course.accentColor}
                  className="course-card"
                >
                  <div className="course-card-top">
                    <div className="course-card-accent" aria-hidden="true">
                      {course.accent}
                    </div>

                    <div className="course-card-identity">
                      <h2 className="course-card-name">{course.name}</h2>
                      <div className="course-card-tag">{course.subtitle}</div>
                    </div>
                  </div>

                  <p className="course-card-copy">{course.description}</p>

                  <div className="course-card-meta">
                    <span className="course-card-difficulty">
                      Dificuldade: <strong>{course.difficulty}</strong>
                    </span>
                  </div>

                  <div className="course-card-levels" aria-label="Níveis de aprendizado">
                    {LEVELS.map(({ label, variant }) => (
                      <Badge key={`${course.id}-${label}`} level={variant} size="sm">
                        {label}
                      </Badge>
                    ))}
                  </div>

                  <div className="course-card-footer">
                    <div className="course-card-status">
                      <Badge variant={status.variant} size="sm">
                        <span className="course-card-status-dot" aria-hidden="true" />
                        {status.badge}
                      </Badge>
                    </div>

                    <Button
                      type="button"
                      variant={status.buttonVariant}
                      size="sm"
                      disabled={course.status === 'soon'}
                      className="course-card-button"
                      onClick={() => {
                        if (course.id === '3x3') onNavigate?.('/cursos/3x3');
                      }}
                    >
                      {status.buttonLabel}
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
