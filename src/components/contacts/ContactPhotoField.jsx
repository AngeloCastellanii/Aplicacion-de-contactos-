import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { MAX_PHOTO_HEIGHT, MAX_PHOTO_WIDTH, PHOTO_ASPECT } from '../../config/image.config';
import { cropImageToDataUrl, readImageDimensions, validateImageFile } from '../../services/imageService';
import { ContactPhoto } from './ContactPhoto';

function buildCrop(mediaWidth, mediaHeight) {
  return centerCrop(
    makeAspectCrop(
      { unit: '%', width: 90 },
      PHOTO_ASPECT,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function ContactPhotoField({ value, onChange }) {
  const imgRef = useRef(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const check = validateImageFile(file);
    if (!check.ok) {
      setError(check.message);
      return;
    }

    try {
      const { width, height } = await readImageDimensions(file);
      if (width > MAX_PHOTO_WIDTH || height > MAX_PHOTO_HEIGHT) {
        setError(`La imagen (${width}×${height}) se recortará al guardar (máx. ${MAX_PHOTO_WIDTH}×${MAX_PHOTO_HEIGHT}).`);
      } else {
        setError('');
      }
    } catch {
      setError('No se pudo leer la imagen.');
      return;
    }

    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(URL.createObjectURL(file));
    setCrop(undefined);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(buildCrop(width, height));
  };

  const applyCrop = () => {
    if (!imgRef.current || !crop?.width || !crop?.height) {
      setError('Selecciona el área a recortar.');
      return;
    }
    try {
      const dataUrl = cropImageToDataUrl(imgRef.current, crop);
      onChange(dataUrl);
      URL.revokeObjectURL(cropSrc);
      setCropSrc(null);
      setCrop(undefined);
      setError('');
    } catch {
      setError('No se pudo procesar la imagen.');
    }
  };

  const cancelCrop = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    setCrop(undefined);
  };

  const removePhoto = () => {
    onChange(null);
    cancelCrop();
    setError('');
  };

  return (
    <div className="photo-field">
      <span className="field-label">Foto</span>

      <div className="photo-field__preview">
        <ContactPhoto src={value} alt="Vista previa" size="lg" />
      </div>

      <input type="file" accept="image/*" onChange={handleFile} className="photo-field__input" />

      {cropSrc && (
        <div className="photo-field__crop">
          <ReactCrop crop={crop} onChange={setCrop} aspect={PHOTO_ASPECT}>
            <img ref={imgRef} src={cropSrc} alt="Recortar" onLoad={onImageLoad} />
          </ReactCrop>
          <div className="photo-field__crop-actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={applyCrop}>
              Aplicar recorte
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={cancelCrop}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {value && (
        <button type="button" className="btn btn--ghost btn--sm photo-field__remove" onClick={removePhoto}>
          Quitar foto
        </button>
      )}

      {error && <span className="field-error">{error}</span>}
      <p className="photo-field__hint">Máx. 400×400 px · hasta 2 MB</p>
    </div>
  );
}

ContactPhotoField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
