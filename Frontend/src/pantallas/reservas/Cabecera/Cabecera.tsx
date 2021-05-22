import { Boton } from 'components/botones/botones';
import SelectorDeFecha from 'components/selectorDeFecha/selectorDeFecha';
import React, { ReactElement, useEffect, useState } from 'react';
import { convertirAString, hoy, sumarDiasALaFecha } from 'utils/Fecha';
import Estilos from './Cabecera.module.scss';

interface IProps {
  showModal: () => void;
  onFechaChange: (primeraNoche: string, dias: number) => void;
}

const Cabecera = ({ showModal, onFechaChange }: IProps): ReactElement => {
  const [fechaInicio, modificarFechaInicio] = useState<Date[] | Date>(sumarDiasALaFecha(hoy(), -1));
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

  const seleccionarHoy = (): void => {
    modificarFechaInicio(sumarDiasALaFecha(hoy(), -1));
  };

  const onFechaDeSelectorChange = (nuevaFecha: Date | Date[]): void => {
    modificarFechaInicio(nuevaFecha);
  };

  return (
    <div className={Estilos.contenedor}>
      <div className="level-left">
        <div className={`buttons has-addons ${Estilos.botones}`}>
          <Boton onClick={(): void => seleccionarSemana()} texto="Semana" className={estiloBotonSemana} />
          <Boton onClick={(): void => seleccionarDosSemanas()} texto="Dos semanas" className={estiloBotonDosSemanas} />
          <Boton onClick={(): void => seleccionarMes()} texto="Mes" className={estiloBotonMes} />
        </div>
        <div className={Estilos.selectorDeFechaContenedor}>
          <SelectorDeFecha onChange={onFechaDeSelectorChange} value={fechaInicio} />
        </div>
        <div>
          <Boton onClick={(): void => seleccionarHoy()} texto="Hoy" className="is-success" />
        </div>
      </div>
      <div className="level-right">
        <Boton onClick={showModal} texto="Nueva reserva" />
      </div>
    </div>
  );
};

export default Cabecera;
