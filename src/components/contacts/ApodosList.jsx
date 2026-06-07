import { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LIMIT = 4;

export function ApodosList({ apodos, limit = DEFAULT_LIMIT, emptyLabel = 'Sin apodos' }) {
  const [expanded, setExpanded] = useState(false);

  if (!apodos?.length) {
    return <span className="contact-detail__empty">{emptyLabel}</span>;
  }

  const hasMore = apodos.length > limit;
  const visible = expanded ? apodos : apodos.slice(0, limit);

  return (
    <div className="apodos-list">
      <ul className={`apodos-list__items${expanded ? '' : ' apodos-list__items--collapsed'}`}>
        {visible.map((apodo, index) => (
          <li key={`${apodo}-${index}`}>{apodo}</li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          className="apodos-list__toggle"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Ver menos' : `Ver todos (${apodos.length})`}
        </button>
      )}
    </div>
  );
}

ApodosList.propTypes = {
  apodos: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  emptyLabel: PropTypes.string,
};
