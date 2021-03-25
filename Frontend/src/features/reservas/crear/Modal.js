import React, { useState, useEffect } from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from 'components/Input';
import { Button } from 'components/botones/botones';
import Label from 'components/Label';
import ValidationSummary from 'components/ValidationSummary';
import DateRangePicker from 'components/dateRangePicker/DateRangePicker';
import { crearReserva, cleanErrors, crearReservaSelector } from 'store/api/reserva/crear/slice';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { convertirAString, hoy, maniana, restarFechas } from 'utils/Fecha';
import Renglon from './Renglon/Renglon';
import Estilos from './Modal.module.scss';

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }) => {
  class RenglonData {
    constructor(indice, habitacionesDisponibles, camasDisponibles, habitacionSeleccionada, camaSeleccionadaId) {
      this.habitacionSeleccionada = habitacionSeleccionada;
      this.indice = indice;
      this.habitacionesDisponibles = habitacionesDisponibles;
      this.camasDisponibles = camasDisponibles;

      if (camaSeleccionadaId) this.camaSeleccionadaId = camaSeleccionadaId;
      else if (camasDisponibles.length > 0) this.camaSeleccionadaId = camasDisponibles[0].id;
    }
  }

  const { loading, validationErrors } = useSelector(crearReservaSelector);
  const [resetOnChanged, resetForm] = React.useState(0);
  const [desdeHasta, actualizarDesdeHasta] = useState([hoy(), maniana()]);
  const [cantidadDeNoches, actualizarCantidadDeNoches] = useState(1);
  const [renglones, actualizarRenglones] = useState([new RenglonData(0, [], [])]);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearReserva(data, onSuccess));

  const habRequest = api.habitaciones.listarConLugaresLibres;
  const habitacionesSelector = useSelector(api.habitaciones.listarConLugaresLibres.selector);
  const habitaciones = habitacionesSelector.datos;
  const habitacionesEstado = habitacionesSelector.estado;

  useEffect(() => {
    function restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento() {
      let milisegundosDeUnDia = 24 * 60 * 60 * 1000 * 1;
      let resultado = new Date(desdeHasta[1]);
      resultado.setTime(resultado.getTime() - milisegundosDeUnDia);
      return resultado;
    }

    let hasta = restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento();
    dispatch(habRequest.invocar({ desde: convertirAString(desdeHasta[0]), hasta: convertirAString(hasta) }));
    actualizarCantidadDeNoches(restarFechas(desdeHasta[1], desdeHasta[0]));
  }, [dispatch, habRequest, desdeHasta, cantidadDeNoches]);

  useEffect(() => {
    if (habitaciones.length > 0)
      actualizarRenglones([new RenglonData(0, habitaciones, habitaciones[0].camas, habitaciones[0])]);
    //PORQUE QUIERE QUE RENGLÓN SEA DEPENDENCIA Y SE ROMPE TODO SI LO PONGO
    // eslint-disable-next-line
  }, [habitaciones]);

  function onSuccess() {
    actualizarDesdeHasta([new Date(), new Date()]);
    onSuccessfulSubmit();
    resetForm(resetOnChanged + 1);
  }

  function hide() {
    onHide();
    dispatch(cleanErrors());
  }

  function onHabitacionChange(indice, id) {
    var habitacion = habitaciones.find(hab => hab.id === parseInt(id));

    var renglonesCopia = renglones;
    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].habitacionSeleccionada = habitacion;
        renglonesCopia[i].camasDisponibles = habitacion.camas;
        if (habitacion.camas.length > 0) renglonesCopia[i].camaSeleccionadaId = habitacion.camas[0].id;

        break;
      }
    actualizarRenglones([...renglonesCopia]);
  }

  function onCamaChange(indice, id) {
    var renglonesCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].camaSeleccionadaId = id;
        break;
      }

    actualizarRenglones([...renglonesCopia]);
  }

  function agregarRenglon() {
    var ultimoRenglon = renglones.slice(-1).pop();
    var proximoIndice = ultimoRenglon.indice + 1;

    actualizarRenglones([...renglones, new RenglonData(proximoIndice, habitaciones, habitaciones[0].camas)]);
  }

  function eliminarRenglon(indice) {
    if (renglones.length > 1) {
      var renglonSinElBorrado = renglones.filter(renglon => renglon.indice !== indice);
      actualizarRenglones(renglonSinElBorrado);
    }
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} resetOnChanged={resetOnChanged} minWidth="680px">
      <Header title="Alta de reserva" onHide={hide} />
      <Body minHeight="460px">
        <ValidationSummary errors={validationErrors} />
        <Input label="Huésped" name="aNombreDe" />
        <DateRangePicker actualizarValor={actualizarDesdeHasta} etiqueta="Check in - Check out" valor={desdeHasta} />
        <p className={Estilos.noches}>
          <strong>Noches: </strong>
          {cantidadDeNoches}
        </p>
        <Label text="Camas" />

        {renglones.map(renglon => {
          return (
            <Renglon
              key={`${renglon.indice}`}
              renglon={renglon}
              estado={habitacionesEstado}
              onHabitacionChange={e => onHabitacionChange(renglon.indice, e.target.value)}
              onCamaChange={e => onCamaChange(renglon.indice, e.target.value)}
              eliminar={eliminarRenglon}
            />
          );
        })}

        <Button text="Agregar cama" onClick={agregarRenglon} style={{ marginTop: '1em' }} />
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
    </ModalForm>
  );
};

export default Crear;
