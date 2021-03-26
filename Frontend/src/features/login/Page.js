import React from 'react';
import Form from 'components/Form';
import { Input } from 'components/Input';
import ValidationSummary from 'components/ValidationSummary';
import { SubmitButton } from 'components/botones/botones';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Page.module.scss';
import { useHistory } from 'react-router-dom';
import { siEstaLogueadoEnviarTokenEnTodosLosRequests } from 'features/login/servicio';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { actualizarUsuarioEnLocalStorage } from './servicio';

const LoginPage = () => {
  const { errores, estado } = useSelector(api.usuarios.autenticar.selector);
  const dispatch = useDispatch();
  let history = useHistory();

  function onSuccess(response) {
    actualizarUsuarioEnLocalStorage(response);
    siEstaLogueadoEnviarTokenEnTodosLosRequests();
    history.push('/reservas');
  }

  const onSubmit = data => dispatch(api.usuarios.autenticar.invocar(data, onSuccess));

  return (
    <div className={`columns is-gapless is-desktop ${styles.columns}`}>
      <div className="column is-flex is-hidden-mobile has-background-primary">
        {/* <h1 className="title is-1 has-text-white">SEPA </h1> */}
      </div>
      <div className="column is-flex is-vcentered is-centered">
        <Form onSubmit={onSubmit} className={`login-form ${styles.loginForm}`}>
          <ValidationSummary errors={errores} />
          <Input label="Usuario" name="username" />
          <Input type="password" label="Contraseña" name="password" />
          <SubmitButton text="Ingresar" loading={estado === EstadosApiRequestEnum.cargando}></SubmitButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
