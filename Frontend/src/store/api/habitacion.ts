import { ISliceHttpGetInfo } from './requestsInterfaces';
import { generarSliceHttpGet, generarSliceObtenerPorId } from './generadorDeSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

const listarSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
};

const obtenerPorIdSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'obtenerHabitacionPorId',
  endpoint: '/habitaciones',
};

export const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
export const obtenerPorId = { ...generarSliceObtenerPorId<HabitacionDTO>(obtenerPorIdSliceInfo) };
