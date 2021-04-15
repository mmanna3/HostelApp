import React, { ReactElement } from 'react';
import Estilos from './EncabezadoDias.module.scss';
import { nombreAbreviadoDelMes, nombreAbreviadoDelDiaDeLaSemana } from 'utils/Fecha';
import { obtenerDias } from '../utils/funcionesUtiles';

interface IParams {
  fechaInicio: string;
  cantidadDeDias: number;
}
const EncabezadoDias = ({ fechaInicio, cantidadDeDias }: IParams): ReactElement => {
  const dias = obtenerDias(fechaInicio, cantidadDeDias);

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
