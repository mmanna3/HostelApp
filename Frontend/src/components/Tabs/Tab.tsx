import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement, useContext, useEffect } from 'react';
import { IValor, TabsContext } from './ContenedorDeTabs';

interface IProps {
  id: number;
  texto: string;
  icono: IconProp;
  seleccionadaPorDefecto?: boolean;
  contenido: ReactElement;
}

const Tab = ({ id, texto, icono, contenido, seleccionadaPorDefecto = false }: IProps): ReactElement => {
  const { idSeleccionada, seleccionar } = useContext<IValor>(TabsContext);

  useEffect((): void => {
    if (idSeleccionada === 0 && seleccionadaPorDefecto) seleccionar(id, contenido);
  });

  return (
    <li className={idSeleccionada === id ? 'is-active' : ''} onClick={(): void => seleccionar(id, contenido)}>
      <a href={`#${id}`}>
        <Icon faCode={icono} />
        <span>{texto}</span>
      </a>
    </li>
  );
};

export default Tab;
