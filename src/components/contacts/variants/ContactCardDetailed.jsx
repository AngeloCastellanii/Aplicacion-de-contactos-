import PropTypes from 'prop-types';
import { contactShape } from '../../../models/contactPropTypes';
import { ContactPhoto } from '../ContactPhoto';
import { ContactCardActions } from '../ContactCardActions';

export function ContactCardDetailed({ contact, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;

  return (
    <article className="contact-card contact-card--detailed">
      <ContactPhoto src={contact.foto} alt={fullName} size="md" />
      <div className="contact-card__body">
        <h3 className="contact-card__name">{fullName}</h3>
        <p className="contact-card__phone">{contact.numero}</p>
        {contact.apodos?.length > 0 && (
          <p className="contact-card__tags">
            {contact.apodos.map((a) => (
              <span key={a} className="tag">
                {a}
              </span>
            ))}
          </p>
        )}
        {contact.notas && <p className="contact-card__notes contact-card__notes--full">{contact.notas}</p>}
      </div>
      <ContactCardActions contactId={contact.id} onDelete={onDelete} />
    </article>
  );
}

ContactCardDetailed.propTypes = {
  contact: contactShape.isRequired,
  onDelete: PropTypes.func.isRequired,
};
