import React, { useState, useCallback } from 'react';
import Table from 'components/Table'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'

const HabitacionesPage = () => {
  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(habitacionesSelector);

  const fetchData = useCallback(() => {
    dispatch(fetchHabitaciones());
  }, [dispatch]);

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
      Header: "",
      accessor: "id",
      Cell: ({ cell }) => (
        <Button onClick={e => console.log(e.target.value)} value={cell.row.values.id} text="Ver detalle" />
      )
    }
  ]
  
  const [IsModalVisible, setModalVisibility] = useState(false);

  function closeModalAndRefreshTable() {
    hideModal();
    fetchData();
  }

  function hideModal(){
    setModalVisibility(false);
  }

  function showModal(){
    setModalVisibility(true);
  }  

  return (
    <div className="container">
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="botonera">
          <div className="is-pulled-right">
            <Button onClick={showModal} text="Cargar nueva" />
          </div>
        </div>        
        <Table  fetchData={fetchData} 
                selector={habitacionesSelector} 
                columnas={columnas}
                datos={datos}
                loading={estaCargando}
                hasErrors={tieneErrores}
        />
    </div>
  )
}

export default HabitacionesPage