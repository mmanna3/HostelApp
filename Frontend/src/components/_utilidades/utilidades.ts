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
