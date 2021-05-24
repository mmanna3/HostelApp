import { PasajeroDTO } from 'store/api/DTOs';
import { generarSliceHttpGet, generarSliceHttpPost, IApiSliceInfo } from './utils/generadorDeSlicesParaRequest';

const listarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'pasajeros',
  endpoint: '/pasajeros',
  dataInicial: [],
};

const crearSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'crearPasajero',
  endpoint: '/pasajeros',
  dataInicial: null,
};

const obtenerPorDniOPasaporteSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'obtenerPasajeroPorDniOPasaporte',
  endpoint: '/pasajeros/obtenerPorDniOPasaporte',
  dataInicial: null,
};

interface IObtenerPorDniOPasaporteParams {
  dniOPasaporte: string;
}

const listar = { ...generarSliceHttpGet<PasajeroDTO[]>(listarSliceInfo) };

const crear = {
  ...generarSliceHttpPost<string, PasajeroDTO>(crearSliceInfo),
};

const obtenerPorDniOPasaporte = {
  ...generarSliceHttpGet<PasajeroDTO, IObtenerPorDniOPasaporteParams>(obtenerPorDniOPasaporteSliceInfo),
};

export default {
  listar,
  crear,
  obtenerPorDniOPasaporte,
};
