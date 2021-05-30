import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement, useContext, useEffect } from 'react';
import { IValor, TabsContext } from './TabContainer';

interface IProps {
  id: number;
  texto: string;
  icono: IconProp;
  seleccionadaPorDefecto?: boolean;
  contenido: ReactElement;
}

const Tab = ({ id, texto, icono, contenido, seleccionadaPorDefecto = false }: IProps): ReactElement => {
  const { idSeleccionada, setIdSeleccionada, setContenido } = useContext<IValor>(TabsContext);

  useEffect((): void => {
    if (seleccionadaPorDefecto) setIdSeleccionada(id);
  }, [seleccionadaPorDefecto, setIdSeleccionada, id]);

  const seleccionarTab = (): void => {
    setIdSeleccionada(id);
    setContenido(contenido);
  };

  return (
    <li className={idSeleccionada === id ? 'is-active' : ''} onClick={seleccionarTab}>
      <a href={`#${id}`}>
        <Icon faCode={icono} />
        <span>{texto}</span>
      </a>
    </li>
  );
};

export default Tab;
