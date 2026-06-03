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
    if (updated) navigate('/contactos');
  };

  return (
    <>
      <Header />
      <main className="page page--narrow">
        <ContactForm
          title="Editar contacto"
          submitLabel="Guardar cambios"
          initialValues={contact}
          cancelTo="/contactos"
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
