import PropTypes from 'prop-types';

export function Notice({ message, type = 'success' }) {
  if (!message) return null;

  return (
    <p className={`notice notice--${type}`} role="status">
      {message}
    </p>
  );
}

Notice.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
};
