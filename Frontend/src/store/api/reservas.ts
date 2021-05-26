import {
  CheckoutsDeHoyDTO,
  HacerCheckInDTO,
  HacerCheckOutDTO,
  ReservaCreacionDTO,
  ReservaDetalleDTO,
  ReservasDelPeriodoDTO,
} from 'store/api/DTOs';
import {
  generarSliceHttpGet,
  generarSliceHttpPost,
  IApiSliceInfo,
  IObtenerPorIdParams,
} from './utils/generadorDeSlicesParaRequest';

const listarVigentesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservas',
  endpoint: '/reservas/vigentes',
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

const hacerCheckInSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'hacerCheckIn',
  endpoint: '/reservas/hacerCheckIn',
  dataInicial: null,
};

const hacerCheckOutSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'hacerCheckOut',
  endpoint: '/reservas/hacerCheckOut',
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

const listarVigentes = {
  ...generarSliceHttpGet<ReservasDelPeriodoDTO, IListarParams>(listarVigentesSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<string, ReservaCreacionDTO>(crearSliceInfo),
};

const hacerCheckIn = {
  ...generarSliceHttpPost<string, HacerCheckInDTO>(hacerCheckInSliceInfo),
};

const hacerCheckOut = {
  ...generarSliceHttpPost<string, HacerCheckOutDTO>(hacerCheckOutSliceInfo),
};

const obtenerPorId = { ...generarSliceHttpGet<ReservaDetalleDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };

export default {
  listarVigentes,
  checkoutsDeHoy,
  crear,
  obtenerPorId,
  hacerCheckIn,
  hacerCheckOut,
};
