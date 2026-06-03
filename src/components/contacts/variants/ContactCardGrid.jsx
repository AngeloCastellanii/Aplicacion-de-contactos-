import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';

export function ContactCardGrid({ contact, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;
  const mainNickname = contact.apodos?.[0];

  return (
    <article className="contact-card contact-card--grid">
      <ContactPhoto alt={fullName} size="lg" />
      <h3 className="contact-card__name">{fullName}</h3>
      {mainNickname && <p className="contact-card__nickname">{mainNickname}</p>}
      <p className="contact-card__phone">{contact.numero}</p>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </article>
  );
}

ContactCardGrid.propTypes = {
  contact: contactShape.isRequired,
  onDelete: PropTypes.func.isRequired,
};
