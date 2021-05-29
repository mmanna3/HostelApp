import { Icon } from 'components/Icon';
import Table from 'components/Tabla/Tabla';
import DetalleReserva from 'pantallas/reservas/detalle/Detalle';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';
import api from 'store/api/api';
import { ReservaResumenDTO } from 'store/api/DTOs';

const PantallaOperaciones = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.listar.selector);

  const columnas: Column<ReservaResumenDTO>[] = [
    {
      Header: 'Nº reserva',
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
      Header: 'Check-out',
      accessor: 'diaDeCheckout',
    },
    {
      Header: '',
      id: 'aciones',
      Cell: ({ cell }: any): ReactElement => (
        <Icon
          faCode="info-circle"
          size="lg"
          cssClass="primary-clickeable"
          onClick={(): void => {
            dispatch(api.reservas.obtenerPorId.invocar({ id: cell.row.values.id }));
          }}
        />
      ),
    },
  ];

  const fetchData = useCallback((): void => {
    dispatch(api.reservas.listar.invocar());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <DetalleReserva enCheckInExitoso={fetchData} enCheckOutExitoso={fetchData} enCancelacionExitosa={fetchData} />
      <Table fetchData={fetchData} columnas={columnas} datos={datos} estado={estado} />
    </div>
  );
};

export default PantallaOperaciones;
