import React from 'react';
import Estilos from './botones.module.scss';

export function SubmitButton({ text, loading }) {
  if (!loading)
    return (
      <button className="button is-primary" type="submit">
        {text}
      </button>
    );
  else
    return (
      <button className="button is-primary is-loading" type="button">
        {text}
      </button>
    );
}

export function Button({ text, clases = '', dataCy = '', ...otrosAtributos }) {
  return (
    <button data-cy={dataCy} className={`button is-primary ${clases}`} type="button" {...otrosAtributos}>
      {text}
    </button>
  );
}

export function BotonSalir({ onClick }) {
  return <button className={`delete ${Estilos.botonSalir}`} type="button" aria-label="close" onClick={onClick}></button>;
}
