import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

interface IProps {
  opciones: ILabelValue[];
  opcionInicialIndex: number;
  name: string;
  placeholder: string;
  register?: () => any;
}

export interface ILabelValue {
  value: string;
  label: string;
}

export const Autocomplete = ({ opciones, name, placeholder }: IProps): ReactElement => {
  return (
    <Controller
      name={name}
      render={({ field }): ReactElement => (
        <Select
          options={opciones}
          {...field}
          value={opciones.find((c): boolean => c.value === field.value)}
          onChange={(val): void => field.onChange(val?.value)}
          placeholder={placeholder}
        />
      )}
    />
  );
};
