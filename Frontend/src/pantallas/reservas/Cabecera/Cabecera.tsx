import { Button } from 'components/botones/botones';
import SelectorDeFecha from 'components/selectorDeFecha/selectorDeFecha';
import React, { ReactElement, useEffect, useState } from 'react';
import { convertirAString } from 'utils/Fecha';
import Estilos from './Cabecera.module.scss';

interface IProps {
  showModal: () => void;
  onFechaChange: (primeraNoche: string, dias: number) => void;
}

const Cabecera = ({ showModal, onFechaChange }: IProps): ReactElement => {
  const [fechaInicio, modificarFechaInicio] = useState<Date[] | Date>(new Date());
  const [dias, modificarDias] = useState(14);
  const [estiloBotonSemana, modificarEstiloBotonSemana] = useState('');
  const [estiloBotonDosSemanas, modificarEstiloBotonDosSemanas] = useState('is-primary is-selected');
  const [estiloBotonMes, modificarEstiloBotonMes] = useState('');

  const onDatosChange = (): void => {
    var fecha: Date;

    if (Array.isArray(fechaInicio)) fecha = fechaInicio[0];
    else fecha = fechaInicio;

    onFechaChange(convertirAString(fecha), dias);
  };

  useEffect((): void => {
    onDatosChange();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): void => {
    onDatosChange();
  }, [dias, fechaInicio]); // eslint-disable-line react-hooks/exhaustive-deps

  const seleccionarSemana = (): void => {
    modificarDias(7);
    modificarEstiloBotonSemana('is-primary is-selected');
    modificarEstiloBotonDosSemanas('');
    modificarEstiloBotonMes('');
  };
  const seleccionarDosSemanas = (): void => {
    modificarDias(14);
    modificarEstiloBotonSemana('');
    modificarEstiloBotonDosSemanas('is-primary is-selected');
    modificarEstiloBotonMes('');
  };
  const seleccionarMes = (): void => {
    modificarDias(28);
    modificarEstiloBotonSemana('');
    modificarEstiloBotonDosSemanas('');
    modificarEstiloBotonMes('is-primary is-selected');
  };

  const onFechaDeSelectorChange = (nuevaFecha: Date | Date[]): void => {
    modificarFechaInicio(nuevaFecha);
  };

  return (
    <div className="level container">
      <div className="level-left">
        <div className={`buttons has-addons ${Estilos.botones}`}>
          <Button onClick={(): void => seleccionarSemana()} text="Semana" className={`button ${estiloBotonSemana}`} />
          <Button
            onClick={(): void => seleccionarDosSemanas()}
            text="Dos semanas"
            className={`button ${estiloBotonDosSemanas}`}
          />
          <Button onClick={(): void => seleccionarMes()} text="Mes" className={`button ${estiloBotonMes}`} />
        </div>
        <div>
          <SelectorDeFecha onChange={onFechaDeSelectorChange} value={fechaInicio} />
        </div>
      </div>
      <div className="level-right">
        <Button onClick={showModal} text="Nueva reserva" />
      </div>
    </div>
  );
};

export default Cabecera;
