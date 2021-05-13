import { Icon } from 'components/Icon';
import { CamaDTO, CamaTipo } from 'interfaces/habitacion';
import { IHabitacionParaReservaDTO } from 'interfaces/reserva';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { RenglonData } from '../Renglon/RenglonDataClass';
import Estilos from './PasajerosYLugares.module.scss';

interface IParams {
  renglones: RenglonData[];
}

const PasajerosVsLugares = ({ renglones }: IParams): ReactElement => {
  //A veces esta línea de abajo no anda y cuando agrego una cama no re-renderiza (pero creo que es un problema del Modal)
  const _renglones = [...renglones]; // Hago esto para que el useEffect vuelva a renderizar con cada cambio que haya en renglones

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
    const camasDisponibles = _renglones[0].camasDisponibles;
    const habitacionesDisponibles = _renglones[0].habitacionesDisponibles;
    let lugaresReservados = 0;

    _renglones.forEach((renglon): void => {
      if (!renglon.habitacionSeleccionada?.esPrivada) {
        let cama = camasDisponibles.find((cama: CamaDTO): boolean => cama.id.toString() === renglon.camaSeleccionadaId);
        if (cama) cama.tipo === CamaTipo.Matrimonial ? (lugaresReservados += 2) : lugaresReservados++;
      } else {
        let habitacion = habitacionesDisponibles.find(
          (hab: IHabitacionParaReservaDTO): boolean => hab.id === renglon.habitacionSeleccionada?.id
        );
        if (habitacion) lugaresReservados += habitacion.cantidadDeLugaresLibres;
      }
    });

    actualizarCantidadDeLugaresReservados(lugaresReservados);
  }, [_renglones]);

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
