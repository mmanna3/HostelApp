import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

interface IProps {
  opciones: ILabelValue[];
  opcionInicial: ILabelValue;
  name: string;
  placeholder: string;
  register?: () => any;
}

export interface ILabelValue {
  value: string;
  label: string;
}

export const Autocomplete = ({ opciones, opcionInicial, name, placeholder }: IProps): ReactElement => {
  const [valor, actualizarValor] = useState<ILabelValue>(opcionInicial);
  const { setValue } = useFormContext();

  useEffect((): void => {
    setTimeout((): void => {
      setValue(name, valor.value);
    }, 500);
  });

  return (
    <Controller
      name={name}
      defaultValue={opcionInicial}
      render={({ field }): ReactElement => (
        <Select
          options={opciones}
          {...field}
          value={opciones.find((c): boolean => c.value === field.value)}
          onChange={(val): void => {
            field.onChange(val?.value);
            actualizarValor(val);
          }}
          placeholder={placeholder}
          defaultValue={field.value}
        />
      )}
    />
  );
};
