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
  mostrarDetalleDeReserva: (id: Nullable<number>) => void;
  mostrarDetalleDeHabitacion: (id: Nullable<number>) => void;
}

const Cuerpo = ({
  habitacionesConCamasUnificadas,
  mostrarDetalleDeReserva,
  mostrarDetalleDeHabitacion,
}: IParams): ReactElement => {
  const tablaDeReservas = useSelector(tablaDeReservasSelector);
  const [filas, actualizarFilas] = useState([]);

  useEffect((): void => {
    const iconosCamas = {
      Individual: 'individual',
      Matrimonial: 'matrimonial',
      'Cucheta Abajo': 'cucheta-abajo',
      'Cucheta Arriba': 'cucheta-arriba',
    };

    const estilosIconoCama = new Map<string, string>([
      ['Individual', Estilos.iconoCamaIndividual],
      ['Matrimonial', Estilos.iconoCamaMatrimonial],
      ['Cucheta Abajo', Estilos.iconoCamaCucheta],
      ['Cucheta Arriba', Estilos.iconoCamaCucheta],
    ]);

    const renderizarCeldasDeLaFila = (cama: CamaDTO, esPrimeraCamaDeLaHabitacion: boolean = false): ReactElement => {
      return (
        <>
          <td className={Estilos.cama} data-es-primera-cama={esPrimeraCamaDeLaHabitacion}>
            {cama.nombre} - {cama.tipo}
            <img
              style={{ display: 'none' }} // Lo dejo así hasta decidir si lo queremos con dibujito o con palabras
              data-tip={`Cama '${cama.nombre}' - ${cama.tipo}`}
              className={estilosIconoCama.get(cama.tipo)}
              src={`images/icons/camas/${iconosCamas[cama.tipo]}.svg`}
              alt={cama.tipo}
            />
          </td>
          {tablaDeReservas.dias.map(
            (dia): ReactElement => (
              <Celda
                key={`${obtenerDia(dia)}-${cama.id}`}
                dia={dia}
                camaId={cama.id}
                esPrimeraCamaDeLaHabitacion={esPrimeraCamaDeLaHabitacion}
                onClick={mostrarDetalleDeReserva}
              />
            )
          )}
        </>
      );
    };

    let _filas: any = [];

    habitacionesConCamasUnificadas.forEach((habitacion): void => {
      _filas.push(
        <>
          <tr>
            <td rowSpan={habitacion.camas.length} className={Estilos.habitacion} data-es-primera-cama="true">
              {habitacion.nombre}
            </td>
            {renderizarCeldasDeLaFila(habitacion.camas[0], true)}
          </tr>
          {habitacion.camas.slice(1).map(
            (cama, i): ReactElement => (
              <tr key={i}>{renderizarCeldasDeLaFila(cama)}</tr>
            )
          )}
        </>
      );
    });

    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.dias, habitacionesConCamasUnificadas, mostrarDetalleDeReserva]);

  return <tbody>{filas}</tbody>;
};

export default Cuerpo;
