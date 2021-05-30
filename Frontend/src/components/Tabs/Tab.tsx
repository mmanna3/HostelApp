import React, { ReactElement, ReactNode } from 'react';
import Estilos from './Tab.module.scss';

interface IProps {
  children: ReactNode;
}

const Tab = ({ children }: IProps): ReactElement => {
  return <div className="tabs is-boxed">{children}</div>;
};

export default Tab;
