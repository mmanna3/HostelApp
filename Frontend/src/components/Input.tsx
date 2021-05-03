import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
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
  const [valor, actualizarValor] = React.useState('');
  const { onChange, ref, onBlur } = useFormContext().register(name);

  // useEffect((): void => {
  //   handleOnChange(valor);
  // }, [valor]);

  return (
    <div className={`field ${textoDelBoton ? 'has-addons' : ''}`}>
      {label && <label className="label">{label}</label>}
      <div className={`control ${faIconCode ? 'has-icons-left' : ''} `}>
        <input
          defaultValue={defaultValue}
          style={style}
          className="input"
          type={type}
          name={name}
          ref={ref}
          onBlur={onBlur}
          onChange={(e: any): void => {
            actualizarValor(e.target.value);
            onChange(e);
            handleOnChange(e.target.value);
          }}
          placeholder={placeholder}
        />
        {faIconCode && (
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faIconCode} />
          </span>
        )}
      </div>
      {onButtonClick && (
        <div className="control">
          <Button text={textoDelBoton} onClick={(): void => onButtonClick(valor)} />
        </div>
      )}
    </div>
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
