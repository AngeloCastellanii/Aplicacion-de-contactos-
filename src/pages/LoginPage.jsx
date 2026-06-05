import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/contactos" replace />;
  }

  return (
    <main className="page page--center">
      <div className="login-shell">
        <LoginForm />
      </div>
    </main>
  );
}
