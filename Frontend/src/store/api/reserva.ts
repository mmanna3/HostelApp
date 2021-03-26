import { IApiSliceInfo } from './requestsInterfaces';
import { generarSliceHttpGet, generarSliceHttpGetConParams } from './generadorDeSlice';
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

interface IListarMensualesParams {
  anio: string;
  mes: string;
}

const listarActuales = { ...generarSliceHttpGet<ReservaResumenDTO[]>(listarActualesSliceInfo) };

const checkoutsDeHoy = { ...generarSliceHttpGet<CheckoutsDeHoyDTO[]>(checkoutsDeHoySliceInfo) };

const listarMensuales = {
  ...generarSliceHttpGetConParams<ReservaResumenDTO[], IListarMensualesParams>(listarMensualesSliceInfo),
};

export default {
  listarMensuales,
  listarActuales,
  checkoutsDeHoy,
};
