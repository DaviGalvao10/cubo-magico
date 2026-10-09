import { useState, type FC } from 'react';
import { ROUTES } from '../../routes';

export interface HeaderProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const Header: FC<HeaderProps> = ({
  currentRoute = ROUTES.HOME,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', path: ROUTES.HOME },
    { label: 'Cursos', path: ROUTES.COURSES },
    { label: 'Treinos', path: ROUTES.TRAINING },
    { label: 'Testes', path: ROUTES.TESTS },
    { label: 'Padrões', path: ROUTES.PATTERNS },
    { label: 'Speedcubing', path: ROUTES.SPEEDCUBING },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Logo / Marca da Plataforma */}
        <button
          type="button"
          onClick={() => handleNavClick(ROUTES.HOME)}
          className="header-logo-btn"
          aria-label="Cubo Mágico - Página Inicial"
        >
          <div className="header-logo-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              {/* Cubo Isométrico Estilizado com as Cores Principais */}
              <path d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z" fill="#0F172A" stroke="var(--border-medium)" strokeWidth="1.5" />
              {/* Top Face (Amarelo / Branco) */}
              <path d="M16 3.5L27 10L16 16.5L5 10L16 3.5Z" fill="url(#cube-top-grad)" />
              {/* Left Face (Azul / Laranja) */}
              <path d="M5 11.5L15 17.5V28L5 22V11.5Z" fill="url(#cube-left-grad)" />
              {/* Right Face (Vermelho / Verde) */}
              <path d="M17 17.5L27 11.5V22L17 28V17.5Z" fill="url(#cube-right-grad)" />
              {/* Grades Internas Sutis */}
              <path d="M16 3.5V16.5M5 10L27 10M16 16.5L5 11.5M16 16.5L27 11.5M16 16.5V29.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              
              <defs>
                <linearGradient id="cube-top-grad" x1="5" y1="3.5" x2="27" y2="16.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FACC15" />
                  <stop offset="1" stopColor="#EAB308" />
                </linearGradient>
                <linearGradient id="cube-left-grad" x1="5" y1="11.5" x2="15" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="cube-right-grad" x1="17" y1="11.5" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EF4444" />
                  <stop offset="1" stopColor="#DC2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="header-brand-text">
            <span className="brand-name">CUBO<span className="brand-highlight">MÁGICO</span></span>
          </div>
        </button>

        {/* Navegação Desktop */}
        <nav className="desktop-nav" aria-label="Navegação Principal">
          {navItems.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Menu Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <nav
            className="mobile-nav-drawer"
            aria-label="Menu Mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-nav-links">
              {navItems.map((item) => {
                const isActive = currentRoute === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="mobile-active-dot" />}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
