import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';
import { ContactCardShell } from '../ContactCardShell';

export function ContactCardGrid({ contact, onSelect, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;
  const mainNickname = contact.apodos?.[0];

  return (
    <ContactCardShell contact={contact} onSelect={onSelect} className="contact-card contact-card--grid">
      <ContactPhoto src={contact.foto} alt={fullName} size="lg" />
      <h3 className="contact-card__name">{fullName}</h3>
      {mainNickname && <p className="contact-card__nickname">{mainNickname}</p>}
      <p className="contact-card__phone">{contact.numero}</p>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </ContactCardShell>
  );
}

ContactCardGrid.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
