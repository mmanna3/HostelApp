import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  faCode: IconProp;
  size?: SizeProp;
  style?: CSSProperties;
  cssClass?: string;
  onClick?: (e: any) => void;
}

export const Icon = ({ faCode, size, style, cssClass, onClick = (): void => {} }: IProps): ReactElement => (
  <span className={`icon ${cssClass}`} style={style} onClick={onClick}>
    <FontAwesomeIcon icon={faCode} size={size} />
  </span>
);
