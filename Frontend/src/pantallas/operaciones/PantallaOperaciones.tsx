import Table from 'components/Table';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';

const PantallaOperaciones = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.listar.selector);

  const columnas = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
    },
    {
      Header: 'Check-In',
      accessor: 'diaDeCheckin',
    },
    {
      Header: 'Camas individuales',
      accessor: 'diaDeCheckout',
    },
  ];

  const fetchData = useCallback((): void => {
    dispatch(api.reservas.listar.invocar());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title is-1">Operaciones</h1>
      <Table fetchData={fetchData} columnas={columnas} datos={datos} estado={estado} />
    </div>
  );
};

export default PantallaOperaciones;
