import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ContactAdapter, VIEW_VARIANTS } from './ContactAdapter';

export function ContactList({ contacts, onDelete, variant }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state card">
        <p>No hay contactos todavía.</p>
        <p className="empty-state__hint">Agrega el primero con el formulario de la derecha.</p>
      </div>
    );
  }

  const listClass =
    variant === 'grid' ? 'contact-list contact-list--grid' : 'contact-list';

  return (
    <ul className={listClass}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactAdapter contact={contact} variant={variant} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(contactShape).isRequired,
  onDelete: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(VIEW_VARIANTS).isRequired,
};
