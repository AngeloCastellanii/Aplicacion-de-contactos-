import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ApodosInput } from './ApodosInput';
import { ContactPhotoField } from './ContactPhotoField';

const emptyForm = {
  numero: '',
  nombre: '',
  apellido: '',
  notas: '',
  apodos: [],
  foto: null,
};

function sanitizeNumero(value) {
  return value.replace(/\D/g, '');
}

function toFormValues(contact) {
  return {
    numero: sanitizeNumero(contact.numero ?? ''),
    nombre: contact.nombre,
    apellido: contact.apellido,
    notas: contact.notas ?? '',
    apodos: contact.apodos ?? [],
    foto: contact.foto ?? null,
  };
}

export function ContactForm({
  onSubmit,
  initialValues = null,
  title = 'Nuevo contacto',
  submitLabel = 'Guardar contacto',
  cancelTo = null,
}) {
  const isEdit = Boolean(initialValues);
  const [form, setForm] = useState(() =>
    initialValues ? toFormValues(initialValues) : emptyForm,
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.numero) next.numero = 'El número es obligatorio.';
    else if (!/^\d+$/.test(form.numero)) {
      next.numero = 'El número debe contener solo dígitos y empezar con un número.';
    } else if (form.numero.length < 6 || form.numero.length > 15) {
      next.numero = 'El número debe tener entre 6 y 15 dígitos.';
    }
    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      next.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }
    if (!form.apellido.trim()) next.apellido = 'El apellido es obligatorio.';
    if (form.notas.length > 500) next.notas = 'Las notas no pueden superar 500 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNumeroChange = (e) => {
    setForm((prev) => ({ ...prev, numero: sanitizeNumero(e.target.value) }));
    setErrors((prev) => ({ ...prev, numero: undefined }));
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      onSubmit(form);
      if (!isEdit) {
        setForm(emptyForm);
        setErrors({});
      }
    } catch (err) {
      setErrors({ foto: err.message || 'Error al guardar.' });
    }
  };

  return (
    <form className="contact-form card" onSubmit={handleSubmit} noValidate>
      <h2>{title}</h2>

      <label className="field">
        <span>Número</span>
        <input
          type="text"
          name="numero"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="tel"
          value={form.numero}
          onChange={handleNumeroChange}
          placeholder="Ejemplo: 1234567890"
        />
        {errors.numero && <span className="field-error">{errors.numero}</span>}
      </label>

      <div className="field-row">
        <label className="field">
          <span>Nombre</span>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange('nombre')}
          />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </label>

        <label className="field">
          <span>Apellido</span>
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={handleChange('apellido')}
          />
          {errors.apellido && <span className="field-error">{errors.apellido}</span>}
        </label>
      </div>

      <ContactPhotoField
        value={form.foto}
        onChange={(foto) => {
          setForm((p) => ({ ...p, foto }));
          setErrors((prev) => ({ ...prev, foto: undefined }));
        }}
      />
      {errors.foto && <span className="field-error">{errors.foto}</span>}

      <label className="field">
        <span>Apodos</span>
        <ApodosInput value={form.apodos} onChange={(apodos) => setForm((p) => ({ ...p, apodos }))} />
      </label>

      <label className="field">
        <span>Notas</span>
        <textarea
          name="notas"
          rows={4}
          value={form.notas}
          onChange={handleChange('notas')}
          placeholder="Información adicional..."
        />
        {errors.notas && <span className="field-error">{errors.notas}</span>}
      </label>

      <button type="submit" className="btn btn--primary btn--block">
        {submitLabel}
      </button>

      {cancelTo && (
        <Link to={cancelTo} className="btn btn--ghost btn--block contact-form__cancel">
          Cancelar
        </Link>
      )}
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: contactShape,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelTo: PropTypes.string,
};
