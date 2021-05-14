import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { obtenerTipoCamaDescripcion } from 'pantallas/reservas/utilidades';
import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './Renglon.module.scss';
import { RenglonData } from './RenglonData';

interface IParams {
  renglon: RenglonData;
  estado: ESTADO;
  onHabitacionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCamaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  eliminar: (id: number) => void;
}

const Renglon = ({ renglon, estado, onHabitacionChange, onCamaChange, eliminar }: IParams): ReactElement => {
  const { register } = useFormContext();

  return (
    <div className="field field-body is-grouped">
      <div className="field field-body is-grouped">
        <div className="field is-expanded has-addons" style={{ minWidth: '200px' }}>
          <span className="control">
            <span className="button is-static">Hab.</span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
              <div className={Estilos.iconoFa}>
                <select
                  style={{ minWidth: '180px' }}
                  id={`habitacion-renglon-${renglon.indice}`}
                  onChange={onHabitacionChange}
                  value={renglon.habitacionSeleccionada?.id || ''}
                >
                  {estado === ESTADO.cargando ? (
                    <option>Cargando...</option>
                  ) : (
                    renglon.habitacionesDisponibles.map(
                      (habitacion): ReactElement => {
                        return (
                          <option key={habitacion.id} value={habitacion.id}>
                            {habitacion.nombre} ({habitacion.cantidadDeLugaresLibres}) {habitacion.esPrivada ? '\uf023' : ''}
                          </option>
                        );
                      }
                    )
                  )}
                </select>
              </div>
            </span>
          </span>
        </div>

        <div className="field is-expanded has-addons" style={{ minWidth: '280px' }}>
          <span className="control">
            <span className="button is-static">Cama</span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
              <div className="select">
                {renglon.camasDisponibles.length === 0 ? (
                  <select style={{ minWidth: '260px' }} id={`renglon-sin-camas-${renglon.indice}`}>
                    <option>No tiene en esta fecha</option>
                  </select>
                ) : !renglon.habitacionSeleccionada?.esPrivada ? (
                  <select
                    {...register(`CamasIds[${renglon.indice}]`)}
                    style={{ minWidth: '260px' }}
                    value={renglon.camaSeleccionadaId || ''}
                    onChange={onCamaChange}
                  >
                    {renglon.camasDisponibles.map(
                      (cama): ReactElement => {
                        return (
                          <option key={cama.id} value={cama.id}>
                            {obtenerTipoCamaDescripcion.get(cama.tipo)} - {cama.nombre}
                          </option>
                        );
                      }
                    )}
                  </select>
                ) : (
                  <>
                    <select id={`habitacion-privada-renglon-${renglon.indice}`} style={{ minWidth: '260px' }}>
                      <option value={renglon.habitacionSeleccionada.id}>Todas - Habitación privada</option>
                    </select>
                    {renglon.camasDisponibles.map(
                      (cama, i): ReactElement => {
                        return (
                          <Input
                            key={i}
                            style={{ display: 'none' }}
                            name={`CamasDeHabitacionesPrivadasIds[${renglon.indice}][${i}]`}
                            defaultValue={cama.id}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </div>
            </span>
          </span>
        </div>
      </div>

      <button
        className="button has-text-grey has-background-light"
        type="button"
        id={`eliminar-renglon-${renglon.indice}`}
        onClick={(): void => eliminar(renglon.indice)}
      >
        <Icon faCode="trash-alt" />
      </button>
    </div>
  );
};

export default Renglon;
