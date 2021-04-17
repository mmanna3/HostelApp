import { Button } from 'components/botones/botones';
import React, { ReactElement, useState } from 'react';
import DatePicker from 'react-date-picker';
import Estilos from './Cabecera.module.scss';

interface IProps {
  showModal: () => void;
}

const Cabecera = ({ showModal }: IProps): ReactElement => {
  const [value, onChange] = useState<Date[] | Date>(new Date());

  const seleccionarSemana = (): void => {};
  const seleccionarDosSemanas = (): void => {};
  const seleccionarMes = (): void => {};

  return (
    <div className="level container">
      <div className="level-left">
        <div className={`buttons has-addons ${Estilos.botones}`}>
          <Button onClick={(): void => seleccionarSemana()} text="Semana" className="button is-selected" />
          <Button onClick={(): void => seleccionarDosSemanas()} text="Dos semanas" className="button" />
          <Button onClick={(): void => seleccionarMes()} text="Mes" className="button" />
        </div>
        <div className="control">
          <DatePicker
            onChange={onChange}
            value={value}
            className={Estilos.selectorDeFecha}
            calendarClassName={Estilos.calendario}
            clearAriaLabel="Reiniciar"
          />
        </div>
      </div>
      <div className="level-right">
        <Button onClick={showModal} text="Cargar nueva" />
      </div>
    </div>
  );
};

export default Cabecera;
