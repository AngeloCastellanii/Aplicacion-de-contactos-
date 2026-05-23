import PropTypes from 'prop-types';

export const contactShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
  foto: PropTypes.string,
  notas: PropTypes.string,
  apodos: PropTypes.arrayOf(PropTypes.string),
  creadoEn: PropTypes.string.isRequired,
  actualizadoEn: PropTypes.string.isRequired,
});
