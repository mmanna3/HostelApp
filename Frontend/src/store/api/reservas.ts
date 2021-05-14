import { CheckoutsDeHoyDTO, ReservaDTO, ReservasDelPeriodoDTO } from 'store/api/DTOs';
import {
  generarSliceHttpGet,
  generarSliceHttpPost,
  IApiSliceInfo,
  IObtenerPorIdParams,
} from './utils/generadorDeSlicesParaRequest';

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservas',
  endpoint: '/reservas',
  dataInicial: [],
};

const checkoutsDeHoySliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'checkoutsDeHoy',
  endpoint: '/reservas/checkoutsDeHoy',
  dataInicial: [],
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearReserva',
  endpoint: '/reservas',
  dataInicial: null,
};

interface IListarParams {
  primeraNoche: string;
  dias: number;
}

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerReservaPorId',
  endpoint: '/reservas/obtener',
  dataInicial: null,
};

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listar = {
  ...generarSliceHttpGet<ReservasDelPeriodoDTO, IListarParams>(listarSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<string, ReservaDTO>(crearSliceInfo),
};

const obtenerPorId = { ...generarSliceHttpGet<ReservaDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };

export default {
  listar,
  checkoutsDeHoy,
  crear,
  obtenerPorId,
};
