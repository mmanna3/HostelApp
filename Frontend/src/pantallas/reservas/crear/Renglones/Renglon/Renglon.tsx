import { Autocomplete, ILabelValue } from 'components/Autocomplete';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import React, { ReactElement } from 'react';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import Estilos from './Renglon.module.scss';
import { RenglonData } from './RenglonData';

interface IParams {
  renglon: RenglonData;
  onHabitacionChange: (habitacionId: string) => void;
  onCamaChange: (camaId: string) => void;
  eliminar: (id: number) => void;
}

const Renglon = ({ renglon, onHabitacionChange, onCamaChange, eliminar }: IParams): ReactElement => {
  const [camaKey, reiniciarCama] = useCounterKey();

  const habitaciones = renglon.habitacionesDisponibles.map(
    (habitacion): ILabelValue => {
      return {
        label: `Habitación ${habitacion.nombre} - ${habitacion.cantidadDeLugaresLibres} lugares`,
        value: habitacion.id.toString(),
        esPrivada: habitacion.esPrivada,
      };
    }
  );

  const camas = renglon.camasDisponibles.map(
    (cama): ILabelValue => {
      return {
        label: `${obtenerTipoCamaDescripcion.get(cama.tipo)} - ${cama.nombre}`,
        value: cama.id.toString(),
      };
    }
  );

  const formatOptionLabel = ({ label, esPrivada }: any): ReactElement => (
    <div>
      {label} {esPrivada ? <Icon faCode="lock" /> : ''}
    </div>
  );

  return (
    <div className="columns">
      <div className="column">
        <Autocomplete
          dataCy={`autocomplete-habitacion-renglon-${renglon.indice}`}
          name={`ignorarHabitacion[${renglon.indice}]`}
          opciones={habitaciones}
          opcionInicial={habitaciones[0]}
          onChange={(habitacionId: string): void => {
            onHabitacionChange(habitacionId);
            reiniciarCama();
          }}
          icono="door-closed"
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <div className="column">
        {renglon.habitacionSeleccionada?.esPrivada ? (
          <>
            <Input
              key={camaKey}
              dataCy={`input-privada-renglon-${renglon.indice}`}
              name={`ignorarCamaHabPrivada-${renglon.indice}`}
              placeholder="Se reservarán todas las camas"
              readOnly
              faIconCode="bed"
            />
            <Input
              style={{ display: 'none' }}
              name={`ignorarHabitacionesPrivadasIds[${renglon.indice}]`}
              defaultValue={renglon.habitacionSeleccionada.id}
            />
          </>
        ) : renglon.camasDisponibles.length === 0 ? (
          <Input
            key={camaKey}
            dataCy={`input-no-tiene-camas-renglon-${renglon.indice}`}
            name={`ignorarSincamas-${renglon.indice}`}
            placeholder="No tiene camas en esta fecha"
            readOnly
            faIconCode="bed"
          />
        ) : (
          <Autocomplete
            dataCy={`autocomplete-cama-renglon-${renglon.indice}`}
            key={camaKey}
            name={`ignorarCamasIds[${renglon.indice}]`}
            opciones={camas}
            opcionInicial={camas[0]}
            onChange={onCamaChange}
            icono="bed"
          />
        )}
      </div>
      <div className="column is-narrow">
        <button
          className={`button has-text-grey has-background-light ${Estilos.boton}`}
          type="button"
          data-cy={`eliminar-renglon-${renglon.indice}`}
          onClick={(): void => eliminar(renglon.indice)}
        >
          <Icon faCode="trash-alt" />
        </button>
      </div>
    </div>
  );
};

export default Renglon;
