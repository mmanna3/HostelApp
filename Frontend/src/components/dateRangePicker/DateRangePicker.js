import Drp from '@wojtekmaj/react-daterange-picker';
import { Input } from 'components/Input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { convertirAString } from 'utils/Fecha';
import Styles from './DateRangePicker.module.scss';

// interface IProps {
//   valor: Date[];
//   etiqueta: string;
//   actualizarValor: (valor: Date[]) => void;
//   desdeName: string;
//   hastaName: string;
// }

const DateRangePicker = ({ valor, etiqueta, actualizarValor, desdeName, hastaName }) => {
  const { setValue } = useFormContext();

  return (
    <div className="field">
      <label className="label">{etiqueta ? etiqueta : 'Desde - Hasta'}</label>
      <div className="control">
        <Drp
          onChange={valor => {
            actualizarValor(valor);
            setValue(desdeName, convertirAString(valor[0]));
            setValue(hastaName, convertirAString(valor[1]));
          }}
          value={valor}
          className={Styles.dateRangePicker}
          calendarClassName={Styles.calendar}
          clearAriaLabel="Reiniciar"
          minDate={new Date()}
        />
      </div>
      <Input style={{ display: 'none' }} name={desdeName} />
      <Input style={{ display: 'none' }} name={hastaName} />
    </div>
  );
};

export default DateRangePicker;
