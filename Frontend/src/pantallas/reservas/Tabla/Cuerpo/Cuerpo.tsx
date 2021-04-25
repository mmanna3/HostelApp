import { CamaDTO } from 'interfaces/habitacion';
import { IHabitacionParaTablaReservas } from 'interfaces/reserva';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tablaDeReservasSelector } from 'store/app/tablaDeReservas/slice';
import { obtenerDia } from 'utils/Fecha';
import Celda from '../Celda/Celda';
import Estilos from './Cuerpo.module.scss';

interface IParams {
  habitacionesConCamasUnificadas: IHabitacionParaTablaReservas[];
  mostrarDetalleDeHabitacion: (id: Nullable<number>) => void;
}

const Cuerpo = ({ habitacionesConCamasUnificadas, mostrarDetalleDeHabitacion }: IParams): ReactElement => {
  const tablaDeReservas = useSelector(tablaDeReservasSelector);
  const [filas, actualizarFilas] = useState([]);

  useEffect((): void => {
    const renderizarCeldasDeLaFila = (cama: CamaDTO, esPrimeraCamaDeLaHabitacion: boolean = false): ReactElement => {
      return (
        <>
          <td key={cama.id} className={Estilos.cama} data-es-primera-cama={esPrimeraCamaDeLaHabitacion}>
            {cama.nombre} - {cama.tipo}
          </td>
          {tablaDeReservas.dias.map(
            (dia): ReactElement => (
              <Celda
                key={`${obtenerDia(dia)}-${cama.id}`}
                dia={dia}
                camaId={cama.id}
                esPrimeraCamaDeLaHabitacion={esPrimeraCamaDeLaHabitacion}
              />
            )
          )}
        </>
      );
    };

    const renderizarPrimeraFila = (habitacion: IHabitacionParaTablaReservas): ReactElement => (
      <tr key={habitacion.camas[0].id}>
        <td
          key={habitacion.camas[0].id}
          rowSpan={habitacion.camas.length}
          className={Estilos.habitacion}
          data-es-primera-cama="true"
        >
          {habitacion.nombre}
        </td>
        {renderizarCeldasDeLaFila(habitacion.camas[0], true)}
      </tr>
    );

    let _filas: any = [];

    habitacionesConCamasUnificadas.forEach((habitacion): void => {
      _filas.push(
        <>
          {renderizarPrimeraFila(habitacion)}
          {habitacion.camas.slice(1).map(
            (cama): ReactElement => (
              <tr key={cama.id}>{renderizarCeldasDeLaFila(cama)}</tr>
            )
          )}
        </>
      );
    });

    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.dias, habitacionesConCamasUnificadas]);

  return <tbody>{filas}</tbody>;
};

export default Cuerpo;
