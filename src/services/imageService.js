import { convertToPixelCrop } from 'react-image-crop';
import {
  JPEG_QUALITY,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  MAX_PHOTO_HEIGHT,
  MAX_PHOTO_WIDTH,
} from '../config/image.config';

export function validateImageFile(file) {
  if (!file?.type?.startsWith('image/')) {
    return { ok: false, message: 'Selecciona un archivo de imagen válido.' };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, message: `La imagen no puede superar ${MAX_FILE_SIZE_MB} MB.` };
  }
  return { ok: true };
}

function scaleDimensions(width, height, maxW, maxH) {
  let w = width;
  let h = height;
  if (w > maxW || h > maxH) {
    const ratio = Math.min(maxW / w, maxH / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }
  return { width: w, height: h };
}

export function cropImageToDataUrl(image, crop) {
  const displayCrop = convertToPixelCrop(crop, image.width, image.height);
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelCrop = {
    x: Math.round(displayCrop.x * scaleX),
    y: Math.round(displayCrop.y * scaleY),
    width: Math.round(displayCrop.width * scaleX),
    height: Math.round(displayCrop.height * scaleY),
  };

  if (pixelCrop.width <= 0 || pixelCrop.height <= 0) {
    throw new Error('Área de recorte inválida.');
  }

  const { width, height } = scaleDimensions(
    pixelCrop.width,
    pixelCrop.height,
    MAX_PHOTO_WIDTH,
    MAX_PHOTO_HEIGHT,
  );

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    width,
    height,
  );

  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}
