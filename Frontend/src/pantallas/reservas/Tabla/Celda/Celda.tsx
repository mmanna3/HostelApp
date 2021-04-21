import { ReservaEstadoEnum } from 'interfaces/reserva';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { seleccionarTodasLasCeldasDeLaReserva, tablaDeReservasSelector } from 'store/app/tablaDeReservas/slice';
import estilos from './Celda.module.scss';
import { CeldaPertenecienteAReservaEstilo, ICeldaInfo } from './interfaces';

export interface IParams {
  dia: number;
  camaId: number;
  esPrimeraCamaDeLaHabitacion: boolean;
  onClick: (id: Nullable<number>) => any;
}

const Celda = ({ dia, camaId, esPrimeraCamaDeLaHabitacion, onClick }: IParams): ReactElement => {
  const dispatch = useDispatch();
  const { tabla } = useSelector(tablaDeReservasSelector);
  const [data, actualizarData] = useState<ICeldaInfo>({
    id: null,
    estilo: CeldaPertenecienteAReservaEstilo.Ninguno,
    estado: ReservaEstadoEnum.CheckinPendiente,
  });
  const [claseCssColor, actualizarClaseCssColor] = useState<string | undefined>('');

  const colores = new Map<ReservaEstadoEnum, string>([
    [ReservaEstadoEnum.CheckinPendiente, estilos.colorCero],
    [ReservaEstadoEnum.InHouse, estilos.colorUno],
    [ReservaEstadoEnum.HizoCheckout, estilos.colorDos],
  ]);

  const onMouseOver = (): void => {
    dispatch(seleccionarTodasLasCeldasDeLaReserva(data.id));
  };

  useEffect((): any => {
    var contenido = tabla[`${dia}`][`${camaId}`];
    actualizarData(contenido);

    if (contenido.estado !== null) {
      //Horrible if, hay que sacarlo
      actualizarClaseCssColor(colores.get(contenido.estado));
    }
  }, [tabla, dia, camaId, colores]);

  return (
    <>
      <td
        className={`${claseCssColor} ${data.estilo}`}
        data-reserva-id={data.id}
        data-dia={dia}
        data-cama-id={camaId}
        data-es-primera-cama={esPrimeraCamaDeLaHabitacion}
        onMouseOver={onMouseOver}
        onClick={(): void => onClick(data.id)}
      >
        <div>{/* {contenido.aNombreDe} */}</div>
      </td>
    </>
  );
};

export default Celda;
