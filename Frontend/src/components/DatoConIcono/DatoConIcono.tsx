import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement } from 'react';
import Estilos from './DatoConIcono.module.scss';

interface IProps {
  icono: IconProp;
  texto: string;
}

const DatoConIcono = ({ icono, texto }: IProps): ReactElement => {
  return (
    <div className={Estilos.dato}>
      <Icon faCode={icono} /> <p>{texto}</p>
    </div>
  );
};

export default DatoConIcono;
