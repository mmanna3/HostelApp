import { Icon } from 'components/Icon';
import { IHabitacionParaTablaReservas } from 'pantallas/reservas/utilidades';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CamaDTO } from 'store/api/DTOs';
import { tablaDeReservasSelector } from 'store/app/tablaDeReservas/slice';
import { obtenerDia } from 'utils/Fecha';
import Celda from '../Celda/Celda';
import Estilos from './Cuerpo.module.scss';

interface IParams {
  habitacionesConCamasUnificadas: IHabitacionParaTablaReservas[];
}

const Cuerpo = ({ habitacionesConCamasUnificadas }: IParams): ReactElement => {
  const tablaDeReservas = useSelector(tablaDeReservasSelector);
  const [filas, actualizarFilas] = useState<ReactElement[]>([]);

  useEffect((): void => {
    const renderizarEncabezadoCamaYCeldasDeDatosDeLaFila = (
      cama: CamaDTO,
      esPrimeraCamaDeLaHabitacion: boolean = false
    ): ReactElement => {
      return (
        <>
          <td key={cama.id} className={Estilos.cama} data-es-primera-cama={esPrimeraCamaDeLaHabitacion}>
            {cama.nombre} - {obtenerTipoCamaDescripcion.get(cama.tipo)}
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

    const renderizarPrimeraFilaDeLaHabitacion = (habitacion: IHabitacionParaTablaReservas): ReactElement => (
      <tr key={habitacion.camas[0].id}>
        <td
          key={habitacion.camas[0].id}
          rowSpan={habitacion.camas.length}
          className={Estilos.habitacion}
          data-es-primera-cama="true"
        >
          <div>
            {habitacion.esPrivada ? (
              <Icon cssClass={Estilos.iconoHabitacionPrivada} faCode="user-lock" size="lg" />
            ) : (
              <Icon faCode="users" size="lg" />
            )}
            <div>
              {habitacion.nombre}
              {!habitacion.estaHabilitada && (
                <span className={`icon-text has-text-danger ${Estilos.habitacionDeshabilitada}`}>
                  <Icon faCode="times-circle" tooltip="Está deshabilitada" />
                </span>
              )}
            </div>
          </div>
        </td>
        {renderizarEncabezadoCamaYCeldasDeDatosDeLaFila(habitacion.camas[0], true)}
      </tr>
    );

    const renderizarDemasFilas = (habitacion: IHabitacionParaTablaReservas): ReactElement[] =>
      habitacion.camas
        .slice(1)
        .map((cama): ReactElement => <tr key={cama.id}>{renderizarEncabezadoCamaYCeldasDeDatosDeLaFila(cama)}</tr>);

    const _filas = habitacionesConCamasUnificadas.map(
      (habitacion): ReactElement => {
        return (
          <Fragment key={habitacion.id}>
            {renderizarPrimeraFilaDeLaHabitacion(habitacion)}
            {renderizarDemasFilas(habitacion)}
          </Fragment>
        );
      }
    );

    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.dias, habitacionesConCamasUnificadas]);

  return <tbody>{filas}</tbody>;
};

export default Cuerpo;
