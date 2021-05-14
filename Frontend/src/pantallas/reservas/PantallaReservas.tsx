import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import Cabecera from './Cabecera/Cabecera';
import Crear from './crear/Crear';
import Estilos from './PantallaReservas.module.scss';
import Tabla from './Tabla/Tabla';

const ReservasPage = (): ReactElement => {
  const dispatch = useDispatch();
  const habitaciones = useSelector(api.habitaciones.listar.selector);
  const { datos, estado } = useSelector(api.reservas.listar.selector);
  const [IsModalVisible, setModalVisibility] = useState(false);
  const [cabeceraKey, reiniciarCabecera] = useCounterKey();

  const fetchData = useCallback((): void => {
    dispatch(api.habitaciones.listar.invocar());
  }, [dispatch]);

  useEffect((): void => fetchData(), [fetchData]);

  function onFechaChange(primeraNoche: string, dias: number): void {
    dispatch(api.reservas.listar.invocar({ primeraNoche, dias }));
  }

  function hideModal(): void {
    setModalVisibility(false);
  }

  function showModal(): void {
    setModalVisibility(true);
  }

  function closeModalAndRefreshTable(): void {
    reiniciarCabecera();
    hideModal();
    fetchData();
  }

  return (
    <div className={Estilos.contenedorDeTabla}>
      {IsModalVisible && (
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
      )}

      <Cabecera key={cabeceraKey} showModal={showModal} onFechaChange={onFechaChange} />

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
