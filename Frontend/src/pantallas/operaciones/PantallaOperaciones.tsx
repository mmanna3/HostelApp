import { Autocomplete } from 'components/Autocomplete';
import Form from 'components/Form';
import { Icon } from 'components/Icon';
import Table from 'components/Tabla/Tabla';
import DetalleReserva from 'pantallas/reservas/detalle/Detalle';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';
import api from 'store/api/api';
import { ReservaEstadoEnum, ReservaResumenDTO } from 'store/api/DTOs';
import Estilos from './PantallaOperaciones.module.scss';

const PantallaOperaciones = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.listar.selector);

  interface IEstilo {
    estilo: string;
    descripcion: string;
  }

  const estilosEstado = new Map<ReservaEstadoEnum, IEstilo>([
    [ReservaEstadoEnum.Cancelada, { estilo: Estilos.estadoCancelada, descripcion: 'Cancelada' }],
    [ReservaEstadoEnum.CheckinPendiente, { estilo: Estilos.estadoCheckinPendiente, descripcion: 'Check-In Pendiente' }],
    [ReservaEstadoEnum.InHouse, { estilo: Estilos.estadoInHouse, descripcion: 'In-House' }],
    [ReservaEstadoEnum.HizoCheckout, { estilo: Estilos.estadoHizoCheckout, descripcion: 'Hizo Checkout' }],
  ]);

  const columnas: Column<ReservaResumenDTO>[] = [
    {
      Header: 'Nº reserva',
      accessor: 'id',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      Cell: ({ cell }: any): ReactElement => (
        <div className={Estilos.estadoContenedor}>
          <div className={estilosEstado.get(cell.row.values.estado)?.estilo}>
            {estilosEstado.get(cell.row.values.estado)?.descripcion}
          </div>
        </div>
      ),
    },
    {
      Header: 'Pasajero',
      accessor: 'pasejeroTitular',
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

  const estadosDeReserva = [
    { label: 'Cancelada', value: ReservaEstadoEnum.Cancelada },
    { label: 'Check-In pendiente', value: ReservaEstadoEnum.CheckinPendiente },
    { label: 'In-House', value: ReservaEstadoEnum.InHouse },
    { label: 'Hizo Check-Out', value: ReservaEstadoEnum.HizoCheckout },
  ];

  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <Form defaultValues={undefined} onSubmit={(): void => {}}>
        <div className="columns">
          <div className="column is-one-quarter">
            <Autocomplete
              dataCy="estado"
              name="estado"
              opciones={estadosDeReserva}
              opcionInicial={estadosDeReserva[1]}
              placeholder="Estado"
              onChange={(reservaEstado: string): void => {
                console.log(reservaEstado);
              }}
            />
          </div>
        </div>
      </Form>
      <DetalleReserva enCheckInExitoso={fetchData} enCheckOutExitoso={fetchData} enCancelacionExitosa={fetchData} />
      <Table fetchData={fetchData} columnas={columnas} datos={datos} estado={estado} />
    </div>
  );
};

export default PantallaOperaciones;
