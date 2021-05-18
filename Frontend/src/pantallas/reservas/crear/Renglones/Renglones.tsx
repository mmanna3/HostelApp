import { Button } from 'components/botones/botones';
import Loader from 'components/Loader/Loader';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from 'store/api/api';
import { HabitacionConLugaresLibresDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import PasajerosYLugares from './PasajerosYLugares/PasajerosYLugares';
import Renglon from './Renglon/Renglon';
import { crearRenglonData, RenglonData } from './Renglon/RenglonData';
import Estilos from './Renglones.module.scss';

interface IProps {
  modificarRenglonesParaPost: (renglones: RenglonesParaReservaDTO) => void;
}

export interface RenglonesParaReservaDTO {
  camasIds: number[];
  habitacionesPrivadasIds: number[];
}

const Renglones = ({ modificarRenglonesParaPost }: IProps): ReactElement => {
  const [renglones, actualizarRenglones] = useState<RenglonData[]>([]);
  const { datos: habitacionesDisponibles, estado } = useSelector(api.habitaciones.listarConLugaresLibres.selector);

  useEffect((): void => {
    let data: RenglonesParaReservaDTO = {
      camasIds: [] as number[],
      habitacionesPrivadasIds: [] as number[],
    };

    renglones.forEach((renglon): void => {
      if (renglon.habitacionSeleccionada.esPrivada) data.habitacionesPrivadasIds.push(renglon.habitacionSeleccionada.id);
      else if (renglon.camaSeleccionadaId) data.camasIds.push(parseInt(renglon.camaSeleccionadaId));
    });

    modificarRenglonesParaPost(data);
  }, [renglones, modificarRenglonesParaPost]);

  useEffect((): void => {
    if (habitacionesDisponibles.length > 0) actualizarRenglones([crearRenglonData(0, habitacionesDisponibles)]);
  }, [habitacionesDisponibles, estado]);

  function onHabitacionChange(indice: number, id: string): void {
    let renglonesCopia = renglones.map(
      (renglon): RenglonData => {
        if (renglon.indice === indice) {
          let habitacion = habitacionesDisponibles.find(
            (hab: HabitacionConLugaresLibresDTO): boolean => hab.id === parseInt(id)
          );
          return crearRenglonData(indice, renglon.habitacionesDisponibles, habitacion);
        } else return renglon;
      }
    );

    actualizarRenglones(renglonesCopia);
  }

  function onCamaChange(indice: number, id: string): void {
    let renglonesCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].camaSeleccionadaId = id;
        break;
      }

    actualizarRenglones([...renglonesCopia]);
  }

  const agregarRenglon = (): void => {
    let ultimoRenglon = renglones.slice(-1).pop();
    if (ultimoRenglon) {
      actualizarRenglones([...renglones, crearRenglonData(ultimoRenglon.indice + 1, habitacionesDisponibles)]);
    }
  };

  function eliminarRenglon(indice: number): void {
    if (renglones.length > 1) {
      let renglonesSinElEliminado = renglones.filter((renglon: RenglonData): boolean => renglon.indice !== indice);
      actualizarRenglones([...renglonesSinElEliminado]);
    }
  }
  return (
    <>
      {estado === EstadosApiRequestEnum.cargando ? (
        <div className={Estilos.cargando}>
          <Loader />
        </div>
      ) : estado === EstadosApiRequestEnum.huboError ? (
        <div>Hubo un error</div>
      ) : (
        <>
          <PasajerosYLugares renglones={renglones} />

          {renglones.map(
            (renglon: RenglonData): ReactElement => {
              return (
                <Renglon
                  key={`${renglon.indice}`}
                  renglon={renglon}
                  onHabitacionChange={(habitacionId: string): void => onHabitacionChange(renglon.indice, habitacionId)}
                  onCamaChange={(camaId: string): void => onCamaChange(renglon.indice, camaId)}
                  eliminar={eliminarRenglon}
                />
              );
            }
          )}

          <Button text="Agregar cama" onClick={agregarRenglon} style={{ marginTop: '1em' }} />
        </>
      )}
    </>
  );
};

export default Renglones;
