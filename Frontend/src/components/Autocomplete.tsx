import { CSSObject } from '@emotion/serialize';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { components, ControlProps } from 'react-select';
import { Icon } from './Icon';

interface IProps {
  opciones: ILabelValue[];
  opcionInicial: ILabelValue;
  name: string;
  placeholder: string;
  register?: () => any;
  icono?: IconProp;
}

export interface ILabelValue {
  value: string;
  label: string;
}

export const Autocomplete = ({ opciones, opcionInicial, name, placeholder, icono }: IProps): ReactElement => {
  const [valor, actualizarValor] = useState<ILabelValue>(opcionInicial);
  const { setValue } = useFormContext();

  useEffect((): void => {
    setTimeout((): void => {
      setValue(name, valor.value);
    }, 500);
  });

  const ValueContainer = ({ children, ...props }: any): any => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && icono && <Icon faCode={icono} style={{ position: 'absolute', left: 8 }} />}
          {children}
        </components.ValueContainer>
      )
    );
  };

  const styles = {
    valueContainer: (base: CSSObject): CSSObject =>
      icono
        ? {
            ...base,
            paddingLeft: 38,
          }
        : base,
    control: (base: CSSObject, state: ControlProps<any, any, any>): CSSObject => ({
      ...base,
      borderColor: state.isFocused ? '#3260a8' : '#dbdbdb',
      boxShadow: '0 !important',
      color: state.isFocused ? '#3260a8' : '#222',
      '&:hover': {
        borderColor: state.isFocused ? '#3260a8' : 'hsl(0, 0%, 71%)',
        color: state.isFocused ? '#3260a8' : '#222',
      },
    }),
    dropdownIndicator: (base: CSSObject): CSSObject => ({
      ...base,
      color: 'inherit',
    }),
    // singleValue: (base: CSSObject): CSSObject => ({
    //   ...base,
    //   color: 'inherit',
    // }),
  };

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
          components={{ ValueContainer }}
          styles={styles}
          // theme={(theme: Theme): Theme => ({
          //   ...theme,
          //   colors: {
          //     ...theme.colors,
          //     primary: '#3260a8',
          //   },
          // })}
        />
      )}
    />
  );
};
