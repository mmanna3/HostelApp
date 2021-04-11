import { IApiSliceInfo, generarSliceHttpGet, generarSliceHttpPost } from './utils/generadorDeSlicesParaRequest';
import { HuespedDTO } from 'interfaces/huesped';

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'huespedes',
  endpoint: '/huespedes',
  dataInicial: [],
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearHuesped',
  endpoint: '/huespedes',
  dataInicial: null,
};

const obtenerPorDniOPasaporteSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerHuespedPorDniOPasaporte',
  endpoint: '/huespedes/obtenerPorDniOPasaporte',
  dataInicial: null,
};

interface IObtenerPorDniOPasaporteParams {
  dniOPasaporte: string;
}

const listar = { ...generarSliceHttpGet<HuespedDTO[]>(listarSliceInfo) };

const crear = {
  ...generarSliceHttpPost<string, HuespedDTO>(crearSliceInfo),
};

const obtenerPorDniOPasaporte = {
  ...generarSliceHttpGet<HuespedDTO, IObtenerPorDniOPasaporteParams>(obtenerPorDniOPasaporteSliceInfo),
};

export default {
  listar,
  crear,
  obtenerPorDniOPasaporte,
};
