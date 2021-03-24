import { listar, obtenerPorId } from './habitacion';

const api = {
  habitaciones: {
    listar: listar,
    obtenerPorId: obtenerPorId,
  },
};

export default api;
