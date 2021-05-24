import { Boton } from 'components/botones/botones';
import { Icon } from 'components/Icon';
import { Body, Modal } from 'components/Modal';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaDetalleDTO, ReservaEstadoEnum } from 'store/api/DTOs';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { convertirADate, nombreDelDiaDeLaSemana, nombreDelMes, restarFechas } from 'utils/Fecha';
import Estilos from './Detalle.module.scss';
import HacerCheckIn from './HacerCheckIn/HacerCheckIn';
import MostrarHabitacionesYCamas from './MostrarHabitacionesYCamas/MostrarHabitacionesYCamas';

const Detalle = (): ReactElement => {
  const [modalHacerCheckInEsVisible, cambiarVisibilidadDeModalHacerCheckIn] = useState(false);
  const [modalPrincipalEsVisible, cambiarVisibilidadDeModalPrincipal] = useState(true);
  const dispatch = useDispatch();
  const { datos } = useSelector(api.reservas.obtenerPorId.selector) as {
    datos: ReservaDetalleDTO;
    estado: ESTADO;
  };

  function ocultar(): void {
    dispatch(api.reservas.obtenerPorId.reiniciar());
  }

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

  const textoPasajeros = (cantidad: number): string => (cantidad === 1 ? '1 pasajero' : `${cantidad} pasajeros`);
  interface IEstilo {
    estilo: string;
    descripcion: string;
  }

  const estilosEstado = new Map<ReservaEstadoEnum, IEstilo>([
    [ReservaEstadoEnum.CheckinPendiente, { estilo: Estilos.estadoCheckinPendiente, descripcion: 'Check-In Pendiente' }],
    [ReservaEstadoEnum.InHouse, { estilo: Estilos.estadoInHouse, descripcion: 'In-House' }],
    [ReservaEstadoEnum.HizoCheckout, { estilo: Estilos.estadoHizoCheckout, descripcion: 'Hizo Checkout' }],
  ]);

  return datos !== null ? (
    <>
      <HacerCheckIn
        datos={datos}
        esVisible={modalHacerCheckInEsVisible}
        ocultar={(): void => {
          cambiarVisibilidadDeModalPrincipal(true);
          cambiarVisibilidadDeModalHacerCheckIn(false);
        }}
      />
      <Modal isVisible={modalPrincipalEsVisible} onHide={ocultar}>
        <Body width={'500px'}>
          <div className={Estilos.contenedor}>
            <p className={Estilos.nombre}>
              {datos.pasajeroTitular.nombreCompleto}
              <span className={estilosEstado.get(datos.estado)?.estilo}>{estilosEstado.get(datos.estado)?.descripcion}</span>
            </p>
            <p className={Estilos.fechas}>
              {fechaParaMostrar(datos.diaDeCheckin)} → {fechaParaMostrar(datos.diaDeCheckout)}
            </p>
            <div className={Estilos.cuerpo}>
              <div className={Estilos.dato}>
                <Icon faCode="calendar" /> <p>{textoNoches(datos.diaDeCheckout, datos.diaDeCheckin)}</p>
              </div>
              <div className={Estilos.dato}>
                <Icon faCode="user-friends" /> <p>{textoPasajeros(datos.cantidadDePasajeros)}</p>
              </div>
              <div className={Estilos.dato}>
                <Icon faCode="clock" /> <p>Llega a las {datos.horaEstimadaDeLlegada} hs.</p>
              </div>
              <MostrarHabitacionesYCamas
                habitacionesPrivadas={datos.habitacionesPrivadas}
                camasDeHabitacionesCompartidas={datos.camas}
              />
              <div className={Estilos.botones}>
                <div className="column">
                  <Boton
                    texto="Cancelar reserva"
                    className={`is-danger ${Estilos.ocuparTodoElAncho}`}
                    onClick={(): void => {}}
                  />
                </div>
                <div className="column">
                  <Boton
                    texto="Hacer Check-In"
                    className={`is-primary ${Estilos.ocuparTodoElAncho}`}
                    onClick={(): void => {
                      cambiarVisibilidadDeModalPrincipal(false);
                      cambiarVisibilidadDeModalHacerCheckIn(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Body>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default Detalle;
