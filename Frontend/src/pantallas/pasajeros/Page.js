import { Boton } from 'components/botones/botones';
import Table from 'components/Tabla/Tabla';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Crear from './crear/Modal';

const PasajerosPage = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.pasajeros.listar.selector);

  const fetchData = useCallback(() => {
    dispatch(api.pasajeros.listar.invocar());
  }, [dispatch]);

  const columnas = [
    {
      Header: 'DNI/Pasaporte',
      accessor: 'dniOPasaporte',
    },
    {
      Header: 'Nombre',
      accessor: 'nombreCompleto',
    },
    {
      Header: 'País',
      accessor: 'pais',
    },
    {
      Header: 'Teléfono',
      accessor: 'telefono',
    },
    {
      Header: 'Email',
      accessor: 'email',
    }
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

      <h1 className="title is-2">Pasajeros</h1>
      <div className="buttons is-fullwidth is-pulled-right">
        <Boton onClick={showModal} texto="Cargar nuevo" />
      </div>
      <Table
        fetchData={fetchData}
        selector={api.pasajeros.selector}
        columnas={columnas}
        datos={datos}
        loading={estado === EstadosApiRequestEnum.cargando}
        hasErrors={estado === EstadosApiRequestEnum.huboError}
      />
    </div>
  );
};

export default PasajerosPage;
