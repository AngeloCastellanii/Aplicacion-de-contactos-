import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ContactForm } from '../components/contacts/ContactForm';
import { Header } from '../components/layout/Header';
import { useContacts } from '../hooks/useContacts';
import * as contactsService from '../services/contactsService';

export function ContactEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateContact } = useContacts();
  const contact = contactsService.getContactById(id);

  if (!contact) {
    return <Navigate to="/contactos" replace />;
  }

  const handleSubmit = (form) => {
    const updated = updateContact(id, form);
    if (updated) {
      navigate('/contactos', { state: { notice: 'Contacto actualizado.' } });
    }
  };

  return (
    <>
      <Header />
      <main className="page page--form">
        <div className="page-hero page-hero--compact">
          <h1>Editar contacto</h1>
          <p>Modifica los datos de {contact.nombre} {contact.apellido}.</p>
        </div>
        <ContactForm
          title="Datos del contacto"
          submitLabel="Guardar cambios"
          initialValues={contact}
          cancelTo="/contactos"
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
