import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ContactPhoto } from './ContactPhoto';

export function ContactCardList({ contact, onDelete }) {
  const fullName = `${contact.nombre} ${contact.apellido}`;
  const mainNickname = contact.apodos?.[0];

  return (
    <article className="contact-card contact-card--list">
      <ContactPhoto alt={fullName} size="md" />
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
      <div className="contact-card__actions">
        <Link
          to={`/contactos/${contact.id}/editar`}
          className="btn btn--secondary btn--sm"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={() => onDelete(contact.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

ContactCardList.propTypes = {
  contact: contactShape.isRequired,
  onDelete: PropTypes.func.isRequired,
};
