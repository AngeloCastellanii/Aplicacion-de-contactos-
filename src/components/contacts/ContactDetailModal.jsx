import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { Modal } from '../common/Modal';
import { ContactPhoto } from './ContactPhoto';

function formatDate(iso) {
  return new Date(iso).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function ContactDetailModal({ contact, onClose, onDelete }) {
  if (!contact) return null;

  const fullName = `${contact.nombre} ${contact.apellido}`;

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar a ${fullName}?`)) {
      onDelete(contact.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={Boolean(contact)} onClose={onClose} title={fullName}>
      <div className="contact-detail">
        <ContactPhoto src={contact.foto} alt={fullName} size="lg" />

        <dl className="contact-detail__fields">
          <div className="contact-detail__row">
            <dt>Número</dt>
            <dd>{contact.numero}</dd>
          </div>
          <div className="contact-detail__row">
            <dt>Nombre</dt>
            <dd>{contact.nombre}</dd>
          </div>
          <div className="contact-detail__row">
            <dt>Apellido</dt>
            <dd>{contact.apellido}</dd>
          </div>
          <div className="contact-detail__row">
            <dt>Apodos</dt>
            <dd>
              {contact.apodos?.length > 0 ? (
                <ul className="contact-detail__apodos">
                  {contact.apodos.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              ) : (
                <span className="contact-detail__empty">Sin apodos</span>
              )}
            </dd>
          </div>
          <div className="contact-detail__row">
            <dt>Notas</dt>
            <dd className="contact-detail__notes">
              {contact.notas || <span className="contact-detail__empty">Sin notas</span>}
            </dd>
          </div>
          <div className="contact-detail__row">
            <dt>Creado</dt>
            <dd>{formatDate(contact.creadoEn)}</dd>
          </div>
          <div className="contact-detail__row">
            <dt>Actualizado</dt>
            <dd>{formatDate(contact.actualizadoEn)}</dd>
          </div>
        </dl>

        <div className="contact-detail__actions">
          <Link
            to={`/contactos/${contact.id}/editar`}
            className="btn btn--secondary"
            onClick={onClose}
          >
            Editar
          </Link>
          <button type="button" className="btn btn--danger" onClick={handleDelete}>
            Eliminar
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

ContactDetailModal.propTypes = {
  contact: contactShape,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
