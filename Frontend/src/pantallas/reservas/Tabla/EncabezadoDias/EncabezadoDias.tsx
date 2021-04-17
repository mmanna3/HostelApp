import React, { ReactElement } from 'react';
import { nombreAbreviadoDelDiaDeLaSemana, nombreAbreviadoDelMes } from 'utils/Fecha';
import { calcularDiasDeReservasVisibles } from '../utils/funcionesUtiles';
import Estilos from './EncabezadoDias.module.scss';

interface IParams {
  fechaDesde: string;
  fechaHasta: string;
}
const EncabezadoDias = ({ fechaDesde, fechaHasta }: IParams): ReactElement => {
  const dias = calcularDiasDeReservasVisibles(fechaDesde, fechaHasta);

  return (
    <thead className="is-bordered">
      <tr>
        <th className={Estilos.th}>
          <div className={Estilos.encabezado}>Habitación</div>
        </th>
        <th className={Estilos.th}>
          <div className={Estilos.encabezado}>Cama</div>
        </th>

        {dias.map(
          (fecha, i): ReactElement => (
            <th key={i} className={Estilos.th}>
              <div className={Estilos.encabezado}>
                <div className={Estilos.numero}>{fecha.getDate()}</div>
                <div className={Estilos.diaDeLaSemana}>{nombreAbreviadoDelDiaDeLaSemana(fecha)}</div>
                <div className={Estilos.mes}>{nombreAbreviadoDelMes(fecha)}</div>
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default EncabezadoDias;
