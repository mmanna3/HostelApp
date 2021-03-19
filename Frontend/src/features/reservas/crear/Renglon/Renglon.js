import React from 'react';
import Select from 'components/Select';
import { Input } from 'components/Input';
import { Icon } from 'components/Icon';
import Estilos from './Renglon.module.scss';
import { EstadosFetchEnum as ESTADO } from 'store/interfaces';

const Renglon = ({ renglon, estado, onHabitacionChange, onCamaChange, eliminar }) => {
  return (
    <div className="field field-body is-grouped">
      <div className="field field-body is-grouped">
        <div className="field is-expanded has-addons" style={{ minWidth: '200px' }}>
          <span className="control">
            <span className="button is-static">Hab.</span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
              <Select
                style={{ minWidth: '180px' }}
                id={`habitacion-renglon-${renglon.indice}`}
                className={Estilos.iconoFa}
                onChange={onHabitacionChange}
                value={renglon.habitacionSeleccionada?.id || ''}
              >
                {estado === ESTADO.cargando ? (
                  <option>Cargando...</option>
                ) : (
                  renglon.habitacionesDisponibles.map(habitacion => {
                    return (
                      <option key={habitacion.id} value={habitacion.id}>
                        {habitacion.nombre} ({habitacion.cantidadDeLugaresLibres}) {habitacion.esPrivada ? '\uf023' : ''}
                      </option>
                    );
                  })
                )}
              </Select>
            </span>
          </span>
        </div>

        <div className="field is-expanded has-addons" style={{ minWidth: '280px' }}>
          <span className="control">
            <span className="button is-static">Cama</span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
              {renglon.camasDisponibles.length === 0 ? (
                <Select style={{ minWidth: '260px' }} id={`renglon-sin-camas-${renglon.indice}`}>
                  <option>No tiene en esta fecha</option>
                </Select>
              ) : !renglon.habitacionSeleccionada?.esPrivada ? (
                <Select
                  name={`CamasIds[${renglon.indice}]`}
                  style={{ minWidth: '260px' }}
                  value={renglon.camaSeleccionadaId || ''}
                  onChange={onCamaChange}
                >
                  {renglon.camasDisponibles.map(cama => {
                    return (
                      <option key={cama.id} value={cama.id}>
                        {cama.tipo} - {cama.nombre}
                      </option>
                    );
                  })}
                </Select>
              ) : (
                <>
                  <Select id={`habitacion-privada-renglon-${renglon.indice}`} style={{ minWidth: '260px' }}>
                    <option value={renglon.habitacionSeleccionada.id}>Todas - Habitación privada</option>
                  </Select>
                  {renglon.camasDisponibles.map((cama, i) => {
                    return (
                      <Input
                        style={{ display: 'none' }}
                        name={`CamasDeHabitacionesPrivadasIds[${renglon.indice}][${i}]`}
                        defaultValue={cama.id}
                      />
                    );
                  })}
                </>
              )}
            </span>
          </span>
        </div>
      </div>

      <button
        className="button has-text-grey has-background-light"
        type="button"
        id={`eliminar-renglon-${renglon.indice}`}
        onClick={() => eliminar(renglon.indice)}
      >
        <Icon faCode="trash-alt" />
      </button>
    </div>
  );
};

export default Renglon;
