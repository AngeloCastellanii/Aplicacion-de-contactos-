import PropTypes from 'prop-types';
import { contactShape } from '../../models/contactPropTypes';
import { ContactCardCompact } from './variants/ContactCardCompact';
import { ContactCardDetailed } from './variants/ContactCardDetailed';
import { ContactCardGrid } from './variants/ContactCardGrid';
import { ContactCardList } from './variants/ContactCardList';
import { ContactCardMinimal } from './variants/ContactCardMinimal';

const VARIANT_MAP = {
  list: ContactCardList,
  compact: ContactCardCompact,
  grid: ContactCardGrid,
  minimal: ContactCardMinimal,
  detailed: ContactCardDetailed,
};

export const VIEW_VARIANTS = Object.keys(VARIANT_MAP);

export function ContactAdapter({ contact, variant, onDelete }) {
  const Component = VARIANT_MAP[variant] ?? ContactCardList;
  return <Component contact={contact} onDelete={onDelete} />;
}

ContactAdapter.propTypes = {
  contact: contactShape.isRequired,
  variant: PropTypes.oneOf(VIEW_VARIANTS).isRequired,
  onDelete: PropTypes.func.isRequired,
};
