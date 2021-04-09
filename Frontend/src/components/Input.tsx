import React, { ReactElement } from 'react';

interface InputProps extends InputWithoutLabelProps {
  label?: string;
}

interface InputWithoutLabelProps {
  register?: () => any;
  name: string;
  [otrosAtributos: string]: any;
}

export function Input({ register = (): void => {}, label = '', name, ...otrosAtributos }: InputProps): ReactElement {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" name={name} ref={register} {...otrosAtributos} />
      </div>
    </div>
  );
}

export function InputWithoutLabel({ register, name, ...otrosAtributos }: InputWithoutLabelProps): ReactElement {
  return <input className="input" name={name} ref={register} {...otrosAtributos} />;
}

export function NumericInput({ register, label, name, ...otrosAtributos }: InputProps): ReactElement {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" name={name} ref={register} {...otrosAtributos} type="number" />
      </div>
    </div>
  );
}
