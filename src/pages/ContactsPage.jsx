import { ContactForm } from '../components/contacts/ContactForm';
import { ContactList } from '../components/contacts/ContactList';
import { Header } from '../components/layout/Header';
import { VariantSelector } from '../components/layout/VariantSelector';
import { useContacts } from '../hooks/useContacts';
import { useViewVariant } from '../hooks/useViewVariant';

export function ContactsPage() {
  const { contacts, addContact, removeContact } = useContacts();
  const { variant } = useViewVariant();

  const handleDelete = (id) => {
    const name = contacts.find((c) => c.id === id);
    const label = name ? `${name.nombre} ${name.apellido}` : 'este contacto';
    if (window.confirm(`¿Eliminar a ${label}?`)) {
      removeContact(id);
    }
  };

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-toolbar">
          <div>
            <h1>Mis contactos</h1>
            <p className="page-toolbar__meta">{contacts.length} en total</p>
          </div>
          <VariantSelector />
        </div>

        <div className="contacts-layout">
          <section className="contacts-layout__list" aria-label="Lista de contactos">
            <ContactList contacts={contacts} onDelete={handleDelete} variant={variant} />
          </section>
          <section className="contacts-layout__form" aria-label="Formulario de contacto">
            <ContactForm onSubmit={addContact} />
          </section>
        </div>
      </main>
    </>
  );
}
