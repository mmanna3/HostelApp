import {
  IApiSliceInfo,
  generarSliceHttpGet,
  generarSliceHttpPost,
  IObtenerPorIdParams,
} from './utils/generadorDeSlicesParaRequest';
import { CheckoutsDeHoyDTO, ReservaResumenDTO } from 'interfaces/reserva';

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

const listarActuales = { ...generarSliceHttpGet<ReservaResumenDTO[]>(listarActualesSliceInfo) };

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listarMensuales = {
  ...generarSliceHttpGet<ReservaResumenDTO[], IListarMensualesParams>(listarMensualesSliceInfo),
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
