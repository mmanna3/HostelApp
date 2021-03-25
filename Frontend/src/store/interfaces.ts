export interface IUseListarHookRespuesta {
  estado: EstadosApiRequestEnum;
  datos: any[];
  listar: (...params: any[]) => any;
}

export enum EstadosApiRequestEnum {
  cargando = 'cargando',
  inactivo = 'inactivo',
  exitoso = 'exitoso',
  huboError = 'huboError',
}
