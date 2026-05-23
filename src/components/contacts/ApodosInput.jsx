import { useState } from 'react';
import PropTypes from 'prop-types';

export function ApodosInput({ value, onChange }) {
  const [draft, setDraft] = useState('');

  const addApodo = () => {
    const trimmed = draft.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setDraft('');
  };

  const removeApodo = (apodo) => {
    onChange(value.filter((a) => a !== apodo));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addApodo();
    }
  };

  return (
    <div className="apodos-input">
      <div className="apodos-input__row">
        <input
          type="text"
          placeholder="Agregar apodo"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="btn btn--secondary" onClick={addApodo}>
          Agregar
        </button>
      </div>
      {value.length > 0 && (
        <ul className="apodos-input__list">
          {value.map((apodo) => (
            <li key={apodo}>
              <span>{apodo}</span>
              <button
                type="button"
                className="apodos-input__remove"
                aria-label={`Quitar apodo ${apodo}`}
                onClick={() => removeApodo(apodo)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ApodosInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
