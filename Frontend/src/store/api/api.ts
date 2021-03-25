import { listar, obtenerPorId, listarConLugaresLibres } from './habitacion';

const api = {
  habitaciones: {
    listar: listar,
    obtenerPorId: obtenerPorId,
    listarConLugaresLibres: listarConLugaresLibres,
  },
};

export default api;
