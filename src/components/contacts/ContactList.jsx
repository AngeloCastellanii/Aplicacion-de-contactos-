import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ContactCardList } from './ContactCardList';

export function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state card">
        <p>No hay contactos todavía.</p>
        <p className="empty-state__hint">Agrega el primero con el formulario de la derecha.</p>
      </div>
    );
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactCardList contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(contactShape).isRequired,
  onDelete: PropTypes.func.isRequired,
};
