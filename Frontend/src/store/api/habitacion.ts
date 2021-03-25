import { IApiSliceInfo } from './requestsInterfaces';
import {
  generarSliceHttpGet,
  generarSliceHttpGetConParams,
  generarSliceHttpPost,
  generarSliceObtenerPorId,
} from './generadorDeSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

interface ILugaresLibresParams {
  desde: string;
  hasta: string;
}

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
};

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerHabitacionPorId',
  endpoint: '/habitaciones',
};

const listarConLugaresLibresSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habitacionesConLugaresLibres',
  endpoint: '/habitaciones/conLugaresLibres',
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearHabitacion',
  endpoint: '/habitaciones',
};

export const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
export const listarConLugaresLibres = {
  ...generarSliceHttpGetConParams<HabitacionDTO[], ILugaresLibresParams>(listarConLugaresLibresSliceInfo),
};
export const obtenerPorId = { ...generarSliceObtenerPorId<HabitacionDTO>(obtenerPorIdSliceInfo) };
export const crear = {
  ...generarSliceHttpPost<string, HabitacionDTO>(crearSliceInfo),
};
