import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register?: () => any;
  name?: string;
  children: ReactElement | ReactElement[];
  onChange?: (e: any) => any;
  ccsClass?: string;
}

interface IConLabelProps extends IProps {
  label: string;
}

export default function Select({
  name = '',
  children = [],
  onChange = (): any => {},
  ccsClass = '',
  ...otrosAtributos
}: IProps): ReactElement {
  const { register } = useFormContext();

  return (
    <div className={`select ${ccsClass}`}>
      <select {...register(name)} onChange={onChange} {...otrosAtributos}>
        {children}
      </select>
    </div>
  );
}

export function SelectConLabelInline({
  register,
  name,
  children,
  onChange,
  ccsClass,
  label,
  ...otrosAtributos
}: IConLabelProps): ReactElement {
  return (
    <div className="field">
      <label style={{ marginBottom: '1em' }}>
        <span style={{ fontWeight: 'bold', marginRight: '1em', top: '7px', position: 'relative' }}>{label}</span>
        <Select
          register={register}
          name={name}
          children={children}
          onChange={onChange}
          ccsClass={ccsClass}
          {...otrosAtributos}
        ></Select>
      </label>
    </div>
  );
}
