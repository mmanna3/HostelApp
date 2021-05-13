import { CamaDTO, CamaTipo } from 'interfaces/habitacion';
import { IHabitacionParaReservaDTO } from 'interfaces/reserva';
import React, { ReactElement, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { RenglonData } from './Renglon/RenglonDataClass';

interface IParams {
  renglones: RenglonData[];
}

const PasajerosVsLugares = ({ renglones }: IParams): ReactElement => {
  const [cantidadDeLugaresReservados, actualizarCantidadDeLugaresReservados] = useState(0);

  const { watch } = useFormContext();
  const cantidadDePasajeros = watch('cantidadDePasajeros');

  useEffect((): void => {
    const camasDisponibles = renglones[0].camasDisponibles;
    const habitacionesDisponibles = renglones[0].habitacionesDisponibles;
    let lugaresReservados = 0;

    renglones.forEach((renglon): void => {
      if (!renglon.habitacionSeleccionada?.esPrivada) {
        let cama = camasDisponibles.find((cama: CamaDTO): boolean => cama.id.toString() === renglon.camaSeleccionadaId);
        cama?.tipo === CamaTipo.Matrimonial ? (lugaresReservados += 2) : lugaresReservados++;
      } else {
        let habitacion = habitacionesDisponibles.find(
          (hab: IHabitacionParaReservaDTO): boolean => hab.id === renglon.habitacionSeleccionada?.id
        );
        if (habitacion) lugaresReservados += habitacion.cantidadDeLugaresLibres;
      }
    });

    actualizarCantidadDeLugaresReservados(lugaresReservados);
  }, [renglones]);

  return (
    <div>
      Lugares: {cantidadDeLugaresReservados} / Pasajeros: {cantidadDePasajeros}
    </div>
  );
};

export default PasajerosVsLugares;
