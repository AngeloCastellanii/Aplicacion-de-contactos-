import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';

export function ContactCardShell({ contact, onSelect, className, children }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(contact);
    }
  };

  return (
    <article
      className={`${className} contact-card--clickable`}
      onClick={() => onSelect(contact)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalle de ${fullName}`}
    >
      {contact.orden != null && (
        <span className="contact-card__order" aria-hidden="true">
          {contact.orden}
        </span>
      )}
      {children}
    </article>
  );
}

ContactCardShell.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
