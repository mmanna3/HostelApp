import { IconProp, SizeProp, Transform } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, ReactElement } from 'react';
import { classCssBadge, IBadge } from './_utilidades/utilidades';
import EstilosTooltip from 'components/_utilidades/Tooltip.module.scss';

interface IProps {
  faCode: IconProp;
  size?: SizeProp;
  style?: CSSProperties;
  cssClass?: string;
  onClick?: (e: any) => void;
  badge?: IBadge;
  tooltip?: string;
  transformar?: Transform;
}

export const Icon = ({
  faCode,
  size,
  style,
  cssClass,
  badge,
  tooltip,
  transformar,
  onClick = (): void => {},
}: IProps): ReactElement => (
  <span className={`${tooltip ? EstilosTooltip.tooltip : ''}`} data-tooltip={tooltip}>
    <span
      className={`icon ${badge ? classCssBadge.get(badge.color) : ''} ${cssClass}`}
      style={style}
      data-badge={badge?.texto}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCode} size={size} transform={transformar} />
    </span>
  </span>
);
