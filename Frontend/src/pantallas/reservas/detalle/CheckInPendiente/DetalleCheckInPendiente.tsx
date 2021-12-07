import { Boton } from 'components/botones/botones';
import DatoConIcono from 'components/DatoConIcono/DatoConIcono';
import Modal, { TituloModal, CuerpoModal } from 'components/Modal/Modal';
import React, { ReactElement, useState } from 'react';

import { ReservaDetalleDTO, ReservaEstadoEnum } from 'store/api/DTOs';
import { convertirADate, nombreDelDiaDeLaSemana, nombreDelMes, restarFechas } from 'utils/Fecha';
import Cancelar from './Cancelar/Cancelar';
import Estilos from './Detalle.module.scss';
import HacerCheckIn from './HacerCheckIn/HacerCheckIn';
import MostrarHabitacionesYCamas from '../MostrarHabitacionesYCamas/MostrarHabitacionesYCamas';

interface IProps {
  ejecutarAlTerminar: () => void;
  datos: ReservaDetalleDTO;
  reiniciarDatos: () => void;
}

const DetalleCheckInPendiente = ({ ejecutarAlTerminar, datos, reiniciarDatos }: IProps): ReactElement => {
  const [modalHacerCheckInEsVisible, cambiarVisibilidadDeModalHacerCheckIn] = useState(false);
  const [modalCancelarEsVisible, cambiarVisibilidadDeModalCancelar] = useState(false);
  const [modalPrincipalEsVisible, cambiarVisibilidadDeModalPrincipal] = useState(true);

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

  return datos !== null ? (
    <>
      <HacerCheckIn
        datos={datos}
        esVisible={modalHacerCheckInEsVisible}
        alOcultar={(): void => {
          cambiarVisibilidadDeModalHacerCheckIn(false);
          cambiarVisibilidadDeModalPrincipal(true);
        }}
        enCheckInExitoso={(): void => {
          cambiarVisibilidadDeModalHacerCheckIn(false);
          cambiarVisibilidadDeModalPrincipal(true);
          reiniciarDatos();
          ejecutarAlTerminar();
        }}
      />
      <Cancelar
        datos={datos}
        esVisible={modalCancelarEsVisible}
        alOcultar={(): void => {
          cambiarVisibilidadDeModalCancelar(false);
          cambiarVisibilidadDeModalPrincipal(true);
        }}
        enCancelacionExitosa={(): void => {
          cambiarVisibilidadDeModalCancelar(false);
          cambiarVisibilidadDeModalPrincipal(true);
          reiniciarDatos();
          ejecutarAlTerminar();
        }}
      />
      <Modal esVisible={modalPrincipalEsVisible} alOcultar={reiniciarDatos}>
        <TituloModal>
          {datos.pasajeroTitular.nombreCompleto}
          <span className={Estilos.estadoCheckinPendiente}>Check-In Pendiente</span>
        </TituloModal>
        <p className={Estilos.fechas}>
          {fechaParaMostrar(datos.diaDeCheckin)} → {fechaParaMostrar(datos.diaDeCheckout)}
        </p>
        <CuerpoModal>
          <DatoConIcono icono="calendar" texto={textoNoches(datos.diaDeCheckout, datos.diaDeCheckin)} />
          <DatoConIcono icono="user-friends" texto={textoPasajeros(datos.cantidadDePasajeros)} />
          <DatoConIcono icono="clock" texto={`Llega a las ${datos.horaEstimadaDeLlegada} hs.`} />

          <MostrarHabitacionesYCamas
            habitacionesPrivadas={datos.habitacionesPrivadas}
            camasDeHabitacionesCompartidas={datos.camas}
          />
          <div className={Estilos.botones}>
            {datos.estado === ReservaEstadoEnum.CheckinPendiente && (
              <>
                <div className="column">
                  <Boton
                    icono="times"
                    texto="Cancelar reserva"
                    className={Estilos.ocuparTodoElAncho}
                    onClick={(): void => {
                      cambiarVisibilidadDeModalPrincipal(false);
                      cambiarVisibilidadDeModalCancelar(true);
                    }}
                  />
                </div>
                <div className="column">
                  <Boton
                    icono="walking"
                    texto="Hacer Check-In"
                    className={`is-primary ${Estilos.ocuparTodoElAncho}`}
                    onClick={(): void => {
                      cambiarVisibilidadDeModalPrincipal(false);
                      cambiarVisibilidadDeModalHacerCheckIn(true);
                    }}
                  />
                </div>
              </>
            )}

            {datos.estado === ReservaEstadoEnum.InHouse && (
              <div className="column">
                <Boton
                  icono="walking"
                  texto="Hacer Check-out"
                  className={`is-primary ${Estilos.ocuparTodoElAncho}`}
                  onClick={(): void => {
                    cambiarVisibilidadDeModalPrincipal(false);
                  }}
                />
              </div>
            )}
          </div>
        </CuerpoModal>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default DetalleCheckInPendiente;
