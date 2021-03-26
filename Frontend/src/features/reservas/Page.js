import React, { useState, useCallback, useEffect } from 'react';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import Crear from './crear/Modal';
import { Button } from 'components/botones/botones';
import SelectorDeVista from './SelectorDeVista/Componente';
import Tabla from './Tabla/Tabla';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import CheckoutsDeHoy from './CheckoutsDeHoy/Componente';

const ReservasPage = () => {
  const dispatch = useDispatch();
  const habitaciones = useSelector(api.habitaciones.listar.selector);
  const { datos: datosReservasActuales, estado: estadoReservasActuales } = useSelector(api.reservas.listarActuales.selector);
  const { datos: datosReservasMensuales, estado: estadoReservasMensuales } = useSelector(
    api.reservas.listarMensuales.selector
  );

  const [datos, modificarDatos] = useState([]);
  const [estado, modificarEstado] = useState();
  const [IsModalVisible, setModalVisibility] = useState(false);

  const fetchData = useCallback(() => {
    // dispatch(fetchReservasMensuales(2020, mes));
    dispatch(api.reservas.listarActuales.invocar());
    dispatch(api.habitaciones.listar.invocar());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

  useEffect(() => {
    modificarDatos(datosReservasActuales);
    modificarEstado(estadoReservasActuales);
  }, [datosReservasActuales, estadoReservasActuales]);

  useEffect(() => {
    modificarDatos(datosReservasMensuales);
    modificarEstado(estadoReservasMensuales);
  }, [datosReservasMensuales, estadoReservasMensuales]);

  function obtenerReservasMensuales(anio, mes) {
    dispatch(api.reservas.listarMensuales.invocar({ anio, mes }));
  }

  function obtenerReservasActuales() {
    dispatch(api.reservas.listarActuales.invocar());
  }

  function closeModalAndRefreshTable() {
    hideModal();
    fetchData();
  }

  function hideModal() {
    setModalVisibility(false);
  }

  function showModal() {
    setModalVisibility(true);
  }

  return (
    <div className="container is-fluid">
      {/* HAY QUE SACAR EL ISVISIBLE DEL MODAL, ME PARECE O AL MENOS REPENSARLO */}
      {IsModalVisible && (
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
      )}

      <h1 className="title is-1">Reservas</h1>

      <CheckoutsDeHoy />

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
        ) : estado === ESTADO.exitoso ? (
          <Tabla datos={datos} habitaciones={habitaciones.datos} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ReservasPage;
