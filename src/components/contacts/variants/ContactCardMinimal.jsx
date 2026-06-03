import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactCardActions } from '../ContactCardActions';

function getInitials(nombre, apellido) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

export function ContactCardMinimal({ contact, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <article className="contact-card contact-card--minimal">
      <div className="contact-initials" aria-hidden="true">
        {getInitials(contact.nombre, contact.apellido)}
      </div>
      <h3 className="contact-card__name">{fullName}</h3>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </article>
  );
}

ContactCardMinimal.propTypes = {
  contact: contactShape.isRequired,
  onDelete: PropTypes.func.isRequired,
};
