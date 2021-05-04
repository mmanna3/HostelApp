import Label from 'components/Label';
import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label: string;
}

export default function SiNo({ name, label }: IProps): ReactElement {
  const { register } = useFormContext();

  return (
    <div className="field">
      <Label text={label} />
      <input className="is-checkradio" id={`${name}1`} value="true" {...register(name)} type="radio" name={name} />
      <label style={{ marginLeft: '0' }} htmlFor={`${name}1`}>
        Sí
      </label>

      <input
        className="is-checkradio"
        id={`${name}2`}
        value="false"
        {...register(name)}
        type="radio"
        name={name}
        defaultChecked={true}
      />
      <label style={{ marginLeft: '0' }} htmlFor={`${name}2`}>
        No
      </label>
    </div>
  );
}
