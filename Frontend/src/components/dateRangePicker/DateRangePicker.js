import React from 'react';
import { Input } from 'components/Input';
import Styles from './DateRangePicker.module.scss';
import Drp from '@wojtekmaj/react-daterange-picker';
import { convertirAString } from 'utils/Fecha';

const DateRangePicker = ({ valor, etiqueta, actualizarValor, desdeName, hastaName }) => {
  return (
    <div className="field">
      <label className="label">{etiqueta ? etiqueta : 'Desde - Hasta'}</label>
      <div className="control">
        <Drp
          onChange={actualizarValor}
          value={valor}
          className={Styles.dateRangePicker}
          calendarClassName={Styles.calendar}
          clearAriaLabel="Reiniciar"
          minDate={new Date()}
        />
      </div>
      <Input style={{ display: 'none' }} name={desdeName} defaultValue={convertirAString(valor[0])} />
      <Input style={{ display: 'none' }} name={hastaName} defaultValue={convertirAString(valor[1])} />
    </div>
  );
};

export default DateRangePicker;
