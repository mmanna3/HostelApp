import { Icon } from 'components/Icon';
import { Body, Modal } from 'components/Modal';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { CamaDTO, HabitacionDTO, ReservaDetalleDTO, ReservaEstadoEnum } from 'store/api/DTOs';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { convertirADate, nombreDelDiaDeLaSemana, nombreDelMes, restarFechas } from 'utils/Fecha';
import { obtenerTipoCamaDescripcion } from '../utilidades';
import Estilos from './Detalle.module.scss';

const Detalle = (): ReactElement => {
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

  const componenteHabitacionesPrivadas = (habs: HabitacionDTO[]): ReactElement =>
    habs.length === 0 ? (
      <div className={Estilos.dato}>
        <Icon faCode="door-closed" />
        <p>Habitaciones privadas: Ninguna.</p>
      </div>
    ) : (
      <div className={Estilos.dato}>
        <Icon faCode="door-closed" />
        <p>Habitaciones privadas:</p>
        <ul className={Estilos.lista}>
          {habs.map(
            (hab, i): ReactElement => (
              <li key={i}>{hab.nombre}</li>
            )
          )}
        </ul>
      </div>
    );

  const componenteCamasDeHabitacionesCompartidas = (camas: CamaDTO[]): ReactElement => {
    if (camas.length === 0)
      return (
        <div className={Estilos.dato}>
          <Icon faCode="bed" />
          <p>Camas: Ninguna.</p>;
        </div>
      );

    const camasAgrupadas: Map<string, CamaDTO[]> = camas.reduce(
      (entryMap, cama): Map<string, CamaDTO[]> =>
        entryMap.set(cama.nombreHabitacion, [...(entryMap.get(cama.nombreHabitacion) || []), cama]),
      new Map()
    );

    let camasLi: ReactElement[] = [];
    camasAgrupadas.forEach((camas, habitacionNombre): void => {
      camasLi.push(
        <li key={habitacionNombre}>
          Habitación {habitacionNombre}
          <ul className={Estilos.listaCamasDeHabitacionesCompartidas}>
            {camas.map(
              (c, i): ReactElement => (
                <li key={i}>
                  Cama {c.nombre} ({obtenerTipoCamaDescripcion.get(c.tipo)})
                </li>
              )
            )}
          </ul>
        </li>
      );
    });

    return (
      <div className={Estilos.dato}>
        <Icon faCode="bed" />
        <p>Camas de habitaciones compartidas: </p>
        <ul className={Estilos.lista}>{camasLi}</ul>
      </div>
    );
  };

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
    <Modal isVisible={true} onHide={ocultar}>
      <Body width={'500px'}>
        <div className={Estilos.contenedor}>
          <p className={Estilos.nombre}>
            {datos.datosMinimosDeHuesped.nombreCompleto}
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
            {componenteHabitacionesPrivadas(datos.habitacionesPrivadas)}

            {componenteCamasDeHabitacionesCompartidas(datos.camas)}
          </div>
        </div>
      </Body>
    </Modal>
  ) : (
    <></>
  );
};

export default Detalle;
