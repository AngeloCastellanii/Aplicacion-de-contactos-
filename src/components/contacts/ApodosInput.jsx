import { useState } from 'react';
import PropTypes from 'prop-types';

const VISIBLE_LIMIT = 4;

export function ApodosInput({ value, onChange }) {
  const [draft, setDraft] = useState('');
  const [expanded, setExpanded] = useState(false);

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

  const hasMore = value.length > VISIBLE_LIMIT;
  const visible = expanded ? value : value.slice(0, VISIBLE_LIMIT);

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
        <>
          <ul className="apodos-input__list">
            {visible.map((apodo) => (
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
          {hasMore && (
            <button
              type="button"
              className="apodos-list__toggle"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? 'Ver menos' : `Ver todos (${value.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

ApodosInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
