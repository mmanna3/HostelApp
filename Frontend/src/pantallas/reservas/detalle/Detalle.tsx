import { Icon } from 'components/Icon';
import { Body, Modal } from 'components/Modal';
import { ReservaDTO } from 'interfaces/reserva';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { convertirADate, nombreDelDiaDeLaSemana, nombreDelMes, restarFechas } from 'utils/Fecha';
import Estilos from './Detalle.module.scss';

const Detalle = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.reservas.obtenerPorId.selector) as {
    datos: ReservaDTO;
    estado: ESTADO;
  };

  function ocultar(): void {
    dispatch(api.reservas.obtenerPorId.reiniciar());
  }

  // Estaría bueno que haya un spinner que bloquee la pantalla y opere según el estado

  const fechaParaMostrar = (fecha: string): string => {
    var fechaDate = convertirADate(fecha);
    return `${nombreDelDiaDeLaSemana(fechaDate)} ${fechaDate.getDate()} ${nombreDelMes(fechaDate)}`;
  };

  const calcularCantidadDeNoches = (fechaCheckout: string, fechaCheckin: string): number => {
    var checkoutDate = convertirADate(fechaCheckout);
    var checkinDate = convertirADate(fechaCheckin);
    return restarFechas(checkoutDate, checkinDate);
  };

  const textoNoches = (fechaCheckout: string, fechaCheckin: string): string => {
    var cantidadDeNoches = calcularCantidadDeNoches(fechaCheckout, fechaCheckin);
    return cantidadDeNoches === 1 ? '1 noche' : `${cantidadDeNoches} noches`;
  };

  return datos !== null ? (
    <Modal isVisible={true} onHide={ocultar}>
      <Body width={'400px'}>
        <div className={Estilos.contenedor}>
          <p className={Estilos.nombre}>{datos.datosMinimosDeHuesped.nombreCompleto}</p>
          <p className={Estilos.fechas}>
            {fechaParaMostrar(datos.diaDeCheckin)} - {fechaParaMostrar(datos.diaDeCheckout)}
          </p>
          <div className={Estilos.cuerpo}>
            <p className={Estilos.noches}>
              <Icon faCode="calendar" /> <p>{textoNoches(datos.diaDeCheckout, datos.diaDeCheckin)}</p>
            </p>
          </div>
        </div>
      </Body>
    </Modal>
  ) : (
    <></>
  );
};

export default Detalle;
