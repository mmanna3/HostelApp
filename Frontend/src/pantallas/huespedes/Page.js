import { Boton } from 'components/botones/botones';
import Table from 'components/Table';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Crear from './crear/Modal';

const HuespedesPage = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.huespedes.listar.selector);

  const fetchData = useCallback(() => {
    dispatch(api.huespedes.listar.invocar());
  }, [dispatch]);

  const columnas = [
    {
      Header: 'DNI o Pasaporte',
      accessor: 'dniOPasaporte',
    },
    {
      Header: 'Nombre',
      accessor: 'nombreCompleto',
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
        <Boton onClick={showModal} texto="Cargar nuevo" />
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
