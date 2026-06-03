import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';
import { ContactCardShell } from '../ContactCardShell';

export function ContactCardList({ contact, onSelect, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;
  const mainNickname = contact.apodos?.[0];

  return (
    <ContactCardShell contact={contact} onSelect={onSelect} className="contact-card contact-card--list">
      <ContactPhoto src={contact.foto} alt={fullName} size="md" />
      <div className="contact-card__body">
        <h3 className="contact-card__name">{fullName}</h3>
        {mainNickname && <p className="contact-card__nickname">{mainNickname}</p>}
        <p className="contact-card__phone">{contact.numero}</p>
        {contact.notas && <p className="contact-card__notes">{contact.notas}</p>}
        {contact.apodos?.length > 1 && (
          <p className="contact-card__tags">
            {contact.apodos.slice(1).map((a) => (
              <span key={a} className="tag">
                {a}
              </span>
            ))}
          </p>
        )}
      </div>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </ContactCardShell>
  );
}

ContactCardList.propTypes = {
  contact: contactShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
