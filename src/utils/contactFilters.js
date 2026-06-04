export const SORT_OPTIONS = {
  RECENT: 'recent',
  OLDEST: 'oldest',
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
};

export function matchesQuery(contact, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const fullName = `${contact.nombre} ${contact.apellido}`.toLowerCase();
  const numero = contact.numero.toLowerCase();
  const notas = (contact.notas ?? '').toLowerCase();
  const apodos = (contact.apodos ?? []).some((a) => a.toLowerCase().includes(q));

  return (
    fullName.includes(q) ||
    numero.includes(q) ||
    notas.includes(q) ||
    apodos
  );
}

export function sortContacts(contacts, sortBy) {
  const list = [...contacts];

  switch (sortBy) {
    case SORT_OPTIONS.OLDEST:
      return list.sort((a, b) => new Date(a.actualizadoEn) - new Date(b.actualizadoEn));
    case SORT_OPTIONS.NAME_ASC:
      return list.sort((a, b) => {
        const cmp = a.apellido.localeCompare(b.apellido, 'es');
        return cmp !== 0 ? cmp : a.nombre.localeCompare(b.nombre, 'es');
      });
    case SORT_OPTIONS.NAME_DESC:
      return list.sort((a, b) => {
        const cmp = b.apellido.localeCompare(a.apellido, 'es');
        return cmp !== 0 ? cmp : b.nombre.localeCompare(a.nombre, 'es');
      });
    case SORT_OPTIONS.RECENT:
    default:
      return list.sort((a, b) => new Date(b.actualizadoEn) - new Date(a.actualizadoEn));
  }
}

export function filterAndSortContacts(contacts, query, sortBy) {
  const filtered = contacts.filter((c) => matchesQuery(c, query));
  return sortContacts(filtered, sortBy);
}
