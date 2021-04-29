import React, { ReactElement } from 'react';
import Estilos from './Divider.module.scss';

interface IProps {
  texto: string;
  [otrosAtributos: string]: any;
}

export const Divider = ({ texto, ...otrosAtributos }: IProps): ReactElement => (
  <div className={Estilos.divider} {...otrosAtributos}>
    {texto}
  </div>
);
