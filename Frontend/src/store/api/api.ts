import habitaciones from './habitacion';
import reservas from './reserva';

const api = {
  habitaciones: {
    listar: habitaciones.listar,
    obtenerPorId: habitaciones.obtenerPorId,
    listarConLugaresLibres: habitaciones.listarConLugaresLibres,
    crear: habitaciones.crear,
  },
  reservas: {
    listarMensuales: reservas.listarMensuales,
    listarActuales: reservas.listarActuales,
    checkoutsDeHoy: reservas.checkoutsDeHoy,
  },
};

export default api;
