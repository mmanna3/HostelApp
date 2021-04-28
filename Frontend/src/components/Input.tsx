import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { Button } from './botones/botones';

interface InputProps extends InputWithoutLabelProps {
  label?: string;
  faIconCode?: IconProp;
}

interface InputConBotonProps extends InputProps {
  textoDelBoton: string;
  onClick: (valor: string) => any;
}

interface InputWithoutLabelProps {
  register?: () => any;
  name: string;
  type?: string;
  [otrosAtributos: string]: any;
}

export function Input({
  register = (): void => {},
  type = 'text',
  label,
  faIconCode,
  name,
  ...otrosAtributos
}: InputProps): ReactElement {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={`control ${faIconCode ? 'has-icons-left' : ''}`}>
        <input className="input" name={name} type={type} ref={register} {...otrosAtributos} />
        {faIconCode && (
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faIconCode} />
          </span>
        )}
      </div>
    </div>
  );
}

export function InputConBoton({
  register = (): void => {},
  label = '',
  name,
  textoDelBoton,
  onClick,
  type,
  ...otrosAtributos
}: InputConBotonProps): ReactElement {
  const [valor, actualizarValor] = React.useState('');

  return (
    <>
      <label className="label">{label}</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type={type}
            name={name}
            ref={register}
            defaultValue={valor}
            onChange={(e: any): void => {
              actualizarValor(e.target.value);
            }}
            {...otrosAtributos}
          />
        </div>
        <div className="control">
          <Button text={textoDelBoton} onClick={(): void => onClick(valor)} />
        </div>
      </div>
    </>
  );
}

export function InputWithoutLabel({ register, name, ...otrosAtributos }: InputWithoutLabelProps): ReactElement {
  return <input className="input" name={name} ref={register} {...otrosAtributos} />;
}
