import { combineReducers } from 'redux';

import habitaciones from 'store/api/habitacion';
import reservas from 'store/api/reserva';

import huespedesReducer from 'store/api/huespedes/listar/slice';
import crearHuespedReducer from 'store/api/huespedes/crear/slice';

import tablaDeReservas from 'store/app/tablaDeReservas/slice';

import loginReducer from 'store/api/usuario/autenticar/slice';

const rootReducer = combineReducers({
  login: loginReducer,

  habitaciones: habitaciones.listar.reducer,
  obtenerHabitacionPorId: habitaciones.obtenerPorId.reducer,
  habitacionesConLugaresLibres: habitaciones.listarConLugaresLibres.reducer,
  crearHabitacion: habitaciones.crear.reducer,

  huespedes: huespedesReducer,
  crearHuesped: crearHuespedReducer,

  tablaDeReservas: tablaDeReservas,

  reservasActuales: reservas.listarActuales.reducer,
  reservasMensuales: reservas.listarMensuales.reducer,
  crearReserva: reservas.crear.reducer,
  checkoutsDeHoy: reservas.checkoutsDeHoy.reducer,
});

export default rootReducer;
