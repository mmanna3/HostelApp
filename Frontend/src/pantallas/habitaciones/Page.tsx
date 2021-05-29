import { Boton } from 'components/botones/botones';
import Table from 'components/Tabla/Tabla';
import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import Crear from './crear/Modal';
import Detalle from './detalle/Modal';

const HabitacionesPage = (): ReactElement => {
  const dispatch = useDispatch();
  const [seMuestraModalDeCreacion, mostrarModalDeCreacion] = useState(false);
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
        <Boton
          onClick={(e: any): void => {
            cambiarIdSeleccionadoParaDetalle(e.target.value);
          }}
          value={cell.row.values.id}
          texto="Ver detalle"
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
      <Detalle id={idSeleccionadoParaDetalle} onHide={(): void => cambiarIdSeleccionadoParaDetalle(null)}></Detalle>

      <h1 className="title is-2">Habitaciones</h1>
      <div className="botonera">
        <div className="is-pulled-right">
          <Boton onClick={(): void => mostrarModalDeCreacion(true)} texto="Cargar nueva" />
        </div>
      </div>
      <Table fetchData={fetchData} columnas={columnas} datos={datos} estado={estado} />
    </div>
  );
};

export default HabitacionesPage;
