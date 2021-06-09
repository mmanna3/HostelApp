import { Input } from 'components/Input';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal/Modal';
import ValidationSummary from 'components/ValidationSummary';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }) => {
  const { errores, estado } = useSelector(api.pasajeros.crear.selector);
  const [modalKey, reiniciarModal] = useCounterKey();

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(api.pasajeros.crear.invocar(data, onSuccess));

  function onSuccess() {
    onSuccessfulSubmit();
    reiniciarModal();
  }

  function hide() {
    onHide();
    reiniciarModal();
    dispatch(api.pasajeros.crear.reiniciar());
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} key={modalKey}>
      <Header title="Alta de huésped" onHide={hide} />
      <CardBody>
        <ValidationSummary errors={errores} />
        <Input label="Nombre" name="nombre" />
      </CardBody>
      <FooterAcceptCancel onCancel={hide} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
