import { Boton } from 'components/botones/botones';
import DatoConIcono from 'components/DatoConIcono/DatoConIcono';
import Modal, { TituloModal, CuerpoModal } from 'components/Modal/Modal';
import React, { ReactElement, useState } from 'react';
import { ReservaDetalleDTO, ReservaEstadoEnum } from 'store/api/DTOs';
import { convertirADate, nombreDelDiaDeLaSemana, nombreDelMes, restarFechas } from 'utils/Fecha';
import Estilos from './DetalleInHouse.module.scss';
import HacerCheckOut from './HacerCheckOut/HacerCheckOut';
import MostrarHabitacionesYCamas from '../MostrarHabitacionesYCamas/MostrarHabitacionesYCamas';

interface IProps {
  enCheckOutExitoso: () => void;
  datos: ReservaDetalleDTO;
  reiniciarDatos: () => void;
}

const DetalleInHouse = ({ enCheckOutExitoso, datos, reiniciarDatos }: IProps): ReactElement => {
  const [modalHacerCheckOutEsVisible, cambiarVisibilidadDeModalHacerCheckOut] = useState(false);
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

  return (
    <>
      <HacerCheckOut
        datos={datos}
        esVisible={modalHacerCheckOutEsVisible}
        alOcultar={(): void => {
          cambiarVisibilidadDeModalHacerCheckOut(false);
          cambiarVisibilidadDeModalPrincipal(true);
        }}
        enCheckOutExitoso={(): void => {
          cambiarVisibilidadDeModalHacerCheckOut(false);
          cambiarVisibilidadDeModalPrincipal(true);
          reiniciarDatos();
          enCheckOutExitoso();
        }}
      />
      <Modal esVisible={modalPrincipalEsVisible} alOcultar={reiniciarDatos}>
        <TituloModal>
          {datos.pasajeroTitular.nombreCompleto}
          <span className={Estilos.estadoInHouse}>In-House</span>
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
            {datos.estado === ReservaEstadoEnum.InHouse && (
              <div className="column">
                <Boton
                  icono="walking"
                  texto="Hacer Check-out"
                  className={`is-primary ${Estilos.ocuparTodoElAncho}`}
                  onClick={(): void => {
                    cambiarVisibilidadDeModalPrincipal(false);
                    cambiarVisibilidadDeModalHacerCheckOut(true);
                  }}
                />
              </div>
            )}
          </div>
        </CuerpoModal>
      </Modal>
    </>
  );
};

export default DetalleInHouse;
