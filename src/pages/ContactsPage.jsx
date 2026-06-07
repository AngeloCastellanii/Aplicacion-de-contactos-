import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { buildContactOrderMap, withContactOrder } from '../utils/contactOrder';

function readSortPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACT_SORT);
    return Object.values(SORT_OPTIONS).includes(saved) ? saved : SORT_OPTIONS.RECENT;
  } catch {
    return SORT_OPTIONS.RECENT;
  }
}

export function ContactsPage() {
  const { contacts, removeContact } = useContacts();
  const { variant } = useViewVariant();
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState(null);
  const [notice, setNotice] = useState(() => location.state?.notice ?? '');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(readSortPreference);

  const orderMap = useMemo(() => buildContactOrderMap(contacts), [contacts]);

  const displayedContacts = useMemo(() => {
    const filtered = filterAndSortContacts(contacts, query, sortBy);
    return withContactOrder(filtered, orderMap);
  }, [contacts, query, sortBy, orderMap]);

  const selectedWithOrder = useMemo(() => {
    if (!selectedContact) return null;
    const orden = orderMap.get(selectedContact.id);
    return orden != null ? { ...selectedContact, orden } : selectedContact;
  }, [selectedContact, orderMap]);

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
        <section className="page-hero">
          <div className="page-hero__content">
            <h1>Mis contactos</h1>
            <p>Gestiona tus contactps . Haz clic en un contacto para ver el detalle.</p>
            <div className="page-hero__stats">
              <span className="stat-pill">
                <strong>{contacts.length}</strong> guardados
              </span>
              {hasActiveFilter && (
                <span className="stat-pill stat-pill--accent">
                  <strong>{displayedContacts.length}</strong> resultados
                </span>
              )}
            </div>
            <Notice message={notice} />
          </div>
          <Link to="/contactos/nuevo" className="btn btn--primary btn--hero">
            + Nuevo contacto
          </Link>
        </section>

        <div className="page-toolbar">
          <VariantSelector />
        </div>

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

        <Link to="/contactos/nuevo" className="fab" aria-label="Nuevo contacto">
          +
        </Link>
      </main>

      <ContactDetailModal
        contact={selectedWithOrder}
        onClose={() => setSelectedContact(null)}
        onDelete={deleteContact}
      />
    </>
  );
}
