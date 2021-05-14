import { Button } from 'components/botones/botones';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from 'store/api/api';
import { HabitacionParaReservaDTO } from 'store/api/DTOs';
import PasajerosYLugares from './PasajerosYLugares/PasajerosYLugares';
import Renglon from './Renglon/Renglon';
import { crearRenglonData, RenglonData } from './Renglon/RenglonData';

const Renglones = (): ReactElement => {
  const [renglones, actualizarRenglones] = useState<RenglonData[]>([]);
  const { datos: habitacionesDisponibles, estado } = useSelector(api.habitaciones.listarConLugaresLibres.selector);

  useEffect((): void => {
    if (habitacionesDisponibles.length > 0) actualizarRenglones([crearRenglonData(0, habitacionesDisponibles)]);
  }, [habitacionesDisponibles]);

  function onHabitacionChange(indice: number, id: string): void {
    let renglonesCopia = renglones.map(
      (renglon): RenglonData => {
        if (renglon.indice === indice) {
          let habitacion = habitacionesDisponibles.find((hab: HabitacionParaReservaDTO): boolean => hab.id === parseInt(id));
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
      <PasajerosYLugares renglones={renglones} />

      {renglones.map(
        (renglon: RenglonData): ReactElement => {
          return (
            <Renglon
              key={`${renglon.indice}`}
              renglon={renglon}
              estado={estado}
              onHabitacionChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                onHabitacionChange(renglon.indice, e.target.value)
              }
              onCamaChange={(e: React.ChangeEvent<HTMLSelectElement>): void => onCamaChange(renglon.indice, e.target.value)}
              eliminar={eliminarRenglon}
            />
          );
        }
      )}

      <Button text="Agregar cama" onClick={agregarRenglon} style={{ marginTop: '1em' }} />
    </>
  );
};

export default Renglones;
