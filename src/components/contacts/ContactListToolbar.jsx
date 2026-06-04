import PropTypes from 'prop-types';
import { SORT_OPTIONS } from '../../utils/contactFilters';

const SORT_LABELS = {
  [SORT_OPTIONS.RECENT]: 'Más recientes',
  [SORT_OPTIONS.OLDEST]: 'Más antiguos',
  [SORT_OPTIONS.NAME_ASC]: 'Nombre A–Z',
  [SORT_OPTIONS.NAME_DESC]: 'Nombre Z–A',
};

export function ContactListToolbar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}) {
  const hasFilter = query.trim().length > 0;

  return (
    <div className="list-toolbar card">
      <label className="list-toolbar__search field">
        <span>Buscar</span>
        <input
          type="search"
          placeholder="Nombre, teléfono, apodo o nota..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>

      <label className="list-toolbar__sort field">
        <span>Ordenar</span>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <p className="list-toolbar__meta">
        {hasFilter
          ? `${resultCount} de ${totalCount} contactos`
          : `${totalCount} contactos`}
      </p>
    </div>
  );
}

ContactListToolbar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};
