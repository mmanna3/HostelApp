import React, { ReactElement, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface IProps {
  defaultValues: any;
  children: ReactNode;
  onSubmit: (data: any) => void;
  resetOnChanged: number;
}

export default function Form({
  defaultValues,
  children,
  onSubmit,
  resetOnChanged,
  ...otrosAtributos
}: IProps): ReactElement {
  const methods = useForm({ defaultValues });

  useEffect((): void => {
    methods.reset();
    // eslint-disable-next-line
  }, [resetOnChanged, methods.reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...otrosAtributos}>
        {children}
      </form>
    </FormProvider>
  );
}
