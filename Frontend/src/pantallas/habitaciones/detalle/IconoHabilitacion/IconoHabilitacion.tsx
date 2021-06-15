import { Icon } from 'components/Icon';
import React, { ReactElement } from 'react';
import Estilos from './IconoHabilitacion.module.scss';

interface IProps {
  estaHabilitada: boolean;
}

const IconoHabilitacion = ({ estaHabilitada }: IProps): ReactElement => {
  if (estaHabilitada) {
    return (
      <span className={`icon-text has-text-success ${Estilos.contenedor}`}>
        <Icon faCode="check-circle" size="sm" />
      </span>
    );
  } else
    return (
      <span className={`icon-text has-text-danger ${Estilos.contenedor}`}>
        <Icon faCode="times-circle" size="sm" />
      </span>
    );
};

export default IconoHabilitacion;
