import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Estilos from './Acordeon.module.scss';

interface IProps {
  children: ReactNode;
  texto: string;
  icono?: IconProp;
}

const Acordeon = ({ children, texto, icono }: IProps): ReactElement => {
  const [esVisible, togglearVisibiliad] = useState(false);
  const [textoDelBoton, cambiarTextoDelBoton] = useState(`Ver ${texto}`);

  const mostrarOcultar = (): void => togglearVisibiliad((valorAnterior: boolean): boolean => !valorAnterior);

  useEffect((): void => {
    if (!esVisible) cambiarTextoDelBoton(`Ver ${texto}`);
    else cambiarTextoDelBoton(`Ocultar ${texto}`);
  }, [esVisible, texto]);

  return (
    <>
      <button className={Estilos.boton} onClick={mostrarOcultar}>
        {icono && <Icon faCode={icono} />}
        <span className={Estilos.textoDelBoton}>{textoDelBoton}</span>
      </button>

      {esVisible ? <div className={Estilos.contenedor}>{children}</div> : <></>}
    </>
  );
};

export default Acordeon;
