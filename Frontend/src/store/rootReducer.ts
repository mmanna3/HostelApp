import { combineReducers } from 'redux';

import { listar, obtenerPorId } from 'store/api/habitacion';
import habitacionesConLugaresLibresReducer from 'store/api/habitacion/listarConLugaresLibres/slice';
import crearHabitacionReducer from 'store/api/habitacion/crear/slice';

import huespedesReducer from 'store/api/huespedes/listar/slice';
import crearHuespedReducer from 'store/api/huespedes/crear/slice';

import tablaDeReservas from 'store/app/tablaDeReservas/slice';

import reservasReducer from 'store/api/reserva/listar/slice';
import crearReservaReducer from 'store/api/reserva/crear/slice';
import checkoutsDeHoy from 'store/api/reserva/checkoutsDeHoy/slice';

import loginReducer from 'store/api/usuario/autenticar/slice';

const rootReducer = combineReducers({
  login: loginReducer,

  habitaciones: listar.reducer,
  obtenerHabitacionPorId: obtenerPorId.reducer,
  habitacionesConLugaresLibres: habitacionesConLugaresLibresReducer,
  crearHabitacion: crearHabitacionReducer,

  huespedes: huespedesReducer,
  crearHuesped: crearHuespedReducer,

  tablaDeReservas: tablaDeReservas,

  reservas: reservasReducer,
  crearReserva: crearReservaReducer,

  checkoutsDeHoy: checkoutsDeHoy,
});

export default rootReducer;
