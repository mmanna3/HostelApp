import React, { useState, useEffect, ReactElement } from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Button } from 'components/botones/botones';
import Label from 'components/Label';
import ValidationSummary from 'components/ValidationSummary';
import DateRangePicker from 'components/dateRangePicker/DateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { convertirAString, hoy, maniana, restarFechas } from 'utils/Fecha';
import Renglon from './Renglon/Renglon';
import Estilos from './Modal.module.scss';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { RenglonData } from './Renglon/RenglonDataClass';
import CabeceraHuesped from './CabeceraHuesped/Componente';

interface IParams {
  isVisible: boolean;
  onHide: () => any;
  onSuccessfulSubmit: () => any;
}

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }: IParams): ReactElement => {
  const { selector, reiniciar } = api.reservas.crear;
  const { estado, errores } = useSelector(selector);
  const [resetOnChanged, resetForm] = React.useState(0);
  const [desdeHasta, actualizarDesdeHasta] = useState([hoy(), maniana()]);
  const [cantidadDeNoches, actualizarCantidadDeNoches] = useState(1);
  const [renglones, actualizarRenglones] = useState([new RenglonData(0, [], [])]);

  const dispatch = useDispatch();

  function onSuccess(): void {
    actualizarDesdeHasta([new Date(), new Date()]);
    onSuccessfulSubmit();
    resetForm(resetOnChanged + 1);
  }

  const onSubmit = (data: any): any => dispatch(api.reservas.crear.invocar(data, onSuccess));

  const habRequest = api.habitaciones.listarConLugaresLibres;
  const habitacionesSelector = useSelector(api.habitaciones.listarConLugaresLibres.selector);
  const habitaciones = habitacionesSelector.datos;
  const habitacionesEstado = habitacionesSelector.estado;

  useEffect((): void => {
    function restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento(): Date {
      let milisegundosDeUnDia = 24 * 60 * 60 * 1000 * 1;
      let resultado = new Date(desdeHasta[1]);
      resultado.setTime(resultado.getTime() - milisegundosDeUnDia);
      return resultado;
    }

    let hasta = restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento();
    dispatch(habRequest.invocar({ desde: convertirAString(desdeHasta[0]), hasta: convertirAString(hasta) }));
    actualizarCantidadDeNoches(restarFechas(desdeHasta[1], desdeHasta[0]));
  }, [dispatch, habRequest, desdeHasta, cantidadDeNoches]);

  useEffect((): void => {
    if (habitaciones.length > 0)
      actualizarRenglones([new RenglonData(0, habitaciones, habitaciones[0].camas, habitaciones[0])]);
    //PORQUE QUIERE QUE RENGLÓN SEA DEPENDENCIA Y SE ROMPE TODO SI LO PONGO
    // eslint-disable-next-line
  }, [habitaciones]);

  function hide(): void {
    onHide();
    dispatch(reiniciar());
  }

  function onHabitacionChange(indice: number, id: string): void {
    var habitacion = habitaciones.find((hab: any): any => hab.id === parseInt(id));

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

  function onCamaChange(indice: number, id: string): void {
    var renglonesCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].camaSeleccionadaId = id;
        break;
      }

    actualizarRenglones([...renglonesCopia]);
  }

  function agregarRenglon(): void {
    var ultimoRenglon = renglones.slice(-1).pop();
    var proximoIndice = 0;
    if (ultimoRenglon) proximoIndice = ultimoRenglon.indice + 1;
    // Hago esto porque eslint dice que ultimoRenglon puede ser undefined, tiene razón, pero no debería serlo nunca

    actualizarRenglones([...renglones, new RenglonData(proximoIndice, habitaciones, habitaciones[0].camas)]);
  }

  function eliminarRenglon(indice: number): void {
    if (renglones.length > 1) {
      var renglonSinElBorrado = renglones.filter((renglon): any => renglon.indice !== indice);
      actualizarRenglones(renglonSinElBorrado);
    }
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} resetOnChanged={resetOnChanged} minWidth="900px">
      <Header title="Alta de reserva" onHide={hide} />
      <Body minHeight="460px">
        <ValidationSummary errors={errores} />

        <CabeceraHuesped />

        <DateRangePicker
          actualizarValor={actualizarDesdeHasta}
          etiqueta="Check in - Check out"
          valor={desdeHasta}
          desdeName="diaDeCheckin"
          hastaName="diaDeCheckout"
        />
        <p className={Estilos.noches}>
          <strong>Noches: </strong>
          {cantidadDeNoches}
        </p>
        <Label text="Camas" />

        {renglones.map(
          (renglon): ReactElement => {
            return (
              <Renglon
                key={`${renglon.indice}`}
                renglon={renglon}
                estado={habitacionesEstado}
                onHabitacionChange={(e: any): void => onHabitacionChange(renglon.indice, e.target.value)}
                onCamaChange={(e: any): void => onCamaChange(renglon.indice, e.target.value)}
                eliminar={eliminarRenglon}
              />
            );
          }
        )}

        <Button text="Agregar cama" onClick={agregarRenglon} style={{ marginTop: '1em' }} />
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
