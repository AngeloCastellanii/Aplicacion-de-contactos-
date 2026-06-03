import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS } from '../config/storage.keys';
import { VIEW_VARIANTS } from '../components/contacts/ContactAdapter';

export const ViewVariantContext = createContext(null);

function readVariant() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW_VARIANT);
    return VIEW_VARIANTS.includes(saved) ? saved : 'list';
  } catch {
    return 'list';
  }
}

export function ViewVariantProvider({ children }) {
  const [variant, setVariantState] = useState(readVariant);

  const setVariant = useCallback((next) => {
    if (!VIEW_VARIANTS.includes(next)) return;
    setVariantState(next);
    localStorage.setItem(STORAGE_KEYS.VIEW_VARIANT, next);
  }, []);

  const value = useMemo(() => ({ variant, setVariant }), [variant, setVariant]);

  return (
    <ViewVariantContext.Provider value={value}>{children}</ViewVariantContext.Provider>
  );
}

ViewVariantProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
