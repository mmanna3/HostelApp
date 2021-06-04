import { Icon } from 'components/Icon';
import React, { ReactElement } from 'react';
import Estilos from './NoHayDatos.module.scss';

const NoHayDatos = (): ReactElement => {
  return (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.mensajeContenedor}>
            <span className="icon-text has-text-info">
              <Icon faCode="exclamation-triangle" size="lg" />
            </span>
            No se encontraron datos.
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default NoHayDatos;
