export interface IUseListarHookRespuesta {
  estado: EstadosFetchEnum;
  datos: any[];
  listar: (...params: any[]) => any;
}

export enum EstadosFetchEnum {
  cargando = 'cargando',
  inactivo = 'inactivo',
  exitoso = 'exitoso',
  huboError = 'huboError',
}
