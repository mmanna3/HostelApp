import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import DatosDelHuesped from 'pantallas/reservas/crear/DatosDelHuesped/DatosDelHuesped';
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

        {/* <Input name="cantidadDePasajeros" type="number" /> */}
        <DatosDelHuesped huesped={datos.datosMinimosDeHuesped} />
      </CardBody>
      {/* <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} /> */}
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={false} />
    </ModalForm>
  );
};

export default HacerCheckIn;
