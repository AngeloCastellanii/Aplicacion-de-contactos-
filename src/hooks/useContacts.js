import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts debe usarse dentro de ContactsProvider');
  return ctx;
}
