import {
  IApiSliceInfo,
  generarSliceHttpGet,
  generarSliceHttpPost,
  generarSliceObtenerPorId,
} from './utils/generadorDeSlicesParaRequest';
import { CheckoutsDeHoyDTO, ReservaResumenDTO } from 'interfaces/reserva';

const listarActualesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservasActuales',
  endpoint: '/reservas/actuales',
};

const listarMensualesSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'reservasMensuales',
  endpoint: '/reservas/mensuales',
};

const checkoutsDeHoySliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'checkoutsDeHoy',
  endpoint: '/reservas/checkoutsDeHoy',
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearReserva',
  endpoint: '/reservas',
};

interface IListarMensualesParams {
  anio: string;
  mes: string;
}

const obtenerPorIdSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerReservaPorId',
  endpoint: '/reservas',
};

const listarActuales = { ...generarSliceHttpGet<ReservaResumenDTO[]>(listarActualesSliceInfo) };

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listarMensuales = {
  ...generarSliceHttpGet<ReservaResumenDTO[], IListarMensualesParams>(listarMensualesSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<string, ReservaResumenDTO>(crearSliceInfo),
};

const obtenerPorId = { ...generarSliceObtenerPorId<ReservaResumenDTO>(obtenerPorIdSliceInfo) };

export default {
  listarMensuales,
  listarActuales,
  checkoutsDeHoy,
  crear,
  obtenerPorId,
};
