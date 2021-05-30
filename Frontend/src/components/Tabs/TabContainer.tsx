import React, { ReactElement, ReactNode } from 'react';
import Estilos from './TabContainer.module.scss';

interface IProps {
  children: ReactNode;
}

const TabContainer = ({ children }: IProps): ReactElement => {
  return <div className="tabs is-boxed">{children}</div>;
};

export default TabContainer;
