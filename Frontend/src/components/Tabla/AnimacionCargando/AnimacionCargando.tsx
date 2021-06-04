import React, { ReactElement } from 'react';
import Estilos from './AnimacionCargando.module.scss';

const AnimacionCargando = (): ReactElement => {
  return (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.animacionCargandoContenedor}>
            <div className={Estilos.animacionCargando}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default AnimacionCargando;
