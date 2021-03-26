import { IApiSliceInfo } from './requestsInterfaces';
import { generarSliceHttpPost } from './generadorDeSlice';
import { AutenticarDTO } from 'interfaces/usuario';

const autenticarSliceInfo: IApiSliceInfo = {
  nombreDelSlice: 'autenticarUsuario',
  endpoint: '/usuarios/autenticar',
};

const autenticar = {
  ...generarSliceHttpPost<string, AutenticarDTO>(autenticarSliceInfo),
};

export default {
  autenticar: autenticar,
};
