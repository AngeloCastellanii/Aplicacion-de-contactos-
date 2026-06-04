import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS } from '../config/storage.keys';

function readContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  } catch {
    throw new Error('No hay espacio suficiente para guardar. Prueba con una imagen más pequeña.');
  }
}

export function getAllContacts() {
  return readContacts().sort(
    (a, b) => new Date(b.actualizadoEn) - new Date(a.actualizadoEn),
  );
}

export function createContact(payload) {
  const now = new Date().toISOString();
  const contact = {
    id: uuidv4(),
    numero: payload.numero.trim(),
    nombre: payload.nombre.trim(),
    apellido: payload.apellido.trim(),
    foto: payload.foto ?? null,
    notas: payload.notas?.trim() ?? '',
    apodos: payload.apodos ?? [],
    creadoEn: now,
    actualizadoEn: now,
  };

  const contacts = readContacts();
  contacts.push(contact);
  writeContacts(contacts);
  return contact;
}

export function getContactById(id) {
  return readContacts().find((c) => c.id === id) ?? null;
}

export function updateContact(id, payload) {
  const contacts = readContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated = {
    ...contacts[index],
    numero: payload.numero.trim(),
    nombre: payload.nombre.trim(),
    apellido: payload.apellido.trim(),
    notas: payload.notas?.trim() ?? '',
    apodos: payload.apodos ?? [],
    foto: payload.foto !== undefined ? payload.foto : contacts[index].foto,
    actualizadoEn: new Date().toISOString(),
  };

  contacts[index] = updated;
  writeContacts(contacts);
  return updated;
}

export function deleteContact(id) {
  const contacts = readContacts();
  const next = contacts.filter((c) => c.id !== id);
  const removed = contacts.length !== next.length;
  if (removed) writeContacts(next);
  return removed;
}
