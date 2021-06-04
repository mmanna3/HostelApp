import { Icon } from 'components/Icon';
import React, { ReactElement } from 'react';
import Estilos from './ErrorGenerico.module.scss';

const ErrorGenerico = (): ReactElement => {
  return (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.mensajeContenedor}>
            <span className="icon-text has-text-danger">
              <Icon faCode="exclamation-triangle" size="lg" />
            </span>
            Hubo un error. Por favor, volvé a intentarlo.
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ErrorGenerico;
