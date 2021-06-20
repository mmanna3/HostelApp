import { HabitacionConLugaresLibresDTO, HabitacionDTO, HabitacionDetalleDTO, CambiarHabilitacionDTO } from 'store/api/DTOs';
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

const deshabilitarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'deshabilitarHabitacion',
  endpoint: '/habitaciones/deshabilitar',
  dataInicial: null,
};

const habilitarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habilitarHabitacion',
  endpoint: '/habitaciones/habilitar',
  dataInicial: null,
};

const deshabilitarCamaSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'deshabilitarCama',
  endpoint: '/habitaciones/deshabilitarCama',
  dataInicial: null,
};

const habilitarCamaSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'habilitarCama',
  endpoint: '/habitaciones/habilitarCama',
  dataInicial: null,
};

const listar = { ...generarSliceHttpGet<HabitacionDTO[]>(listarSliceInfo) };
const listarConLugaresLibres = {
  ...generarSliceHttpGet<HabitacionConLugaresLibresDTO[], ILugaresLibresParams>(listarConLugaresLibresSliceInfo),
};
const obtenerPorId = { ...generarSliceHttpGet<HabitacionDetalleDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };
const crear = {
  ...generarSliceHttpPost<string, HabitacionDTO>(crearSliceInfo),
};

const deshabilitar = {
  ...generarSliceHttpPost<void, CambiarHabilitacionDTO>(deshabilitarSliceInfo),
};
const habilitar = {
  ...generarSliceHttpPost<void, CambiarHabilitacionDTO>(habilitarSliceInfo),
};

const deshabilitarCama = {
  ...generarSliceHttpPost<void, CambiarHabilitacionDTO>(deshabilitarCamaSliceInfo),
};
const habilitarCama = {
  ...generarSliceHttpPost<void, CambiarHabilitacionDTO>(habilitarCamaSliceInfo),
};

export default {
  listar,
  listarConLugaresLibres,
  obtenerPorId,
  crear,
  deshabilitar,
  habilitar,
  deshabilitarCama,
  habilitarCama,
};
