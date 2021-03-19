import useCrearHabitacion from './api/habitacion/crear/useCrearHabitacion';
import useListarHabitaciones from './api/habitacion/listar/useListar';
import { IUseListarHookRespuesta } from './interfaces';

interface IStore {
  habitaciones: {
    crear: () => any; //Probablemente acá pueda devolver una misma firma para todos los CREAR
    listar: () => IUseListarHookRespuesta;
  };
}

const store: IStore = {
  habitaciones: {
    crear: useCrearHabitacion,
    listar: useListarHabitaciones,
  },
};

export default store;
