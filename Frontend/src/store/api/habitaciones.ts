import { HabitacionDTO } from 'interfaces/habitacion';
import { IHabitacionParaTablaReservas } from 'interfaces/reserva';
import {
  generarSliceHttpGet,
  generarSliceHttpPost,
  IApiSliceInfo,
  IObtenerPorIdParams,
} from './utils/generadorDeSlicesParaRequest';

interface ILugaresLibresParams {
  desde: string;
  hasta: string;
}

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
  dataInicial: [],
};

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerHabitacionPorId',
  endpoint: '/habitaciones/obtener',
  dataInicial: null,
};

const listarConLugaresLibresSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habitacionesConLugaresLibres',
  endpoint: '/habitaciones/conLugaresLibres',
  dataInicial: [],
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearHabitacion',
  endpoint: '/habitaciones',
  dataInicial: null,
};

const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
const listarConLugaresLibres = {
  ...generarSliceHttpGet<IHabitacionParaTablaReservas[], ILugaresLibresParams>(listarConLugaresLibresSliceInfo),
};
const obtenerPorId = { ...generarSliceHttpGet<HabitacionDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };
const crear = {
  ...generarSliceHttpPost<string, HabitacionDTO>(crearSliceInfo),
};

export default {
  listar,
  listarConLugaresLibres,
  obtenerPorId,
  crear,
};
