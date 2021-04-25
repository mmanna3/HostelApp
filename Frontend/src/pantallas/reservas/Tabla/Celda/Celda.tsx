import { ReservaEstadoEnum } from 'interfaces/reserva';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { seleccionarTodasLasCeldasDeLaReserva, tablaDeReservasSelector } from 'store/app/tablaDeReservas/slice';
import estilos from './Celda.module.scss';
import { ClaseCssEstaHovereadaONo, ICeldaInfo } from './interfaces';

export interface IParams {
  dia: string;
  camaId: number;
  esPrimeraCamaDeLaHabitacion: boolean;
  onClick: (id: Nullable<number>) => any;
}

const Celda = ({ dia, camaId, esPrimeraCamaDeLaHabitacion, onClick }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const { tabla } = useSelector(tablaDeReservasSelector);
  const [data, actualizarData] = useState<ICeldaInfo>({
    reservaId: null,
    nombreAbreviadoDelHuesped: '',
    claseCssEstaHovereadaONo: ClaseCssEstaHovereadaONo.NoEstaHovereada,
    estado: ReservaEstadoEnum.CheckinPendiente,
  });
  const [claseCssColor, actualizarClaseCssColor] = useState<string | undefined>('');

  const colores = new Map<ReservaEstadoEnum, string>([
    [ReservaEstadoEnum.CheckinPendiente, estilos.estadoCheckin],
    [ReservaEstadoEnum.InHouse, estilos.estadoInhouse],
    [ReservaEstadoEnum.HizoCheckout, estilos.estadoHizoCheckout],
  ]);

  const onMouseOver = (): void => {
    dispatch(seleccionarTodasLasCeldasDeLaReserva(data.reservaId));
  };

  useEffect((): any => {
    var contenido = tabla[dia][`${camaId}`];
    actualizarData(contenido);

    if (contenido.estado !== null) {
      //Horrible if, hay que sacarlo
      actualizarClaseCssColor(colores.get(contenido.estado));
    }
  }, [tabla, dia, camaId, colores]);

  return (
    <>
      <td
        className={`${claseCssColor} ${data.claseCssEstaHovereadaONo}`}
        data-reserva-id={data.reservaId}
        data-dia={dia}
        data-cama-id={camaId}
        data-es-primera-cama={esPrimeraCamaDeLaHabitacion}
        onMouseOver={onMouseOver}
        onClick={(): void => onClick(data.reservaId)}
      >
        <div>{data.nombreAbreviadoDelHuesped}</div>
      </td>
    </>
  );
};

export default Celda;
