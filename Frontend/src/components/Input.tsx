import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from './botones/botones';

interface InputProps extends InputWithoutLabelProps {
  label?: string;
  faIconCode?: IconProp;
  textoDelBoton?: string;
  onButtonClick?: (valor: string) => any;
  handleOnChange?: (e: any) => void;
  defaultValue?: string | number;
  placeholder?: string;
  style?: object;
}

interface InputConBotonProps extends InputProps {
  textoDelBoton: string;
  onClick: (valor: string) => any;
}

interface InputWithoutLabelProps {
  name: string;
  type?: string;
  [otrosAtributos: string]: any;
}

export function Input({
  type = 'text',
  label,
  faIconCode,
  name,
  textoDelBoton,
  onButtonClick,
  defaultValue,
  placeholder,
  style,
  handleOnChange = () => {},
}: InputProps): ReactElement {
  const { setValue, getValues } = useFormContext();

  useEffect((): void => {
    if (!getValues(name)) setValue(name, defaultValue);
  });

  return (
    <Controller
      name={name}
      render={({ field }): ReactElement => (
        <div className={`field ${textoDelBoton ? 'has-addons' : ''}`}>
          {label && <label className="label">{label}</label>}
          <div className={`control ${faIconCode ? 'has-icons-left' : ''} `}>
            <input style={style} className="input" type={type} {...field} placeholder={placeholder} />
            {faIconCode && (
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faIconCode} />
              </span>
            )}
          </div>
          {onButtonClick && (
            <div className="control">
              <Button text={textoDelBoton} onClick={(): void => onButtonClick(field.value)} />
            </div>
          )}
        </div>
      )}
    />
  );
}

export function InputConBoton({
  label = '',
  name,
  textoDelBoton,
  onClick,
  type,
  handleOnChange = () => {},
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
            defaultValue={valor}
            onChange={(e: any): void => {
              actualizarValor(e.target.value);
              handleOnChange(e);
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

export function InputWithoutLabel({ name, ...otrosAtributos }: InputWithoutLabelProps): ReactElement {
  return <input className="input" name={name} {...otrosAtributos} />;
}
