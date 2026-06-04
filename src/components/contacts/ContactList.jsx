import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ContactAdapter, VIEW_VARIANTS } from './ContactAdapter';

export function ContactList({ contacts, onSelect, onDelete, variant, totalCount, hasActiveFilter }) {
  if (totalCount === 0) {
    return (
      <div className="empty-state card">
        <p>No hay contactos todavía.</p>
        <p className="empty-state__hint">
          Agrega el primero con el formulario. Luego haz clic en una tarjeta para ver el detalle.
        </p>
      </div>
    );
  }

  if (contacts.length === 0 && hasActiveFilter) {
    return (
      <div className="empty-state card">
        <p>No hay resultados para tu búsqueda.</p>
        <p className="empty-state__hint">Prueba con otro nombre, teléfono o apodo.</p>
      </div>
    );
  }

  const listClass =
    variant === 'grid' ? 'contact-list contact-list--grid' : 'contact-list';

  return (
    <ul className={listClass}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactAdapter contact={contact} variant={variant} onSelect={onSelect} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(contactShape).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(VIEW_VARIANTS).isRequired,
  totalCount: PropTypes.number.isRequired,
  hasActiveFilter: PropTypes.bool.isRequired,
};
