import { ISliceHttpGetInfo } from './requestsInterfaces';
import { generarSliceHttpGet, generarSliceHttpGetConParams, generarSliceObtenerPorId } from './generadorDeSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

const listarSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
};

const obtenerPorIdSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'obtenerHabitacionPorId',
  endpoint: '/habitaciones',
};

interface ILugaresLibresParams {
  desde: string;
  hasta: string;
}

const listarConLugaresLibresSliceInfo: ISliceHttpGetInfo = {
  nombreDelSlice: 'habitacionesConLugaresLibres',
  endpoint: '/habitaciones/conLugaresLibres',
};

export const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
export const listarConLugaresLibres = {
  ...generarSliceHttpGetConParams<HabitacionDTO[], ILugaresLibresParams>(listarConLugaresLibresSliceInfo),
};
export const obtenerPorId = { ...generarSliceObtenerPorId<HabitacionDTO>(obtenerPorIdSliceInfo) };
