import { CheckoutsDeHoyDTO, ReservaResumenDTO, ReservasDelPeriodoDTO } from 'interfaces/reserva';
import {
  generarSliceHttpGet,
  generarSliceHttpPost,
  IApiSliceInfo,
  IObtenerPorIdParams,
} from './utils/generadorDeSlicesParaRequest';

const listarActualesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservasActuales',
  endpoint: '/reservas/actuales',
  dataInicial: [],
};

const listarMensualesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservasMensuales',
  endpoint: '/reservas/mensuales',
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

interface IListarMensualesParams {
  anio: string;
  mes: string;
}

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerReservaPorId',
  endpoint: '/reservas/obtener',
  dataInicial: null,
};

const listarActuales = { ...generarSliceHttpGet<ReservasDelPeriodoDTO>(listarActualesSliceInfo) };

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listarMensuales = {
  ...generarSliceHttpGet<ReservasDelPeriodoDTO, IListarMensualesParams>(listarMensualesSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<string, ReservaResumenDTO>(crearSliceInfo),
};

const obtenerPorId = { ...generarSliceHttpGet<ReservaResumenDTO, IObtenerPorIdParams>(obtenerPorIdSliceInfo) };

export default {
  listarMensuales,
  listarActuales,
  checkoutsDeHoy,
  crear,
  obtenerPorId,
};
