import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContactsProvider } from './context/ContactsContext';
import { ViewVariantProvider } from './context/ViewVariantContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ContactsPage } from './pages/ContactsPage';
import { ContactEditPage } from './pages/ContactEditPage';
import { ContactCreatePage } from './pages/ContactCreatePage';

export default function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <ViewVariantProvider>
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
            <Route
              path="/contactos/nuevo"
              element={
                <ProtectedRoute>
                  <ContactCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contactos/:id/editar"
              element={
                <ProtectedRoute>
                  <ContactEditPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/contactos" replace />} />
            <Route path="*" element={<Navigate to="/contactos" replace />} />
          </Routes>
        </BrowserRouter>
        </ViewVariantProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}
