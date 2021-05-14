import { Autocomplete } from 'components/Autocomplete';
import DateRangePicker from 'components/dateRangePicker/DateRangePicker';
import { Input } from 'components/Input';
import React, { ReactElement, useEffect, useState } from 'react';
import { convertirAString, hoy, maniana, restarFechas } from 'utils/Fecha';
import Estilos from './DatosGenerales.module.scss';

interface IProps {
  onDesdeHastaChange: (desde: string, hasta: string) => void;
}

const DatosGenerales = ({ onDesdeHastaChange }: IProps): ReactElement => {
  const [desdeHasta, actualizarDesdeHasta] = useState([hoy(), maniana()]);
  const [cantidadDeNoches, actualizarCantidadDeNoches] = useState(1);

  useEffect((): void => {
    function restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento(): Date {
      let milisegundosDeUnDia = 24 * 60 * 60 * 1000 * 1;
      let resultado = new Date(desdeHasta[1]);
      resultado.setTime(resultado.getTime() - milisegundosDeUnDia);
      return resultado;
    }

    let hasta = restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento();
    onDesdeHastaChange(convertirAString(desdeHasta[0]), convertirAString(hasta));

    actualizarCantidadDeNoches(restarFechas(desdeHasta[1], desdeHasta[0]));
  }, [desdeHasta, onDesdeHastaChange]);

  const canales = [
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Booking', value: 'Booking' },
    { label: 'Hostelworld', value: 'Hostelworld' },
  ];

  return (
    <div className="columns">
      <div className="column">
        <DateRangePicker
          actualizarValor={actualizarDesdeHasta}
          etiqueta="Check in - Check out"
          valor={desdeHasta}
          desdeName="diaDeCheckin"
          hastaName="diaDeCheckout"
        />
        <p className={Estilos.noches}>
          <strong>Noches: </strong>
          {cantidadDeNoches}
        </p>
      </div>
      <div className="column is-narrow">
        <Input
          label="Nº de pasajeros"
          name="cantidadDePasajeros"
          style={{ width: '117px' }}
          type="number"
          defaultValue={1}
        />
      </div>
      <div className="column is-narrow">
        <Input label="Hora de llegada" name="horaEstimadaDeLlegada" defaultValue="11:00" step="1800" type="time" />
      </div>
      <div className="column">
        <Autocomplete label="Canal" name="canal" opciones={canales} opcionInicial={canales[0]} />
      </div>
    </div>
  );
};

export default DatosGenerales;
