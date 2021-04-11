import {
  IApiSliceInfo,
  generarSliceHttpGet,
  generarSliceHttpPost,
  generarSliceObtenerPorId,
} from './utils/generadorDeSlicesParaRequest';
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

const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
const listarConLugaresLibres = {
  ...generarSliceHttpGet<HabitacionDTO[], ILugaresLibresParams>(listarConLugaresLibresSliceInfo),
};
const obtenerPorId = { ...generarSliceObtenerPorId<HabitacionDTO>(obtenerPorIdSliceInfo) };
const crear = {
  ...generarSliceHttpPost<string, HabitacionDTO>(crearSliceInfo),
};

export default {
  listar,
  listarConLugaresLibres,
  obtenerPorId,
  crear,
};
