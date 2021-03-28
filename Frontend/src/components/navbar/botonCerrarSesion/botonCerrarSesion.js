import React from 'react';
import { eliminarUsuarioDeLocalStorage } from 'pantallas/login/servicio';

const BotonCerrarSesion = () => {
  function onClick() {
    eliminarUsuarioDeLocalStorage();
  }

  return (
    <>
      <a className="button is-primary is-hidden-touch is-inverted is-outlined" onClick={onClick} href="/">
        Cerrar sesión
      </a>
      <a className="button is-primary is-hidden-desktop" onClick={onClick} href="/">
        Cerrar sesión
      </a>
    </>
  );
};

export default BotonCerrarSesion;
