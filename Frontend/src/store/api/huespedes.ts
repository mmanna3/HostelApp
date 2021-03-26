import { IApiSliceInfo } from './requestsInterfaces';
import { generarSliceHttpGet, generarSliceHttpPost } from './generadorDeSlice';
import { HuespedDTO } from 'interfaces/huesped';

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'huespedes',
  endpoint: '/huespedes',
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearHuesped',
  endpoint: '/huespedes',
};

const listar = { ...generarSliceHttpGet<HuespedDTO[]>(listarSliceInfo) };

const crear = {
  ...generarSliceHttpPost<string, HuespedDTO>(crearSliceInfo),
};

export default {
  listar,
  crear,
};
