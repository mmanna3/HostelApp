import React, { ReactElement } from 'react';
import { Button } from './botones/botones';

interface InputProps extends InputWithoutLabelProps {
  label?: string;
}

interface InputConBotonProps extends InputProps {
  textoDelBoton: string;
  callback: (valor: string) => any;
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
  label = '',
  name,
  ...otrosAtributos
}: InputProps): ReactElement {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" name={name} type={type} ref={register} {...otrosAtributos} />
      </div>
    </div>
  );
}

export function InputConBoton({
  register = (): void => {},
  label = '',
  name,
  textoDelBoton,
  callback,
  type,
  ...otrosAtributos
}: InputConBotonProps): ReactElement {
  return (
    <>
      <label className="label">{label}</label>
      <div className="field has-addons">
        <div className="control">
          <input className="input" type={type} name={name} ref={register} {...otrosAtributos} />
        </div>
        <div className="control">
          <Button text={textoDelBoton} onClick={callback} />
        </div>
      </div>
    </>
  );
}

export function InputWithoutLabel({ register, name, ...otrosAtributos }: InputWithoutLabelProps): ReactElement {
  return <input className="input" name={name} ref={register} {...otrosAtributos} />;
}
