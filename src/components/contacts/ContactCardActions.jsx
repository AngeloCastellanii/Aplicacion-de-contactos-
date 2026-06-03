import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ContactCardActions({ contactId, onDelete }) {
  return (
    <div className="contact-card__actions">
      <Link
        to={`/contactos/${contactId}/editar`}
        className="btn btn--secondary btn--sm"
      >
        Editar
      </Link>
      <button
        type="button"
        className="btn btn--danger btn--sm"
        onClick={() => onDelete(contactId)}
      >
        Eliminar
      </button>
    </div>
  );
}

ContactCardActions.propTypes = {
  contactId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
