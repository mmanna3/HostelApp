import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, ReactElement } from 'react';

interface IProps {
  faCode: IconProp;
  size?: SizeProp;
  style?: CSSProperties;
}

export const Icon = ({ faCode, size, style }: IProps): ReactElement => (
  <span className="icon" style={style}>
    <FontAwesomeIcon icon={faCode} size={size} />
  </span>
);
