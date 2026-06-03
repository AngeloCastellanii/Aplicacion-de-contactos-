import { useContext } from 'react';
import { ViewVariantContext } from '../context/ViewVariantContext';

export function useViewVariant() {
  const ctx = useContext(ViewVariantContext);
  if (!ctx) throw new Error('useViewVariant debe usarse dentro de ViewVariantProvider');
  return ctx;
}
