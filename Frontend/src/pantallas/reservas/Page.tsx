import { Button } from 'components/botones/botones';
import { ReservasDelPeriodoDTO } from 'interfaces/reserva';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import Crear from './crear/Modal';
import SelectorDeVista from './SelectorDeVista/Componente';
import Tabla from './Tabla/Tabla';

const ReservasPage = (): ReactElement => {
  const dispatch = useDispatch();
  const habitaciones = useSelector(api.habitaciones.listar.selector);
  const { datos: datosReservasActuales, estado: estadoReservasActuales } = useSelector(api.reservas.listarActuales.selector);
  const { datos: datosReservasMensuales, estado: estadoReservasMensuales } = useSelector(
    api.reservas.listarMensuales.selector
  );

  const [datos, modificarDatos] = useState<ReservasDelPeriodoDTO>();
  const [estado, modificarEstado] = useState<ESTADO>();
  const [IsModalVisible, setModalVisibility] = useState(false);

  const fetchData = useCallback((): void => {
    dispatch(api.reservas.listarActuales.invocar());
    dispatch(api.habitaciones.listar.invocar());
  }, [dispatch]);

  useEffect((): void => fetchData(), [fetchData]);

  useEffect((): void => {
    modificarDatos(datosReservasActuales);
    modificarEstado(estadoReservasActuales);
  }, [datosReservasActuales, estadoReservasActuales]);

  useEffect((): void => {
    modificarDatos(datosReservasMensuales);
    modificarEstado(estadoReservasMensuales);
  }, [datosReservasMensuales, estadoReservasMensuales]);

  function obtenerReservasMensuales(anio: any, mes: any): void {
    dispatch(api.reservas.listarMensuales.invocar({ anio, mes }));
  }

  function obtenerReservasActuales(): void {
    dispatch(api.reservas.listarActuales.invocar());
  }

  function hideModal(): void {
    setModalVisibility(false);
  }

  function showModal(): void {
    setModalVisibility(true);
  }

  function closeModalAndRefreshTable(): void {
    hideModal();
    fetchData();
  }

  return (
    <div className="container is-fluid">
      <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>

      {/* ESTO DEBERÍA ESTAR HECHO CON LOS BULMA LEVEL, DESPUÉS CHUSMEALOS */}
      <div className="botonera is-fullwidth">
        <SelectorDeVista onFechaChanged={obtenerReservasMensuales} onDisabled={obtenerReservasActuales} />
        <div className="field is-pulled-right">
          <Button onClick={showModal} text="Cargar nueva" />
        </div>
      </div>
      <div>
        {estado === ESTADO.huboError ? (
          'Hubo un error.'
        ) : estado === ESTADO.cargando ? (
          'Cargando...'
        ) : estado === ESTADO.exitoso && datos ? (
          <Tabla datos={datos} habitaciones={habitaciones.datos} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ReservasPage;
