import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import ValidationSummary from 'components/ValidationSummary';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'store/api/api';
import { ReservaCreacionDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import DatosDelPasajero from './DatosDelPasajero/DatosDelPasajero';
import DatosGenerales from './DatosGenerales/DatosGenerales';
import Renglones, { RenglonesParaReservaDTO } from './Renglones/Renglones';

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
  const [renglonesParaPost, modificarRenglonesParaPost] = useState<RenglonesParaReservaDTO>({
    camasIds: [],
    habitacionesPrivadasIds: [],
  });
  const dispatch = useDispatch();

  function onSuccess(): void {
    reiniciarDatosGenerales();
    onSuccessfulSubmit();
    reiniciarModal();
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.reiniciar());
  }

  interface ReservaDTOYPropsIgnoradas extends ReservaCreacionDTO {
    ignorarCamasIds?: string[];
    ignorarHabitacion?: string[];
    ignorarHabitacionesPrivadasIds?: string[];
  }

  const onSubmit = (data: ReservaDTOYPropsIgnoradas): void => {
    let nuevaData = data;

    nuevaData.camasIds = renglonesParaPost.camasIds;
    nuevaData.habitacionesPrivadasIds = renglonesParaPost.habitacionesPrivadasIds;

    delete nuevaData.ignorarCamasIds;
    delete nuevaData.ignorarHabitacion;
    delete nuevaData.ignorarHabitacionesPrivadasIds;

    dispatch(api.reservas.crear.invocar(nuevaData, onSuccess));
  };

  const listarConLugaresLibresRequest = api.habitaciones.listarConLugaresLibres;

  function ocultar(): void {
    onHide();
    dispatch(reiniciar());
    reiniciarModal();
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.reiniciar());
  }

  const onDesdeHastaChange = useCallback(
    (desde: string, hasta: string): void => {
      dispatch(listarConLugaresLibresRequest.invocar({ desde: desde, hasta: hasta }));
    },
    [listarConLugaresLibresRequest, dispatch]
  );

  // Todo esto a customHook
  const [datosDelPasajeroKey, reiniciarDatosDelPasajero] = useCounterKey(1000);
  const { datos: pasajero, estado: estadoPasajero } = useSelector(api.pasajeros.obtenerPorDniOPasaporte.selector);
  useEffect((): void => {
    if (estadoPasajero === EstadosApiRequestEnum.exitoso && pasajero != null)
      toast('El huésped está registrado. De ser necesario, podés editar sus datos.', {
        type: toast.TYPE.SUCCESS,
        toastId: `toast-exito-${pasajero.dniOPasaporte}`,
      });
    else if (estadoPasajero === EstadosApiRequestEnum.huboError)
      toast('El huésped no está registrado. Llená sus datos para registrarlo.', {
        type: toast.TYPE.ERROR,
        toastId: `toast-error`,
      });
  }, [estadoPasajero, pasajero]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    reiniciarDatosDelPasajero();
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };
  // Hasta acá

  return (
    <ModalForm isVisible={isVisible} onHide={ocultar} onSubmit={onSubmit} minWidth="900px" key={modalKey}>
      <Header title="Nueva reserva" onHide={ocultar} />
      <CardBody minHeight="460px">
        <ValidationSummary errors={errores} />

        <DatosGenerales onDesdeHastaChange={onDesdeHastaChange} key={datosGeneralesKey} />

        <LineaDivisoria texto="PASAJERO TITULAR" style={{ marginTop: '-8px' }} />

        <DatosDelPasajero
          key={datosDelPasajeroKey}
          pasajero={pasajero}
          name="PasajeroTitular"
          buscarDniOPasaporte={buscarDniOPasaporte}
        />

        <LineaDivisoria texto="HABITACIONES Y CAMAS" />

        <Renglones modificarRenglonesParaPost={modificarRenglonesParaPost} />
      </CardBody>
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
