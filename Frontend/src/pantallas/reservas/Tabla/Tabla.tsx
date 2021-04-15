import React, { useEffect, useState, ReactElement } from 'react';
import Celda from './Celda/Celda';
import Estilos from './Tabla.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inicializarTabla, tablaDeReservasSelector, insertarReserva } from 'store/app/tablaDeReservas/slice';
import DetalleHabitacion from 'pantallas/habitaciones/detalle/Modal';
import { ReservasDelPeriodoDTO, IHabitacionParaTablaReservas, ReservaResumenDTO } from 'interfaces/reserva';
import { CamaDTO, HabitacionDTO } from 'interfaces/habitacion';
import Detalle from 'pantallas/reservas/detalle/Modal';
import EncabezadoDias from './EncabezadoDias/EncabezadoDias';
import { obtenerDias } from './utils/funcionesUtiles';
import { obtenerDia } from 'utils/Fecha';

interface IParams {
  datos: ReservasDelPeriodoDTO;
  habitaciones: HabitacionDTO[];
}

const TablaReservas = ({ datos, habitaciones }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState<IHabitacionParaTablaReservas[]>([]);
  const [filas, actualizarFilas] = useState([]);
  const tablaDeReservas = useSelector(tablaDeReservasSelector);

  useEffect((): void => {
    var _dias: Date[] = obtenerDias(datos.desde, 15);

    var camasIdsArray: number[] = [];
    var habs: IHabitacionParaTablaReservas[] = [];
    for (let i = 0; i < habitaciones.length; i++) {
      var habitacion = habitaciones[i];
      var camasDeLaHabitacion = habitacion.camasIndividuales;
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasMatrimoniales);
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta): CamaDTO => cucheta.abajo));
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta): CamaDTO => cucheta.arriba));
      habs.push({
        nombre: habitacion.nombre,
        id: habitacion.id,
        esPrivada: habitacion.esPrivada,
        camas: camasDeLaHabitacion,
      });
      camasIdsArray = camasIdsArray.concat(camasDeLaHabitacion.map((cama): number => cama.id));
    }
    setHabitacionesConCamasUnificadas(habs);

    dispatch(inicializarTabla(_dias, camasIdsArray));

    datos.reservas.forEach((reserva: ReservaResumenDTO): void => {
      dispatch(insertarReserva(reserva));
    });
  }, [datos.desde, datos.hasta, datos.reservas, dispatch, habitaciones]);

  const [idSeleccionadoParaDetalle, cambiarIdSeleccionadoParaDetalle] = useState<Nullable<number>>(null);
  const [idSeleccionadoParaDetalleHabitacion, cambiarIdSeleccionadoParaDetalleHabitacion] = useState<Nullable<number>>(null);

  function mostrarDetalleReserva(id: Nullable<number>): void {
    cambiarIdSeleccionadoParaDetalle(id);
  }

  function ocultarDetalleReserva(): void {
    cambiarIdSeleccionadoParaDetalle(null);
  }

  function mostrarDetalleDeHabitacion(id: number): void {
    cambiarIdSeleccionadoParaDetalleHabitacion(id);
  }

  function ocultarDetalleHabitacion(): void {
    cambiarIdSeleccionadoParaDetalleHabitacion(null);
  }

  useEffect((): void => {
    let _filas: any = [];

    habitacionesConCamasUnificadas.forEach((habitacion): void => {
      _filas.push(
        <>
          <tr>
            <td rowSpan={habitacion.camas.length}>{habitacion.nombre}</td>
            <td>
              {habitacion.camas[0].nombre} - {habitacion.camas[0].tipo}
            </td>
            {tablaDeReservas.dias.map(
              (dia): ReactElement => (
                <Celda
                  key={`${obtenerDia(dia)}-${habitacion.camas[0].id}`}
                  dia={obtenerDia(dia)}
                  camaId={habitacion.camas[0].id}
                  esHoy={false}
                  onClick={mostrarDetalleReserva}
                />
              )
            )}
          </tr>
          {habitacion.camas.slice(1).map(
            (cama, i): ReactElement => (
              <tr key={i}>
                <td>
                  {cama.nombre} - {cama.tipo}
                </td>
                {tablaDeReservas.dias.map(
                  (dia): ReactElement => (
                    <Celda
                      key={`${obtenerDia(dia)}-${cama.id}`}
                      dia={obtenerDia(dia)}
                      camaId={cama.id}
                      esHoy={false}
                      onClick={mostrarDetalleReserva}
                    />
                  )
                )}
              </tr>
            )
          )}
        </>
      );
    });

    {
    }

    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.dias]);

  return (
    <>
      <DetalleHabitacion id={idSeleccionadoParaDetalleHabitacion} onHide={ocultarDetalleHabitacion}></DetalleHabitacion>
      <Detalle id={idSeleccionadoParaDetalle} onHide={ocultarDetalleReserva}></Detalle>
      <div className={Estilos.contenedor}>
        <table className={`table is-hoverable is-bordered is-fullwidth`}>
          <EncabezadoDias fechaInicio={datos.desde} cantidadDeDias={15} />
          <tbody>{filas}</tbody>
        </table>
      </div>
    </>
  );
};

export default TablaReservas;
