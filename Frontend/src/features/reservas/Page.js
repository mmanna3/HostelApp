import React, { useState, useCallback, useEffect } from 'react';
import { fetchReservasMensuales, fetchReservasActuales, reservasSelector } from '../../store/api/reserva/listar/slice';
import { fetchHabitaciones, habitacionesSelector } from 'store/api/habitacion/listar/slice';
import { useDispatch, useSelector } from 'react-redux';
import Crear from './crear/Modal';
import { Button } from 'components/botones/botones';
import SelectorDeVista from './SelectorDeVista/Componente';
import Tabla from './Tabla/Tabla';
import { EstadosFetchEnum as ESTADO } from 'store/interfaces';
import CheckoutsDeHoy from './CheckoutsDeHoy/Componente';

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(reservasSelector);
  const habitaciones = useSelector(habitacionesSelector);
  const [IsModalVisible, setModalVisibility] = useState(false);

  const fetchData = useCallback(() => {
    // dispatch(fetchReservasMensuales(2020, mes));
    dispatch(fetchReservasActuales());
    dispatch(fetchHabitaciones());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

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
        <SelectorDeVista
          onFechaChanged={(anio, mes) => dispatch(fetchReservasMensuales(anio, mes))}
          onDisabled={() => dispatch(fetchReservasActuales())}
        />
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
