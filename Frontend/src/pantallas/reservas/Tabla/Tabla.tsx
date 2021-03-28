import React, { useEffect, useState, ReactElement } from 'react';
import Celda from './Celda/Celda';
import Estilos from './Tabla.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inicializarTabla, tablaDeReservasSelector, insertarReserva } from 'store/app/tablaDeReservas/slice';
import Encabezado from './Encabezado/Encabezado';
import { obtenerAnio, obtenerMes, obtenerDia } from 'utils/Fecha';
import Detalle from 'pantallas/habitaciones/detalle/Modal';
import { ReservasDelPeriodoDTO, IHabitacionParaTablaReservas, ReservaResumenDTO } from 'interfaces/reserva';
import { CamaDTO, HabitacionDTO } from 'interfaces/habitacion';

interface IParams {
  datos: ReservasDelPeriodoDTO;
  habitaciones: HabitacionDTO[];
}

interface IDiaMes {
  dia: number;
  mes: number;
}

const TablaReservas = ({ datos, habitaciones }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState<IHabitacionParaTablaReservas[]>([]);
  const [filas, actualizarFilas] = useState([]);
  const tablaDeReservas = useSelector(tablaDeReservasSelector);

  useEffect((): void => {
    var _dias: IDiaMes[] = [];

    function calcularDias(): void {
      var mesDesde = obtenerMes(datos.desde);
      var mesHasta = obtenerMes(datos.hasta);

      if (mesDesde === mesHasta) {
        for (let dia = obtenerDia(datos.desde); dia <= obtenerDia(datos.hasta); dia++) {
          _dias.push({ dia: dia, mes: mesDesde });
        }
      } else {
        var diasDelPrimerMes = new Date(obtenerAnio(datos.desde), obtenerMes(datos.desde), 0).getDate(); //dia 0 es el último día del mes anterior
        for (let dia = obtenerDia(datos.desde); dia <= diasDelPrimerMes; dia++) {
          _dias.push({ dia: dia, mes: mesDesde });
        }
        for (let dia = 1; dia <= obtenerDia(datos.hasta); dia++) {
          _dias.push({ dia: dia, mes: mesHasta });
        }
      }
    }

    calcularDias();

    var camasIdsArray: number[] = [];
    var habs = [];
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

  useEffect((): void => {
    let _filas: any = [];
    var diaDeHoy = new Date().getDate();

    tablaDeReservas.diaMesArray.forEach((diaMes): void => {
      if (diaMes.dia !== diaDeHoy)
        _filas.push(
          <tr key={diaMes.dia}>
            <th className={`has-text-weight-medium ${Estilos.fecha}`}>
              {diaMes.dia}/{diaMes.mes}
            </th>
            {tablaDeReservas.camasIdsArray.map(
              (id): ReactElement => (
                <Celda key={id} dia={diaMes.dia} camaId={id} esHoy={false} />
              )
            )}
          </tr>
        );
      else
        _filas.push(
          <tr key={diaMes.dia}>
            <th className={`has-text-weight-medium ${Estilos.hoy}`}>HOY</th>
            {tablaDeReservas.camasIdsArray.map(
              (id): ReactElement => (
                <Celda key={id} dia={diaMes.dia} camaId={id} esHoy={true} />
              )
            )}
          </tr>
        );
    });

    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.diaMesArray]);

  const [seMuestraModalDeDetalle, mostrarModalDeDetalle] = useState(false);
  const [idSeleccionadoParaDetalle, cambiarIdSeleccionadoParaDetalle] = useState<number | undefined>();

  function mostrarDetalle(id: number): void {
    cambiarIdSeleccionadoParaDetalle(id);
    mostrarModalDeDetalle(true);
  }

  return (
    <>
      <Detalle
        id={idSeleccionadoParaDetalle}
        isVisible={seMuestraModalDeDetalle}
        onHide={(): void => mostrarModalDeDetalle(false)}
      ></Detalle>
      <div className={Estilos.contenedor}>
        <table className={`table is-hoverable is-bordered is-fullwidth ${Estilos.tabla}`}>
          <Encabezado habitaciones={habitacionesConCamasUnificadas} mostrarDetalle={mostrarDetalle} />
          <tbody>{filas}</tbody>
        </table>
      </div>
    </>
  );
};

export default TablaReservas;
