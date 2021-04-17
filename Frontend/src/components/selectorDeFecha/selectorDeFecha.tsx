import React, { ReactElement } from 'react';
import { CalendarProps } from 'react-calendar';
import DatePicker from 'react-date-picker';
import Estilos from './selectorDeFecha.module.scss';

const SelectorDeFecha = ({ value, onChange }: CalendarProps): ReactElement => {
  return (
    <DatePicker
      onChange={onChange}
      value={value}
      className={Estilos.selectorDeFecha}
      calendarClassName={Estilos.calendario}
      clearAriaLabel="Reiniciar"
    />
  );
};

export default SelectorDeFecha;
