import { useEffect, useMemo, useState } from 'react';
import { ContactForm } from '../components/contacts/ContactForm';
import { ContactList } from '../components/contacts/ContactList';
import { ContactListToolbar } from '../components/contacts/ContactListToolbar';
import { ContactDetailModal } from '../components/contacts/ContactDetailModal';
import { Notice } from '../components/common/Notice';
import { Header } from '../components/layout/Header';
import { VariantSelector } from '../components/layout/VariantSelector';
import { STORAGE_KEYS } from '../config/storage.keys';
import { useContacts } from '../hooks/useContacts';
import { useViewVariant } from '../hooks/useViewVariant';
import { filterAndSortContacts, SORT_OPTIONS } from '../utils/contactFilters';

function readSortPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACT_SORT);
    return Object.values(SORT_OPTIONS).includes(saved) ? saved : SORT_OPTIONS.RECENT;
  } catch {
    return SORT_OPTIONS.RECENT;
  }
}

export function ContactsPage() {
  const { contacts, addContact, removeContact } = useContacts();
  const { variant } = useViewVariant();
  const [selectedContact, setSelectedContact] = useState(null);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(readSortPreference);

  const displayedContacts = useMemo(
    () => filterAndSortContacts(contacts, query, sortBy),
    [contacts, query, sortBy],
  );

  const hasActiveFilter = query.trim().length > 0;

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleSortChange = (value) => {
    setSortBy(value);
    localStorage.setItem(STORAGE_KEYS.CONTACT_SORT, value);
  };

  const handleAddContact = (form) => {
    addContact(form);
    setNotice('Contacto guardado correctamente.');
  };

  const deleteContact = (id) => {
    removeContact(id);
    if (selectedContact?.id === id) setSelectedContact(null);
  };

  const handleDelete = (id) => {
    const name = contacts.find((c) => c.id === id);
    const label = name ? `${name.nombre} ${name.apellido}` : 'este contacto';
    if (window.confirm(`¿Eliminar a ${label}?`)) {
      deleteContact(id);
    }
  };

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-toolbar">
          <div>
            <h1>Mis contactos</h1>
            <Notice message={notice} />
          </div>
          <VariantSelector />
        </div>

        <div className="contacts-layout">
          <section className="contacts-layout__list" aria-label="Lista de contactos">
            <ContactListToolbar
              query={query}
              onQueryChange={setQuery}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              resultCount={displayedContacts.length}
              totalCount={contacts.length}
            />
            <ContactList
              contacts={displayedContacts}
              totalCount={contacts.length}
              hasActiveFilter={hasActiveFilter}
              onSelect={setSelectedContact}
              onDelete={handleDelete}
              variant={variant}
            />
          </section>
          <section className="contacts-layout__form" aria-label="Formulario de contacto">
            <ContactForm onSubmit={handleAddContact} />
          </section>
        </div>
      </main>

      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onDelete={deleteContact}
      />
    </>
  );
}
