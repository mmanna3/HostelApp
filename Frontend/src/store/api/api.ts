import { listar, obtenerPorId, listarConLugaresLibres, crear } from './habitacion';

const api = {
  habitaciones: {
    listar: listar,
    obtenerPorId: obtenerPorId,
    listarConLugaresLibres: listarConLugaresLibres,
    crear: crear,
  },
};

export default api;
