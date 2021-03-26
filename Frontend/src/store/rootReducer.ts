import { combineReducers } from 'redux';

import api from 'store/api/api';

import tablaDeReservas from 'store/app/tablaDeReservas/slice';

import loginReducer from 'store/api/usuario/autenticar/slice';

const rootReducer = combineReducers({
  login: loginReducer,

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
