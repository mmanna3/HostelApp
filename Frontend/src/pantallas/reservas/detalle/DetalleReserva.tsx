import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaEstadoEnum } from 'store/api/DTOs';
import DetalleCheckInPendiente from './CheckInPendiente/DetalleCheckInPendiente';
import DetalleInHouse from './InHouse/DetalleInHouse';

interface IProps {
  ejecutarAlTerminar: () => void;
}

const DetalleReserva = ({ ejecutarAlTerminar }: IProps): ReactElement => {
  const dispatch = useDispatch();

  const { datos } = useSelector(api.reservas.obtenerPorId.selector);

  function reiniciarDatos(): void {
    dispatch(api.reservas.obtenerPorId.reiniciar());
  }

  if (datos !== null && datos.estado === ReservaEstadoEnum.InHouse)
    return <DetalleInHouse enCheckOutExitoso={ejecutarAlTerminar} reiniciarDatos={reiniciarDatos} datos={datos} />;
  else if (datos !== null && datos.estado === ReservaEstadoEnum.CheckinPendiente)
    return <DetalleCheckInPendiente ejecutarAlTerminar={ejecutarAlTerminar} reiniciarDatos={reiniciarDatos} datos={datos} />;
  else return <></>;
};

export default DetalleReserva;
