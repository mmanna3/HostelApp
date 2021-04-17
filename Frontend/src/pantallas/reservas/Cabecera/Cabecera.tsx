import { Button } from 'components/botones/botones';
import SelectorDeFecha from 'components/selectorDeFecha/selectorDeFecha';
import React, { ReactElement, useState } from 'react';
import Estilos from './Cabecera.module.scss';

interface IProps {
  showModal: () => void;
}

const Cabecera = ({ showModal }: IProps): ReactElement => {
  const [fechaInicio, modificarFechaInicio] = useState<Date[] | Date>(new Date());

  const invocarApi = (dias: number): void => {
    console.log(dias);
    console.log(fechaInicio);
  };

  const seleccionarSemana = (): void => {
    invocarApi(7);
  };
  const seleccionarDosSemanas = (): void => {
    invocarApi(14);
  };
  const seleccionarMes = (): void => {
    invocarApi(28);
  };

  return (
    <div className="level container">
      <div className="level-left">
        <div className={`buttons has-addons ${Estilos.botones}`}>
          <Button onClick={(): void => seleccionarSemana()} text="Semana" className="button is-selected" />
          <Button onClick={(): void => seleccionarDosSemanas()} text="Dos semanas" className="button" />
          <Button onClick={(): void => seleccionarMes()} text="Mes" className="button" />
        </div>
        <div>
          <SelectorDeFecha onChange={modificarFechaInicio} value={fechaInicio} />
        </div>
      </div>
      <div className="level-right">
        <Button onClick={showModal} text="Cargar nueva" />
      </div>
    </div>
  );
};

export default Cabecera;
