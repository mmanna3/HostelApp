import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from './botones/botones';

interface InputProps {
  label?: string;
  faIconCode?: IconProp;
  textoDelBoton?: string;
  onButtonClick?: (valor: string) => any;
  handleOnChange?: (e: any) => void;
  defaultValue?: string | number;
  placeholder?: string;
  style?: object;
  name: string;
  type?: string;
  readOnly?: boolean;
  step?: string;
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
  readOnly,
  step,
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
            <input style={style} readOnly={readOnly} className="input" type={type} {...field} placeholder={placeholder} />
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
