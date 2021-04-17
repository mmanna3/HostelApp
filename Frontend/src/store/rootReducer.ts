import { combineReducers } from 'redux';
import api from 'store/api/api';
import tablaDeReservas from 'store/app/tablaDeReservas/slice';

const rootReducer = combineReducers({
  autenticarUsuario: api.usuarios.autenticar.reducer,

  habitaciones: api.habitaciones.listar.reducer,
  obtenerHabitacionPorId: api.habitaciones.obtenerPorId.reducer,
  habitacionesConLugaresLibres: api.habitaciones.listarConLugaresLibres.reducer,
  crearHabitacion: api.habitaciones.crear.reducer,

  huespedes: api.huespedes.listar.reducer,
  crearHuesped: api.huespedes.crear.reducer,
  obtenerHuespedPorDniOPasaporte: api.huespedes.obtenerPorDniOPasaporte.reducer,

  tablaDeReservas: tablaDeReservas,

  obtenerReservaPorId: api.reservas.obtenerPorId.reducer,
  reservas: api.reservas.listar.reducer,
  crearReserva: api.reservas.crear.reducer,
  checkoutsDeHoy: api.reservas.checkoutsDeHoy.reducer,
});

export default rootReducer;
