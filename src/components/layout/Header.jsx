import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <Link to="/contactos">Agenda de contactos</Link>
      </div>
      <div className="app-header__actions">
        <span className="app-header__user">{user}</span>
        <button type="button" className="btn btn--ghost" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
