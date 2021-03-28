import React, { useState, ReactElement, useCallback } from 'react';
import Table from 'components/Table';
import Crear from './crear/Modal';
import Detalle from './detalle/Modal';
import { Button } from 'components/botones/botones';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';

const HabitacionesPage = (): ReactElement => {
  const dispatch = useDispatch();
  const [seMuestraModalDeCreacion, mostrarModalDeCreacion] = useState(false);
  const [seMuestraModalDeDetalle, mostrarModalDeDetalle] = useState(false);
  const [idSeleccionadoParaDetalle, cambiarIdSeleccionadoParaDetalle] = useState(null);
  const { datos, estado } = useSelector(api.habitaciones.listar.selector);

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Camas matrimoniales',
      accessor: 'camasMatrimoniales.length',
    },
    {
      Header: 'Camas cuchetas',
      accessor: 'camasCuchetas.length',
    },
    {
      Header: 'Camas individuales',
      accessor: 'camasIndividuales.length',
    },
    {
      width: 300,
      Header: '',
      accessor: 'id',
      Cell: ({ cell }: any): ReactElement => (
        <Button
          clases=""
          onClick={(e: any): void => {
            cambiarIdSeleccionadoParaDetalle(e.target.value);
            mostrarModalDeDetalle(true);
          }}
          value={cell.row.values.id}
          text="Ver detalle"
        />
      ),
    },
  ];

  const fetchData = useCallback((): void => {
    dispatch(api.habitaciones.listar.invocar());
  }, [dispatch]);

  function cerrarModalDeCreacionYRefrescarTabla(): void {
    mostrarModalDeCreacion(false);
    fetchData();
  }

  return (
    <div className="container">
      <Crear
        isVisible={seMuestraModalDeCreacion}
        onHide={(): void => mostrarModalDeCreacion(false)}
        onSuccessfulSubmit={cerrarModalDeCreacionYRefrescarTabla}
      ></Crear>
      <Detalle
        id={idSeleccionadoParaDetalle}
        isVisible={seMuestraModalDeDetalle}
        onHide={(): void => mostrarModalDeDetalle(false)}
      ></Detalle>

      <h1 className="title is-1">Habitaciones</h1>
      <div className="botonera">
        <div className="is-pulled-right">
          <Button clases="" onClick={(): void => mostrarModalDeCreacion(true)} text="Cargar nueva" />
        </div>
      </div>
      <Table fetchData={fetchData} columnas={columnas} datos={datos} estado={estado} />
    </div>
  );
};

export default HabitacionesPage;
