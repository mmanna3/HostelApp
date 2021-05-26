import { combineReducers } from 'redux';
import api from 'store/api/api';
import tablaDeReservas from 'store/app/tablaDeReservas/slice';

const rootReducer = combineReducers({
  autenticarUsuario: api.usuarios.autenticar.reducer,

  habitaciones: api.habitaciones.listar.reducer,
  obtenerHabitacionPorId: api.habitaciones.obtenerPorId.reducer,
  habitacionesConLugaresLibres: api.habitaciones.listarConLugaresLibres.reducer,
  crearHabitacion: api.habitaciones.crear.reducer,

  pasajeros: api.pasajeros.listar.reducer,
  crearPasajero: api.pasajeros.crear.reducer,
  obtenerPasajeroPorDniOPasaporte: api.pasajeros.obtenerPorDniOPasaporte.reducer,

  tablaDeReservas: tablaDeReservas,

  obtenerReservaPorId: api.reservas.obtenerPorId.reducer,
  reservas: api.reservas.listar.reducer,
  crearReserva: api.reservas.crear.reducer,
  checkoutsDeHoy: api.reservas.checkoutsDeHoy.reducer,
  hacerCheckIn: api.reservas.hacerCheckIn.reducer,
  hacerCheckOut: api.reservas.hacerCheckOut.reducer,
});

export default rootReducer;
