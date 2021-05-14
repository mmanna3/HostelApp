import { AutenticarDTO } from 'store/api/DTOs';
import { generarSliceHttpPost, IApiSliceInfo } from './utils/generadorDeSlicesParaRequest';

const autenticarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'autenticarUsuario',
  endpoint: '/usuarios/autenticar',
  dataInicial: null,
};

const autenticar = {
  ...generarSliceHttpPost<string, AutenticarDTO>(autenticarSliceInfo),
};

export default {
  autenticar: autenticar,
};
