import Acordeon from 'components/Acordeon/Acordeon';
import React, { ReactElement } from 'react';
import { CamaDTO } from 'store/api/DTOs';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import { Icon } from 'components/Icon';
import { Boton } from 'components/botones/botones';
import { useDispatch } from 'react-redux';
import api from 'store/api/api';

interface IProps {
  camas: CamaDTO[];
  enAccionExitosa: () => void;
}

const Camas = ({ camas, enAccionExitosa }: IProps): ReactElement => {
  const dispatch = useDispatch();

  const deshabilitar = (id: number): void => {
    dispatch(api.habitaciones.deshabilitarCama.invocar({ id }, enAccionExitosa));
  };

  const habilitar = (id: number): void => {
    dispatch(api.habitaciones.habilitarCama.invocar({ id }, enAccionExitosa));
  };

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
                      className="is-small"
                      texto="Deshabilitar"
                      onClick={(): void => {
                        deshabilitar(cama.id);
                      }}
                    />
                  ) : (
                    <Boton
                      icono="check"
                      className="is-small"
                      texto="Habilitar"
                      onClick={(): void => {
                        habilitar(cama.id);
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
