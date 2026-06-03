import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';
import { ContactCardShell } from '../ContactCardShell';

export function ContactCardCompact({ contact, onSelect, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <ContactCardShell contact={contact} onSelect={onSelect} className="contact-card contact-card--compact">
      <ContactPhoto src={contact.foto} alt={fullName} size="sm" />
      <div className="contact-card__body">
        <h3 className="contact-card__name">{fullName}</h3>
        <p className="contact-card__phone">{contact.numero}</p>
      </div>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </ContactCardShell>
  );
}

ContactCardCompact.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
