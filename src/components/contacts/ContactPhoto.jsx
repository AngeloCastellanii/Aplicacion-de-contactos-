import { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_AVATAR = '/default-avatar.svg';

export function ContactPhoto({ src, alt, size = 'md' }) {
  const [failed, setFailed] = useState(false);
  const imageSrc = !src || failed ? DEFAULT_AVATAR : src;

  return (
    <div className={`contact-photo contact-photo--${size}`}>
      <img
        src={imageSrc}
        alt={alt}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

ContactPhoto.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
