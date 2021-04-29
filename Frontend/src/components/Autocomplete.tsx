import React, { ReactElement } from 'react';
import Select from 'react-select';

export const Autocomplete = (): ReactElement => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return <Select options={options} />;
};
