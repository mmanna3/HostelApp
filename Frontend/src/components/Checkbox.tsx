import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label: string;
}

export default function Checkbox({ name, label }: IProps): ReactElement {
  const { register } = useFormContext();

  return (
    <div className="field" style={{ position: 'relative', top: '10px' }}>
      <input
        {...register(name)}
        className="is-checkradio has-background-color is-rtl"
        id={name}
        type="checkbox"
        name={name}
      />
      <label style={{ fontWeight: 'bold', marginLeft: '0' }} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
