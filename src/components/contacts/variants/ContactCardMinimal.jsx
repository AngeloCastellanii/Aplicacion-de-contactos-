import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactCardActions } from '../ContactCardActions';
import { ContactCardShell } from '../ContactCardShell';

function getInitials(nombre, apellido) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

export function ContactCardMinimal({ contact, onSelect, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <ContactCardShell contact={contact} onSelect={onSelect} className="contact-card contact-card--minimal">
      <div className="contact-initials" aria-hidden="true">
        {getInitials(contact.nombre, contact.apellido)}
      </div>
      <h3 className="contact-card__name">{fullName}</h3>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </ContactCardShell>
  );
}

ContactCardMinimal.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
