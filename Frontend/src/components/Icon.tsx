import { IconProp, SizeProp, Transform } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, ReactElement } from 'react';
import Estilos from './Icon.module.scss';

interface IProps {
  faCode: IconProp;
  size?: SizeProp;
  style?: CSSProperties;
  cssClass?: string;
  onClick?: (e: any) => void;
  dataBadge?: string;
  transformar?: Transform;
}

export const Icon = ({
  faCode,
  size,
  style,
  cssClass,
  dataBadge,
  transformar,
  onClick = (): void => {},
}: IProps): ReactElement => (
  <span
    className={`icon ${dataBadge ? Estilos.tieneBadge : ''} ${cssClass}`}
    style={style}
    data-badge={dataBadge}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faCode} size={size} transform={transformar} />
  </span>
);
