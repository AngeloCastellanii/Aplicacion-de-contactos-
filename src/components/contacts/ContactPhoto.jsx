import PropTypes from 'prop-types';

const DEFAULT_AVATAR = '/default-avatar.svg';

export function ContactPhoto({ src, alt, size = 'md' }) {
  return (
    <div className={`contact-photo contact-photo--${size}`}>
      <img src={src || DEFAULT_AVATAR} alt={alt} />
    </div>
  );
}

ContactPhoto.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
