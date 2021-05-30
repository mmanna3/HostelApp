import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/Icon';
import React, { ReactElement, useContext, useEffect } from 'react';
import { IValor, TabsContext } from './TabContainer';

interface IProps {
  id: number;
  texto: string;
  icono: IconProp;
  seleccionadaPorDefecto?: boolean;
}

const Tab = ({ id, texto, icono, seleccionadaPorDefecto = false }: IProps): ReactElement => {
  const { idSeleccionada, setIdSeleccionada } = useContext<IValor>(TabsContext);

  useEffect((): void => {
    if (seleccionadaPorDefecto) setIdSeleccionada(id);
  }, [seleccionadaPorDefecto, setIdSeleccionada, id]);

  return (
    <li className={idSeleccionada === id ? 'is-active' : ''} onClick={(): void => setIdSeleccionada(id)}>
      <a href={`#${id}`}>
        <Icon faCode={icono} />
        <span>{texto}</span>
      </a>
    </li>
  );
};

export default Tab;
