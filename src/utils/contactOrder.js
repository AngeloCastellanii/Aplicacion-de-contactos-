export function buildContactOrderMap(contacts) {
  const byCreation = [...contacts].sort(
    (a, b) => new Date(a.creadoEn) - new Date(b.creadoEn),
  );
  return new Map(byCreation.map((contact, index) => [contact.id, index + 1]));
}

export function withContactOrder(contacts, orderMap) {
  return contacts.map((contact) => ({
    ...contact,
    orden: orderMap.get(contact.id),
  }));
}
