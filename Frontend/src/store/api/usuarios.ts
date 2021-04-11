import { IApiSliceInfo, generarSliceHttpPost } from './utils/generadorDeSlicesParaRequest';
import { AutenticarDTO } from 'interfaces/usuario';

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
