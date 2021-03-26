import {
  IApiSliceInfo,
  generarSliceHttpGet,
  generarSliceHttpGetConParams,
  generarSliceHttpPost,
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

const listarActuales = { ...generarSliceHttpGet<ReservaResumenDTO[]>(listarActualesSliceInfo) };

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listarMensuales = {
  ...generarSliceHttpGetConParams<ReservaResumenDTO[], IListarMensualesParams>(listarMensualesSliceInfo),
};

const crear = {
  ...generarSliceHttpPost<string, ReservaResumenDTO>(crearSliceInfo),
};

export default {
  listarMensuales,
  listarActuales,
  checkoutsDeHoy,
  crear,
};
