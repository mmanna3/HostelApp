import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CamaDTO, CamaTipoEnum, HabitacionParaReservaDTO } from 'store/api/DTOs';
import { RenglonData } from '../Renglon/RenglonData';
import Estilos from './PasajerosYLugares.module.scss';

interface IParams {
  renglones: RenglonData[];
}

const PasajerosVsLugares = ({ renglones }: IParams): ReactElement => {
  const [cantidadDeLugaresReservados, actualizarCantidadDeLugaresReservados] = useState(0);
  const { watch } = useFormContext();
  const cantidadDePasajeros = parseInt(watch('cantidadDePasajeros'));
  const textoPasajero = useMemo((): string => (cantidadDePasajeros === 1 ? 'pasajero' : 'pasajeros'), [cantidadDePasajeros]);
  const textoLugares = useMemo(
    (): string => (cantidadDeLugaresReservados === 1 ? 'lugar reservado' : 'lugares reservados'),
    [cantidadDeLugaresReservados]
  );

  const hayMasPasajerosQueLugaresReservados = useMemo((): boolean => {
    return cantidadDePasajeros !== cantidadDeLugaresReservados;
  }, [cantidadDeLugaresReservados, cantidadDePasajeros]);

  useEffect((): void => {
    console.log(renglones);
    let lugaresReservados = 0;

    if (renglones.length > 0) {
      const habitacionesDisponibles = renglones[0].habitacionesDisponibles;

      renglones.forEach((renglon): void => {
        if (!renglon.habitacionSeleccionada.esPrivada) {
          let cama = renglon.camasDisponibles.find(
            (cama: CamaDTO): boolean => cama.id.toString() === renglon.camaSeleccionadaId
          );
          if (cama) cama.tipo === CamaTipoEnum.Matrimonial ? (lugaresReservados += 2) : lugaresReservados++;
        } else {
          let habitacion = habitacionesDisponibles.find(
            (hab: HabitacionParaReservaDTO): boolean => hab.id.toString() === renglon.habitacionSeleccionada.id.toString()
          );
          if (habitacion) lugaresReservados += habitacion.cantidadDeLugaresLibres;
        }
      });
    }
    actualizarCantidadDeLugaresReservados(lugaresReservados);
  }, [renglones]);

  return (
    <div className={Estilos.contenedor}>
      <label>
        {cantidadDePasajeros} {textoPasajero} ➝ {cantidadDeLugaresReservados} {textoLugares}
        {hayMasPasajerosQueLugaresReservados ? (
          <span className="icon-text has-text-warning">
            <Icon faCode="exclamation-triangle" />
          </span>
        ) : (
          <span className="icon-text has-text-success">
            <Icon faCode="check-circle" />
          </span>
        )}
      </label>
    </div>
  );
};

export default PasajerosVsLugares;
