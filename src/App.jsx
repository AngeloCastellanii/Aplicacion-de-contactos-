import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContactsProvider } from './context/ContactsContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ContactsPage } from './pages/ContactsPage';

export default function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/contactos"
              element={
                <ProtectedRoute>
                  <ContactsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/contactos" replace />} />
            <Route path="*" element={<Navigate to="/contactos" replace />} />
          </Routes>
        </BrowserRouter>
      </ContactsProvider>
    </AuthProvider>
  );
}
