import { CamaDTO, CamaTipoEnum } from 'store/api/DTOs';

export interface IHabitacionParaTablaReservas {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: CamaDTO[];
}

export const obtenerTipoCamaDescripcion = new Map<CamaTipoEnum, string>([
  [CamaTipoEnum.Individual, 'Individual'],
  [CamaTipoEnum.Matrimonial, 'Matrimonial'],
  [CamaTipoEnum.CuchetaArriba, 'Cucheta Arriba'],
  [CamaTipoEnum.CuchetaAbajo, 'Cucheta Abajo'],
]);
