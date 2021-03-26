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

  tablaDeReservas: tablaDeReservas,

  reservasActuales: api.reservas.listarActuales.reducer,
  reservasMensuales: api.reservas.listarMensuales.reducer,
  crearReserva: api.reservas.crear.reducer,
  checkoutsDeHoy: api.reservas.checkoutsDeHoy.reducer,
});

export default rootReducer;
