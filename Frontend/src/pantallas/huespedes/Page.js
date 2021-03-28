import React, { useState, useCallback } from 'react';
import Table from 'components/Table';
import { useDispatch, useSelector } from 'react-redux';
import Crear from './crear/Modal';
import { Button } from 'components/botones/botones';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

const HuespedesPage = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.huespedes.listar.selector);

  const fetchData = useCallback(() => {
    dispatch(api.huespedes.listar.invocar());
  }, [dispatch]);

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
  ];

  const [IsModalVisible, setModalVisibility] = useState(false);

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
    <div className="container">
      <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>

      <h1 className="title is-1">Huéspedes</h1>
      <div className="buttons is-fullwidth is-pulled-right">
        <Button onClick={showModal} text="Cargar nuevo" />
      </div>
      <Table
        fetchData={fetchData}
        selector={api.huespedes.selector}
        columnas={columnas}
        datos={datos}
        loading={estado === EstadosApiRequestEnum.cargando}
        hasErrors={estado === EstadosApiRequestEnum.huboError}
      />
    </div>
  );
};

export default HuespedesPage;
