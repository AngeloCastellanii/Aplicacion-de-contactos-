import { useViewVariant } from '../../hooks/useViewVariant';
import { VIEW_VARIANTS } from '../contacts/ContactAdapter';

const LABELS = {
  list: 'List',
  compact: 'Compact',
  grid: 'Grid',
  minimal: 'Minimal',
  detailed: 'Detailed',
};

export function VariantSelector() {
  const { variant, setVariant } = useViewVariant();

  return (
    <div className="variant-selector">
      <span className="variant-selector__label">View</span>
      <div className="variant-selector__options">
        {VIEW_VARIANTS.map((key) => (
          <button
            key={key}
            type="button"
            className={`variant-selector__btn${variant === key ? ' is-active' : ''}`}
            onClick={() => setVariant(key)}
          >
            {LABELS[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
