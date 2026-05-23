import { ContactForm } from '../components/contacts/ContactForm';
import { ContactList } from '../components/contacts/ContactList';
import { Header } from '../components/layout/Header';
import { useContacts } from '../hooks/useContacts';

export function ContactsPage() {
  const { contacts, addContact, removeContact } = useContacts();

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
          <h1>Mis contactos</h1>
          <p className="page-toolbar__meta">{contacts.length} en total</p>
        </div>

        <div className="contacts-layout">
          <section className="contacts-layout__list" aria-label="Lista de contactos">
            <ContactList contacts={contacts} onDelete={handleDelete} />
          </section>
          <section className="contacts-layout__form" aria-label="Formulario de contacto">
            <ContactForm onSubmit={addContact} />
          </section>
        </div>
      </main>
    </>
  );
}
