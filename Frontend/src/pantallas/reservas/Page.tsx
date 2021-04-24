import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import Cabecera from './Cabecera/Cabecera';
import Crear from './crear/Modal';
import Estilos from './Page.module.scss';
import Tabla from './Tabla/Tabla';

const ReservasPage = (): ReactElement => {
  const dispatch = useDispatch();
  const habitaciones = useSelector(api.habitaciones.listar.selector);
  const { datos, estado } = useSelector(api.reservas.listar.selector);
  const [IsModalVisible, setModalVisibility] = useState(false);

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
    hideModal();
    fetchData();
  }

  return (
    <div className={Estilos.contenedorDeTabla}>
      {IsModalVisible && (
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
      )}

      <Cabecera showModal={showModal} onFechaChange={onFechaChange} />

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
