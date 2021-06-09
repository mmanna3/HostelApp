import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HabitacionDTO, ReservaResumenDTO, ReservasDelPeriodoDTO } from 'store/api/DTOs';
import { inicializarTabla, insertarReserva } from 'store/app/tablaDeReservas/slice';
import { IHabitacionParaTablaReservas } from '../utilidades';
import Cuerpo from './Cuerpo/Cuerpo';
import EncabezadoDias from './EncabezadoDias/EncabezadoDias';
import FooterReferencias from './FooterReferencias/FooterReferencias';
import Estilos from './Tabla.module.scss';
import { calcularCamasIdsYHabitacionesConCamasUnificadas, calcularDiasDeReservasVisibles } from './utilidades';

interface IParams {
  datos: ReservasDelPeriodoDTO;
  habitaciones: HabitacionDTO[];
}

const TablaReservas = ({ datos, habitaciones }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState<IHabitacionParaTablaReservas[]>([]);

  useEffect((): void => {
    var dias: Date[] = calcularDiasDeReservasVisibles(datos.desde, datos.hasta);
    var [camasIds, habs] = calcularCamasIdsYHabitacionesConCamasUnificadas(habitaciones);

    setHabitacionesConCamasUnificadas(habs);

    dispatch(inicializarTabla(dias, camasIds));

    datos.reservas.forEach((reserva: ReservaResumenDTO): void => {
      dispatch(insertarReserva(reserva));
    });
  }, [datos.desde, datos.hasta, datos.reservas, dispatch, habitaciones]);

  return (
    <>
      <div className={Estilos.contenedor}>
        <table className="table is-hoverable is-bordered is-fullwidth">
          <EncabezadoDias fechaDesde={datos.desde} fechaHasta={datos.hasta} />
          <Cuerpo habitacionesConCamasUnificadas={habitacionesConCamasUnificadas}></Cuerpo>
        </table>
      </div>
      <FooterReferencias />
    </>
  );
};

export default TablaReservas;
