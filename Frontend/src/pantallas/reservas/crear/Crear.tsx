import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import ValidationSummary from 'components/ValidationSummary';
import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import DatosDelHuesped from './DatosDelHuesped/DatosDelHuesped';
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
    dispatch(api.huespedes.obtenerPorDniOPasaporte.reiniciar());
  }

  // const onSubmit = (data: ReservaDTO): void => dispatch(api.reservas.crear.invocar(data, onSuccess));

  const onSubmit = (data: ReservaDTO): void => {
    let nuevaData = data;

    nuevaData.camasIds = renglonesParaPost.camasIds;
    nuevaData.habitacionesPrivadasIds = renglonesParaPost.habitacionesPrivadasIds;

    dispatch(api.reservas.crear.invocar(nuevaData, onSuccess));
  };

  const listarConLugaresLibresRequest = api.habitaciones.listarConLugaresLibres;

  function ocultar(): void {
    onHide();
    dispatch(reiniciar());
    reiniciarModal();
    dispatch(api.huespedes.obtenerPorDniOPasaporte.reiniciar());
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

        <Renglones modificarRenglonesParaPost={modificarRenglonesParaPost} />
      </CardBody>
      <FooterAcceptCancel onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
