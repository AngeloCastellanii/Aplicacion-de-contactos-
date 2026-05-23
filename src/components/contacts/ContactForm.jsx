import { useState } from 'react';
import PropTypes from 'prop-types';
import { ApodosInput } from './ApodosInput';

const initialState = {
  numero: '',
  nombre: '',
  apellido: '',
  notas: '',
  apodos: [],
};

export function ContactForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.numero.trim()) next.numero = 'El número es obligatorio.';
    else if (!/^[\d\s+()-]{6,20}$/.test(form.numero.trim())) {
      next.numero = 'Ingresa un número válido.';
    }
    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      next.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }
    if (!form.apellido.trim()) next.apellido = 'El apellido es obligatorio.';
    if (form.notas.length > 500) next.notas = 'Las notas no pueden superar 500 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm(initialState);
    setErrors({});
  };

  return (
    <form className="contact-form card" onSubmit={handleSubmit} noValidate>
      <h2>Nuevo contacto</h2>

      <label className="field">
        <span>Número</span>
        <input
          type="tel"
          name="numero"
          value={form.numero}
          onChange={handleChange('numero')}
          placeholder="+58 xxx xxxx-xxxx"
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

      <button type="submit" className="btn btn--primary">
        Guardar contacto
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
