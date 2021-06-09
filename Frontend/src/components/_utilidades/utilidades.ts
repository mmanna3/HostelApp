import { CamaTipoEnum } from 'store/api/DTOs';
import TieneBadgeEstilos from './TieneBadge.module.scss';

export enum ColoresCssEnum {
  success,
  info,
  warning,
}

export interface IBadge {
  texto: string;
  color: ColoresCssEnum;
}

export const classCssBadge = new Map<ColoresCssEnum, string>([
  [ColoresCssEnum.success, TieneBadgeEstilos.tieneBadgeSuccess],
  [ColoresCssEnum.info, TieneBadgeEstilos.tieneBadgeInfo],
  [ColoresCssEnum.warning, TieneBadgeEstilos.tieneBadgeWarning],
]);

export const obtenerTipoCamaDescripcion = new Map<CamaTipoEnum, string>([
  [CamaTipoEnum.Individual, 'Individual'],
  [CamaTipoEnum.Matrimonial, 'Matrimonial'],
  [CamaTipoEnum.CuchetaArriba, 'Cucheta Arriba'],
  [CamaTipoEnum.CuchetaAbajo, 'Cucheta Abajo'],
]);
