import { Button } from 'components/botones/botones';
import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import ValidationSummary from 'components/ValidationSummary';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { HabitacionParaReservaDTO, ReservaDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import DatosDelHuesped from './DatosDelHuesped/DatosDelHuesped';
import DatosGenerales from './DatosGenerales/DatosGenerales';
import PasajerosYLugares from './PasajerosYLugares/PasajerosYLugares';
import Renglon from './Renglon/Renglon';
import { RenglonData } from './Renglon/RenglonDataClass';

interface IParams {
  isVisible: boolean;
  onHide: () => any;
  onSuccessfulSubmit: () => any;
}

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }: IParams): ReactElement => {
  const { selector, reiniciar } = api.reservas.crear;
  const { estado, errores } = useSelector(selector);
  const [modalKey, reiniciarModal] = useCounterKey();
  const [datosGeneralesKey, reiniciarDatosGenerales] = useCounterKey();
  const [renglones, actualizarRenglones] = useState<RenglonData[]>([new RenglonData(0, [], [])]);
  const dispatch = useDispatch();

  function onSuccess(): void {
    reiniciarDatosGenerales();
    onSuccessfulSubmit();
    reiniciarModal();
    dispatch(api.huespedes.obtenerPorDniOPasaporte.reiniciar());
  }

  const onSubmit = (data: ReservaDTO): void => dispatch(api.reservas.crear.invocar(data, onSuccess));

  const listarConLugaresLibresRequest = api.habitaciones.listarConLugaresLibres;
  const habitacionesSelector = useSelector(api.habitaciones.listarConLugaresLibres.selector);
  const habitaciones = habitacionesSelector.datos;
  const habitacionesEstado = habitacionesSelector.estado;

  useEffect((): void => {
    if (habitaciones.length > 0)
      actualizarRenglones([new RenglonData(0, habitaciones, habitaciones[0].camas, habitaciones[0])]);
    //PORQUE QUIERE QUE RENGLÓN SEA DEPENDENCIA Y SE ROMPE TODO SI LO PONGO
    // eslint-disable-next-line
  }, [habitaciones]);

  function ocultar(): void {
    onHide();
    dispatch(reiniciar());
    reiniciarModal();
    dispatch(api.huespedes.obtenerPorDniOPasaporte.reiniciar());
  }

  function onHabitacionChange(indice: number, id: string): void {
    var habitacion = habitaciones.find((hab: HabitacionParaReservaDTO): boolean => hab.id === parseInt(id));

    if (habitacion) {
      // Innecesario if pero bueno
      var renglonesCopia = renglones;
      for (let i = 0; i < renglones.length; i++)
        if (renglonesCopia[i].indice === indice) {
          renglonesCopia[i].habitacionSeleccionada = habitacion;
          renglonesCopia[i].camasDisponibles = habitacion.camas;
          if (habitacion.camas.length > 0) renglonesCopia[i].camaSeleccionadaId = habitacion.camas[0].id.toString();

          break;
        }
      actualizarRenglones([...renglonesCopia]);
    }
  }

  function onCamaChange(indice: number, id: string): void {
    var renglonesCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (renglonesCopia[i].indice === indice) {
        renglonesCopia[i].camaSeleccionadaId = id;
        break;
      }

    actualizarRenglones([...renglonesCopia]);
    // calcularLugaresReservados();
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
      var renglonesSinElEliminado = renglones.filter((renglon: RenglonData): boolean => renglon.indice !== indice);
      actualizarRenglones(renglonesSinElEliminado);
    }
  }

  const onDesdeHastaChange = useCallback(
    (desde: string, hasta: string): void => {
      dispatch(listarConLugaresLibresRequest.invocar({ desde: desde, hasta: hasta }));
    },
    [listarConLugaresLibresRequest, dispatch]
  );

  return (
    <ModalForm isVisible={isVisible} onHide={ocultar} onSubmit={onSubmit} minWidth="900px" key={modalKey}>
      <Header title="Nueva reserva" onHide={ocultar} />
      <CardBody minHeight="460px">
        <ValidationSummary errors={errores} />

        <DatosGenerales onDesdeHastaChange={onDesdeHastaChange} key={datosGeneralesKey} />

        <LineaDivisoria texto="PASAJERO TITULAR" style={{ marginTop: '-8px' }} />

        <DatosDelHuesped />

        <LineaDivisoria texto="HABITACIONES Y CAMAS" />
        <PasajerosYLugares renglones={renglones} />
        {renglones.map(
          (renglon: RenglonData): ReactElement => {
            return (
              <Renglon
                key={`${renglon.indice}`}
                renglon={renglon}
                estado={habitacionesEstado}
                onHabitacionChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                  onHabitacionChange(renglon.indice, e.target.value)
                }
                onCamaChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                  onCamaChange(renglon.indice, e.target.value)
                }
                eliminar={eliminarRenglon}
              />
            );
          }
        )}

        <Button text="Agregar cama" onClick={agregarRenglon} style={{ marginTop: '1em' }} />
      </CardBody>
      <FooterAcceptCancel onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
