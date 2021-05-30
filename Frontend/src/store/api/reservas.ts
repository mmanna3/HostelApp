import {
  CancelarDTO,
  CheckoutsDeHoyDTO,
  HacerCheckInDTO,
  HacerCheckOutDTO,
  ReservaCreacionDTO,
  ReservaDetalleDTO,
  ReservaEstadoEnum,
  ReservaResumenDTO,
  ReservasDelPeriodoDTO,
} from 'store/api/DTOs';
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

const listarVigentesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservasVigentes',
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

const cancelarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'cancelar',
  endpoint: '/reservas/cancelar',
  dataInicial: null,
};

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerReservaPorId',
  endpoint: '/reservas/obtener',
  dataInicial: null,
};

const cantidadDeCheckInsDeHoySliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'cantidadDeCheckInsDeHoy',
  endpoint: '/reservas/cantidadDeCheckInsDeHoy',
  dataInicial: null,
};
interface IListarVigentesParams {
  primeraNoche: string;
  dias: number;
}

interface IListarParams {
  estado: ReservaEstadoEnum | '';
  checkInDesde: Nullable<string>;
  checkInHasta: Nullable<string>;
}

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listar = {
  ...generarSliceHttpGet<ReservaResumenDTO[], IListarParams>(listarSliceInfo),
};

const listarVigentes = {
  ...generarSliceHttpGet<ReservasDelPeriodoDTO, IListarVigentesParams>(listarVigentesSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<number, ReservaCreacionDTO>(crearSliceInfo),
};

const hacerCheckIn = {
  ...generarSliceHttpPost<number, HacerCheckInDTO>(hacerCheckInSliceInfo),
};

const cancelar = {
  ...generarSliceHttpPost<number, CancelarDTO>(cancelarSliceInfo),
};

const hacerCheckOut = {
  ...generarSliceHttpPost<string, HacerCheckOutDTO>(hacerCheckOutSliceInfo),
};

const obtenerPorId = { ...generarSliceHttpGet<ReservaDetalleDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };

const cantidadDeCheckInsDeHoy = { ...generarSliceHttpGet<number, {}>(cantidadDeCheckInsDeHoySliceInfo) };

export default {
  listar,
  listarVigentes,
  checkoutsDeHoy,
  crear,
  obtenerPorId,
  cancelar,
  hacerCheckIn,
  hacerCheckOut,
  cantidadDeCheckInsDeHoy,
};
