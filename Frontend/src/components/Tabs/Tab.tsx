import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement, ReactNode } from 'react';
import Estilos from './Tab.module.scss';

interface IProps {
  texto: string;
  icono: IconProp;
}

const Tab = ({ texto, icono }: IProps): ReactElement => {
  return (
    <li>
      <a>
        <Icon faCode={icono} />
        <span>{texto}</span>
      </a>
    </li>
  );
};

export default Tab;
