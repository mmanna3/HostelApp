import React, { ReactElement, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface IProps {
  defaultValues: any;
  children: ReactNode;
  onSubmit: (data: any) => void;
}

export default function Form({ defaultValues, children, onSubmit, ...otrosAtributos }: IProps): ReactElement {
  const methods = useForm({ defaultValues });

  useEffect((): void => {
    methods.reset();
    // eslint-disable-next-line
  }, [methods.reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...otrosAtributos}>
        {children}
      </form>
    </FormProvider>
  );
}
