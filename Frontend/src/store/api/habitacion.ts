import { ISliceHttpGetInfo } from './requestsInterfaces';
import { generarSliceHttpGet } from './generadorDeSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

const listarSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
  //parámetros
};

export const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };

// export const obtenerPorId = { ...generarSliceHttpGet<HabitacionDTO[]>(obtenerPorIdSliceInfo) };
