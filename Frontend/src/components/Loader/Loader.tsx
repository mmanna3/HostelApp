import React, { ReactElement } from 'react';
import Estilos from './Loader.module.scss';

interface IProps {
  style?: any;
}

const Loader = ({ style }: IProps): ReactElement => {
  return (
    <div style={style} className={Estilos.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
