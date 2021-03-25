import useCrearHabitacion from './api/habitacion/crear/useCrearHabitacion';
// import useListarHabitaciones from './api/habitacion/listar/useListar';
import userListarHuespedes from './api/huespedes/listar/useListar';
import { IUseListarHookRespuesta } from './interfaces';

interface IStore {
  habitaciones: {
    crear: () => any; //Probablemente acá pueda devolver una misma firma para todos los CREAR
    // listar: () => IUseListarHookRespuesta;
    // listarConLugaresLibres: (desde: string, hasta: string) => IUseListarHookRespuesta;
  };
  huespedes: {
    listar: () => IUseListarHookRespuesta;
  };
}

const store: IStore = {
  habitaciones: {
    crear: useCrearHabitacion,
    // listar: useListarHabitaciones,
    // listarConLugaresLibres: useListarHabitacionesConLugaresLibres,
  },
  huespedes: {
    listar: userListarHuespedes,
  },
};

export default store;
