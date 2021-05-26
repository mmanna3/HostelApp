import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Boton } from './botones/botones';

interface InputProps {
  label?: string;
  faIconCode?: IconProp;
  textoDelBoton?: string;
  onButtonClick?: (valor: string) => any;
  botonCargando?: boolean;
  handleOnChange?: (e: any) => void;
  defaultValue?: string | number;
  placeholder?: string;
  style?: object;
  name: string;
  type?: string;
  readOnly?: boolean;
  step?: string;
  dataCy?: string;
}

export function Input({
  type = 'text',
  label,
  faIconCode,
  name,
  textoDelBoton,
  onButtonClick,
  botonCargando,
  defaultValue,
  placeholder,
  style,
  readOnly,
  step,
  dataCy,
  handleOnChange = (): void => {},
}: InputProps): ReactElement {
  const { setValue } = useFormContext();

  useEffect((): void => {
    setTimeout((): void => {
      setValue(name, defaultValue);
    }, 100);
  }, [defaultValue, setValue, name]);

  return (
    <Controller
      name={name}
      render={({ field }): ReactElement => (
        <div className={`field ${textoDelBoton ? 'has-addons' : ''}`}>
          {label && <label className="label">{label}</label>}
          <div className={`control ${faIconCode ? 'has-icons-left' : ''} `}>
            <input
              {...field}
              data-cy={dataCy}
              value={field.value || ''} // así React sabe que el input es Controlled
              onChange={(e: any): void => {
                field.onChange(e);
                handleOnChange(e);
              }}
              className="input"
              style={style}
              readOnly={readOnly}
              type={type}
              placeholder={placeholder}
              step={step}
            />
            {faIconCode && (
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faIconCode} />
              </span>
            )}
          </div>
          {onButtonClick && textoDelBoton && (
            <div className="control">
              <Boton
                dataCy={'boton-' + dataCy}
                cargando={botonCargando}
                texto={textoDelBoton}
                onClick={(): void => onButtonClick(field.value)}
              />
            </div>
          )}
        </div>
      )}
    />
  );
}
