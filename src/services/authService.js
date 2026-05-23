import { DEMO_PASSWORD, DEMO_USER } from '../config/auth.config';
import { STORAGE_KEYS } from '../config/storage.keys';

function readSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(readSession()?.user);
}

export function login(username, password) {
  const user = username.trim();
  if (user === DEMO_USER && password === DEMO_PASSWORD) {
    sessionStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({ user, loginAt: new Date().toISOString() }),
    );
    return { ok: true };
  }
  return { ok: false, message: 'Usuario o contraseña incorrectos.' };
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function getSessionUser() {
  return readSession()?.user ?? null;
}
