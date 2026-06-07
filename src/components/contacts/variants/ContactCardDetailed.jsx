import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';
import { ContactCardShell } from '../ContactCardShell';
import { ApodosTags } from '../ApodosTags';

export function ContactCardDetailed({ contact, onSelect, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <ContactCardShell contact={contact} onSelect={onSelect} className="contact-card contact-card--detailed">
      <ContactPhoto src={contact.foto} alt={fullName} size="md" />
      <div className="contact-card__body">
        <h3 className="contact-card__name">{fullName}</h3>
        <p className="contact-card__phone">{contact.numero}</p>
        {contact.apodos?.length > 0 && <ApodosTags apodos={contact.apodos} />}
        {contact.notas && <p className="contact-card__notes contact-card__notes--full">{contact.notas}</p>}
      </div>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </ContactCardShell>
  );
}

ContactCardDetailed.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
