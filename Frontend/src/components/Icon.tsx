import { IconProp, SizeProp, Transform } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, ReactElement } from 'react';
import { classCssBadge, IBadge } from './_utilidades/utilidades';
import Estilos from './Icon.module.scss';

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
  size = '1x',
  style,
  cssClass = '',
  badge,
  tooltip,
  transformar,
  onClick,
}: IProps): ReactElement => {
  const componente = (
    <span
      className={`icon ${badge ? classCssBadge.get(badge.color) : ''} ${onClick ? Estilos.esClickeable : ''} ${cssClass}`}
      style={style}
      data-badge={badge?.texto}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCode} size={size} transform={transformar} />
    </span>
  );

  if (tooltip) {
    var estiloTooltipBySize = new Map<string, string>([
      ['1x', Estilos.tooltip1x],
      ['lg', Estilos.tooltipLg],
    ]);

    return (
      <span className={`${estiloTooltipBySize.get(size)}`} data-tooltip={tooltip}>
        {componente}
      </span>
    );
  }

  return componente;
};
