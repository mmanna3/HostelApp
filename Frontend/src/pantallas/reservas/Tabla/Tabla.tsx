import { HabitacionDTO } from 'interfaces/habitacion';
import { IHabitacionParaTablaReservas, ReservaResumenDTO, ReservasDelPeriodoDTO } from 'interfaces/reserva';
import DetalleHabitacion from 'pantallas/habitaciones/detalle/Modal';
import DetalleReserva from 'pantallas/reservas/detalle/Modal';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { inicializarTabla, insertarReserva } from 'store/app/tablaDeReservas/slice';
import Cuerpo from './Cuerpo/Cuerpo';
import EncabezadoDias from './EncabezadoDias/EncabezadoDias';
import Estilos from './Tabla.module.scss';
import { obtenerCamasIdsYHabitacionesConCamasUnificadas, obtenerDias } from './utils/funcionesUtiles';

interface IParams {
  datos: ReservasDelPeriodoDTO;
  habitaciones: HabitacionDTO[];
}

const TablaReservas = ({ datos, habitaciones }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState<IHabitacionParaTablaReservas[]>([]);
  const [idSeleccionadoParaDetalle, cambiarIdSeleccionadoParaDetalle] = useState<Nullable<number>>(null);
  const [idSeleccionadoParaDetalleHabitacion, cambiarIdSeleccionadoParaDetalleHabitacion] = useState<Nullable<number>>(null);

  useEffect((): void => {
    var _dias: Date[] = obtenerDias(datos.desde, 15);
    var [camasIds, habs] = obtenerCamasIdsYHabitacionesConCamasUnificadas(habitaciones);

    setHabitacionesConCamasUnificadas(habs);

    dispatch(inicializarTabla(_dias, camasIds));

    datos.reservas.forEach((reserva: ReservaResumenDTO): void => {
      dispatch(insertarReserva(reserva));
    });
  }, [datos.desde, datos.hasta, datos.reservas, dispatch, habitaciones]);

  function mostrarDetalleDeReserva(id: Nullable<number>): void {
    cambiarIdSeleccionadoParaDetalle(id);
  }

  function ocultarDetalleReserva(): void {
    cambiarIdSeleccionadoParaDetalle(null);
  }

  function mostrarDetalleDeHabitacion(id: Nullable<number>): void {
    cambiarIdSeleccionadoParaDetalleHabitacion(id);
  }

  function ocultarDetalleHabitacion(): void {
    cambiarIdSeleccionadoParaDetalleHabitacion(null);
  }

  return (
    <>
      <DetalleHabitacion id={idSeleccionadoParaDetalleHabitacion} onHide={ocultarDetalleHabitacion}></DetalleHabitacion>
      <DetalleReserva id={idSeleccionadoParaDetalle} onHide={ocultarDetalleReserva}></DetalleReserva>
      <div className={Estilos.contenedor}>
        <table className={`table is-hoverable is-bordered is-fullwidth`}>
          <EncabezadoDias fechaInicio={datos.desde} cantidadDeDias={15} />
          <Cuerpo
            habitacionesConCamasUnificadas={habitacionesConCamasUnificadas}
            mostrarDetalleDeReserva={mostrarDetalleDeReserva}
            mostrarDetalleDeHabitacion={mostrarDetalleDeHabitacion}
          ></Cuerpo>
        </table>
      </div>
    </>
  );
};

export default TablaReservas;
