import { useNavigate } from 'react-router-dom';
import { ContactForm } from '../components/contacts/ContactForm';
import { Header } from '../components/layout/Header';
import { useContacts } from '../hooks/useContacts';

export function ContactCreatePage() {
  const navigate = useNavigate();
  const { addContact } = useContacts();

  const handleSubmit = (form) => {
    addContact(form);
    navigate('/contactos', { state: { notice: 'Contacto guardado correctamente.' } });
  };

  return (
    <>
      <Header />
      <main className="page page--form">
        <div className="page-hero page-hero--compact">
          <h1>Nuevo contacto</h1>
          <p>Completa los datos y agrega una foto opcional.</p>
        </div>
        <ContactForm
          title="Datos del contacto"
          submitLabel="Guardar contacto"
          cancelTo="/contactos"
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
