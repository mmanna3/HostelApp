import { Input } from 'components/Input';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import React, { ReactElement } from 'react';
// import Estilos from './HacerCheckIn.module.scss';

interface IProps {
  esVisible: boolean;
  ocultar: () => void;
}

const HacerCheckIn = ({ esVisible, ocultar }: IProps): ReactElement => {
  return (
    <ModalForm isVisible={esVisible} onHide={ocultar} onSubmit={(): void => {}} minWidth="900px">
      <Header title="Hacer Check-In" onHide={ocultar} />
      <CardBody minHeight="460px">
        {/* <ValidationSummary errors={errores} /> */}

        <Input name="cantidadDePasajeros" type="number" />
        {/* <DatosDelHuesped /> */}
      </CardBody>
      {/* <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} /> */}
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={false} />
    </ModalForm>
  );
};

export default HacerCheckIn;
