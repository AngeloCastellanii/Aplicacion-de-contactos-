import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';

export function ContactCardCompact({ contact, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <article className="contact-card contact-card--compact">
      <ContactPhoto alt={fullName} size="sm" />
      <div className="contact-card__body">
        <h3 className="contact-card__name">{fullName}</h3>
        <p className="contact-card__phone">{contact.numero}</p>
      </div>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </article>
  );
}

ContactCardCompact.propTypes = {
  contact: contactShape.isRequired,
  onDelete: PropTypes.func.isRequired,
};
