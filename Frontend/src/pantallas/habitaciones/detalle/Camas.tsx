import Acordeon from 'components/Acordeon/Acordeon';
import React, { ReactElement } from 'react';
import { CamaDTO } from 'store/api/DTOs';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import { Icon } from 'components/Icon';
import { Boton } from 'components/botones/botones';

interface IProps {
  camas: CamaDTO[];
}

const Camas = ({ camas }: IProps): ReactElement => {
  return (
    <Acordeon icono="bed" texto="camas">
      <table className="table is-fullwidth">
        <tbody>
          {camas.map(
            (cama): ReactElement => (
              <tr key={cama.id}>
                <td>
                  Cama {cama.nombre}
                  {cama.estaHabilitada ? (
                    <span className={`icon-text has-text-success`}>
                      <Icon faCode="check-circle" size="1x" tooltip="Está habilitada" />
                    </span>
                  ) : (
                    <span className={`icon-text has-text-danger`}>
                      <Icon faCode="times-circle" size="1x" tooltip="Está deshabilitada" />
                    </span>
                  )}
                </td>
                <td>{obtenerTipoCamaDescripcion.get(cama.tipo)}</td>
                <td>
                  {cama.estaHabilitada ? (
                    <Boton
                      icono="times"
                      className="is-danger is-small"
                      texto="Deshabilitar"
                      onClick={(): void => {
                        // cambiarVisibilidadDeModalPrincipal(false);
                        // cambiarVisibilidadDeModalDeshabilitar(true);
                      }}
                    />
                  ) : (
                    <Boton
                      icono="check"
                      className="is-primary is-small"
                      texto="Habilitar"
                      onClick={(): void => {
                        // cambiarVisibilidadDeModalPrincipal(false);
                        // cambiarVisibilidadDeModalHabilitar(true);
                      }}
                    />
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Acordeon>
  );
};

export default Camas;
