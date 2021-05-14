import { Button } from 'components/botones/botones';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from 'store/api/api';
import { HabitacionParaReservaDTO } from 'store/api/DTOs';
import PasajerosYLugares from './PasajerosYLugares/PasajerosYLugares';
import Renglon from './Renglon/Renglon';
import { RenglonData } from './Renglon/RenglonDataClass';

const Renglones = (): ReactElement => {
  const [renglones, actualizarRenglones] = useState<RenglonData[]>([new RenglonData(0, [], [])]);

  const habitacionesSelector = useSelector(api.habitaciones.listarConLugaresLibres.selector);
  const habitaciones = habitacionesSelector.datos;
  const habitacionesEstado = habitacionesSelector.estado;

  useEffect((): void => {
    if (habitaciones.length > 0)
      actualizarRenglones([new RenglonData(0, habitaciones, habitaciones[0].camas, habitaciones[0])]);
    //PORQUE QUIERE QUE RENGLÓN SEA DEPENDENCIA Y SE ROMPE TODO SI LO PONGO
    // eslint-disable-next-line
  }, [habitaciones]);

  function onHabitacionChange(indice: number, id: string): void {
    var habitacion = habitaciones.find((hab: HabitacionParaReservaDTO): boolean => hab.id === parseInt(id));

    if (habitacion) {
      // Innecesario if pero bueno
      var renglonesCopia = renglones;
      for (let i = 0; i < renglones.length; i++)
        if (renglonesCopia[i].indice === indice) {
          renglonesCopia[i].habitacionSeleccionada = habitacion;
          renglonesCopia[i].camasDisponibles = habitacion.camas;
          if (habitacion.camas.length > 0) renglonesCopia[i].camaSeleccionadaId = habitacion.camas[0].id.toString();

          break;
        }
      actualizarRenglones([...renglonesCopia]);
    }
  }

  function onCamaChange(indice: number, id: string): void {
    var renglonesCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].camaSeleccionadaId = id;
        break;
      }

    actualizarRenglones([...renglonesCopia]);
    // calcularLugaresReservados();
  }

  function agregarRenglon(): void {
    var ultimoRenglon = renglones.slice(-1).pop();
    var proximoIndice = 0;
    if (ultimoRenglon) proximoIndice = ultimoRenglon.indice + 1;
    // Hago esto porque eslint dice que ultimoRenglon puede ser undefined, tiene razón, pero no debería serlo nunca

    actualizarRenglones([...renglones, new RenglonData(proximoIndice, habitaciones, habitaciones[0].camas)]);
  }

  function eliminarRenglon(indice: number): void {
    if (renglones.length > 1) {
      var renglonesSinElEliminado = renglones.filter((renglon: RenglonData): boolean => renglon.indice !== indice);
      actualizarRenglones(renglonesSinElEliminado);
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
              estado={habitacionesEstado}
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
