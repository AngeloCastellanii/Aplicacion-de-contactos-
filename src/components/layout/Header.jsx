import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path) =>
    path === '/contactos'
      ? location.pathname === '/contactos'
      : location.pathname.startsWith(path);

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <Link to="/contactos" className="app-header__logo">
          <span className="app-header__logo-icon" aria-hidden="true">◉</span>
          Agenda
        </Link>
        <nav className="app-header__nav" aria-label="Principal">
          <Link
            to="/contactos"
            className={`app-header__nav-link${isActive('/contactos') ? ' is-active' : ''}`}
          >
            Contactos
          </Link>
          <Link
            to="/contactos/nuevo"
            className={`app-header__nav-link${isActive('/contactos/nuevo') ? ' is-active' : ''}`}
          >
            + Nuevo
          </Link>
        </nav>
      </div>
      <div className="app-header__actions">
        <span className="app-header__user">{user}</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </header>
  );
}
