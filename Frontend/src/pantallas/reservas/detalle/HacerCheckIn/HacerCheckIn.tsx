import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import React, { ReactElement } from 'react';
import { ReservaDetalleDTO } from 'store/api/DTOs';
// import Estilos from './HacerCheckIn.module.scss';

interface IProps {
  esVisible: boolean;
  ocultar: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckIn = ({ esVisible, ocultar, datos }: IProps): ReactElement => {
  return (
    <ModalForm isVisible={esVisible} onHide={ocultar} onSubmit={(): void => {}} minWidth="900px">
      <Header title="Hacer Check-In" onHide={ocultar} />
      <CardBody minHeight="460px">
        {/* <ValidationSummary errors={errores} /> */}

        {/* <LineaDivisoria texto="TITULAR DE LA RESERVA" />
        <DatosDelHuesped huesped={datos.datosMinimosDeHuesped} />

        {[...Array(datos.cantidadDePasajeros - 1)].map(
          (_e, i): ReactElement => (
            <>
              <LineaDivisoria texto={`PASAJERO ${i + 2}`} />
              <DatosDelHuesped key={i} />
            </>
          )
        )} */}
      </CardBody>
      {/* <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} /> */}
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={false} />
    </ModalForm>
  );
};

export default HacerCheckIn;
