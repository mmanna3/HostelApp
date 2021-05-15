import { Autocomplete, ILabelValue } from 'components/Autocomplete';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { obtenerTipoCamaDescripcion } from 'pantallas/reservas/utilidades';
import React, { ReactElement } from 'react';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import Estilos from './Renglon.module.scss';
import { RenglonData } from './RenglonData';

interface IParams {
  renglon: RenglonData;
  estado: ESTADO;
  onHabitacionChange: (habitacionId: string) => void;
  onCamaChange: (camaId: string) => void;
  eliminar: (id: number) => void;
}

const Renglon = ({ renglon, estado, onHabitacionChange, onCamaChange, eliminar }: IParams): ReactElement => {
  const [camaKey, reiniciarCama] = useCounterKey();

  const habitaciones = renglon.habitacionesDisponibles.map(
    (habitacion): ILabelValue => {
      return {
        label: `Habitación ${habitacion.nombre} - ${habitacion.cantidadDeLugaresLibres} lugares ${
          habitacion.esPrivada ? '\uf023' : ''
        }`,
        value: habitacion.id.toString(),
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

  return (
    // estado
    <div className="columns">
      <div className="column">
        <Autocomplete
          data-cy={`habitacion-renglon-${renglon.indice}`}
          name={`ignorarHabitacion[${renglon.indice}]`}
          // name="desestimado"
          opciones={habitaciones}
          opcionInicial={habitaciones[0]}
          onChange={(habitacionId: string): void => {
            onHabitacionChange(habitacionId);
            reiniciarCama();
          }}
          icono="door-closed"
        />
      </div>
      <div className="column">
        {renglon.habitacionSeleccionada?.esPrivada ? (
          <>
            <Input
              key={camaKey}
              name={`ignorarCamaHabPrivada-${renglon.indice}`}
              placeholder="Se reservarán todas las camas"
              readOnly
              faIconCode="bed"
            />
            <Input
              style={{ display: 'none' }}
              name={`ignorarHabitacionesPrivadasIds[${renglon.indice}]`}
              // name="desestimado"
              defaultValue={renglon.habitacionSeleccionada.id}
            />
          </>
        ) : renglon.camasDisponibles.length === 0 ? (
          <Input
            key={camaKey}
            name={`ignorarSincamas-${renglon.indice}`}
            placeholder="No tiene camas en esta fecha"
            readOnly
            faIconCode="bed"
          />
        ) : (
          <Autocomplete
            data-cy={`cama-renglon-${renglon.indice}`}
            key={camaKey}
            name={`ignorarCamasIds[${renglon.indice}]`}
            // name="desestimado"
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
          id={`eliminar-renglon-${renglon.indice}`}
          onClick={(): void => eliminar(renglon.indice)}
        >
          <Icon faCode="trash-alt" />
        </button>
      </div>
    </div>
  );

  // return (
  //   <div className="field field-body is-grouped">
  //     <div className="field field-body is-grouped">
  //       <div className="field is-expanded has-addons" style={{ minWidth: '200px' }}>
  //         <span className="control">
  //           <span className="button is-static">Hab.</span>
  //         </span>
  //         <span className="control is-expanded">
  //           <span className="control is-expanded">
  //             <div className={Estilos.iconoFa}>
  //               <select
  //                 style={{ minWidth: '180px' }}
  //                 id={`habitacion-renglon-${renglon.indice}`}
  //                 onChange={onHabitacionChange}
  //                 value={renglon.habitacionSeleccionada?.id || ''}
  //               >
  //                 {estado === ESTADO.cargando ? (
  //                   <option>Cargando...</option>
  //                 ) : (
  //                   renglon.habitacionesDisponibles.map(
  //                     (habitacion): ReactElement => {
  //                       return (
  //                         <option key={habitacion.id} value={habitacion.id}>
  //                           {habitacion.nombre} ({habitacion.cantidadDeLugaresLibres}) {habitacion.esPrivada ? '\uf023' : ''}
  //                         </option>
  //                       );
  //                     }
  //                   )
  //                 )}
  //               </select>
  //             </div>
  //           </span>
  //         </span>
  //       </div>

  //       <div className="field is-expanded has-addons" style={{ minWidth: '280px' }}>
  //         <span className="control">
  //           <span className="button is-static">Cama</span>
  //         </span>
  //         <span className="control is-expanded">
  //           <span className="control is-expanded">
  //             <div className="select">
  //               {renglon.camasDisponibles.length === 0 ? (
  //                 <select style={{ minWidth: '260px' }} id={`renglon-sin-camas-${renglon.indice}`}>
  //                   <option>No tiene en esta fecha</option>
  //                 </select>
  //               ) : !renglon.habitacionSeleccionada?.esPrivada ? (
  //                 <select
  //                   {...register(`CamasIds[${renglon.indice}]`)}
  //                   style={{ minWidth: '260px' }}
  //                   value={renglon.camaSeleccionadaId || ''}
  //                   onChange={onCamaChange}
  //                 >
  //                   {renglon.camasDisponibles.map(
  //                     (cama): ReactElement => {
  //                       return (
  //                         <option key={cama.id} value={cama.id}>
  //                           {obtenerTipoCamaDescripcion.get(cama.tipo)} - {cama.nombre}
  //                         </option>
  //                       );
  //                     }
  //                   )}
  //                 </select>
  //               ) : (
  //                 <>
  //                   <select id={`habitacion-privada-renglon-${renglon.indice}`} style={{ minWidth: '260px' }}>
  //                     <option value={renglon.habitacionSeleccionada.id}>Todas - Habitación privada</option>
  //                   </select>
  //                   {renglon.camasDisponibles.map(
  //                     (cama, i): ReactElement => {
  //                       return (
  //                         <Input
  //                           key={i}
  //                           style={{ display: 'none' }}
  //                           name={`CamasDeHabitacionesPrivadasIds[${renglon.indice}][${i}]`}
  //                           defaultValue={cama.id}
  //                         />
  //                       );
  //                     }
  //                   )}
  //                 </>
  //               )}
  //             </div>
  //           </span>
  //         </span>
  //       </div>
  //     </div>

  //     <button
  //       className="button has-text-grey has-background-light"
  //       type="button"
  //       id={`eliminar-renglon-${renglon.indice}`}
  //       onClick={(): void => eliminar(renglon.indice)}
  //     >
  //       <Icon faCode="trash-alt" />
  //     </button>
  //   </div>
  // );
};

export default Renglon;
