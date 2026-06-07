import { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LIMIT = 3;

export function ApodosTags({ apodos, limit = DEFAULT_LIMIT }) {
  const [expanded, setExpanded] = useState(false);

  if (!apodos?.length) return null;

  const hasMore = apodos.length > limit;
  const visible = expanded ? apodos : apodos.slice(0, limit);

  return (
    <div className="apodos-tags">
      <p className="contact-card__tags">
        {visible.map((a, index) => (
          <span key={`${a}-${index}`} className="tag">
            {a}
          </span>
        ))}
      </p>
      {hasMore && (
        <button
          type="button"
          className="apodos-list__toggle"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Ver menos' : `+${apodos.length - limit} más`}
        </button>
      )}
    </div>
  );
}

ApodosTags.propTypes = {
  apodos: PropTypes.arrayOf(PropTypes.string).isRequired,
  limit: PropTypes.number,
};
