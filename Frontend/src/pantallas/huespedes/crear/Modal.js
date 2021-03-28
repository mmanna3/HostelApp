import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from 'components/Input';
import ValidationSummary from 'components/ValidationSummary';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }) => {
  const { errores, estado } = useSelector(api.huespedes.crear.selector);
  const [resetOnChanged, resetForm] = React.useState(0);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(api.huespedes.crear.invocar(data, onSuccess));

  function onSuccess() {
    onSuccessfulSubmit();
    resetForm(resetOnChanged + 1);
  }

  function hide() {
    onHide();
    dispatch(api.huespedes.crear.reiniciar());
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} resetOnChanged={resetOnChanged}>
      <Header title="Alta de huésped" onHide={hide} />
      <Body>
        <ValidationSummary errors={errores} />
        <Input label="Nombre" name="nombre" />
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
