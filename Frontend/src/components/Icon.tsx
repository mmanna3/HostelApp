import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';

interface IProps {
  faCode: IconProp;
  size?: SizeProp;
}

export const Icon = ({ faCode, size }: IProps): ReactElement => (
  <span className="icon">
    <FontAwesomeIcon icon={faCode} size={size} />
  </span>
);
