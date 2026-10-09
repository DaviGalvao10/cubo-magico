import { useEffect, useState } from 'react';
import { Header } from './components/layout';
import { ROUTES } from './routes';
import {
  HomePage,
  CoursesPage,
  CourseStructurePage,
  TrainingPage,
  TestsPage,
  PatternsPage,
  SpeedcubingPage,
} from './pages';

/**
 * Componente raiz da aplicação com Header e navegação integrada.
 */
function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    if (window.location.pathname !== route) window.history.pushState({}, '', route);
    setCurrentRoute(route);
  };

  const renderActivePage = () => {
    if (currentRoute === ROUTES.COURSE_3X3) return <CourseStructurePage />;

    switch (currentRoute) {
      case ROUTES.COURSES:
        return <CoursesPage onNavigate={navigate} />;
      case ROUTES.TRAINING:
        return <TrainingPage />;
      case ROUTES.TESTS:
        return <TestsPage />;
      case ROUTES.PATTERNS:
        return <PatternsPage />;
      case ROUTES.SPEEDCUBING:
        return <SpeedcubingPage />;
      case ROUTES.HOME:
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-layout">
      <Header
        currentRoute={currentRoute.startsWith(`${ROUTES.COURSES}/`) ? ROUTES.COURSES : currentRoute}
        onNavigate={navigate}
      />
      <main className="app-main-content">
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;
