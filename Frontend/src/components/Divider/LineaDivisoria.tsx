import React, { ReactElement } from 'react';
import Estilos from './LineaDivisoria.module.scss';

interface IProps {
  texto: string;
  [otrosAtributos: string]: any;
}

export const LineaDivisoria = ({ texto, ...otrosAtributos }: IProps): ReactElement => (
  <div className={Estilos.divider} {...otrosAtributos}>
    {texto}
  </div>
);
