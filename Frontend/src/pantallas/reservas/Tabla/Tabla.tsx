import { HabitacionDTO } from 'interfaces/habitacion';
import { IHabitacionParaTablaReservas, ReservaResumenDTO, ReservasDelPeriodoDTO } from 'interfaces/reserva';
import DetalleHabitacion from 'pantallas/habitaciones/detalle/Modal';
import DetalleReserva from 'pantallas/reservas/detalle/Modal';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { inicializarTabla, insertarReserva } from 'store/app/tablaDeReservas/slice';
import Cuerpo from './Cuerpo/Cuerpo';
import EncabezadoDias from './EncabezadoDias/EncabezadoDias';
import FooterReferencias from './FooterReferencias/FooterReferencias';
import Estilos from './Tabla.module.scss';
import { calcularCamasIdsYHabitacionesConCamasUnificadas, calcularDiasDeReservasVisibles } from './utils/funcionesUtiles';

interface IParams {
  datos: ReservasDelPeriodoDTO;
  habitaciones: HabitacionDTO[];
}

const TablaReservas = ({ datos, habitaciones }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState<IHabitacionParaTablaReservas[]>([]);
  const [idDetalleReserva, cambiarIdDetalleReserva] = useState<Nullable<number>>(null);
  const [idDetalleHabitacion, cambiarIdDetalleHabitacion] = useState<Nullable<number>>(null);

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
      <DetalleHabitacion id={idDetalleHabitacion} onHide={(): void => cambiarIdDetalleHabitacion(null)}></DetalleHabitacion>
      <DetalleReserva id={idDetalleReserva} onHide={(): void => cambiarIdDetalleReserva(null)}></DetalleReserva>
      <div className={Estilos.contenedor}>
        <table className="table is-hoverable is-bordered is-fullwidth">
          <EncabezadoDias fechaDesde={datos.desde} fechaHasta={datos.hasta} />
          <Cuerpo
            habitacionesConCamasUnificadas={habitacionesConCamasUnificadas}
            mostrarDetalleDeReserva={(id: Nullable<number>): void => cambiarIdDetalleReserva(id)}
            mostrarDetalleDeHabitacion={(id: Nullable<number>): void => cambiarIdDetalleHabitacion(id)}
          ></Cuerpo>
        </table>
      </div>
      <FooterReferencias />
    </>
  );
};

export default TablaReservas;
