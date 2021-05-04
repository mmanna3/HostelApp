import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  rows: number;
  placeholder: string;
}

export default function Textarea({ name, rows, placeholder }: IProps): ReactElement {
  const { register } = useFormContext();

  return <textarea {...register(name)} className="textarea" name={name} rows={rows} placeholder={placeholder}></textarea>;
}
