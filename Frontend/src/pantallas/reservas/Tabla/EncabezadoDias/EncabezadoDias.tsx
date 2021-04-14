import React, { ReactElement, useEffect, useState } from 'react';
import Estilos from './EncabezadoDias.module.scss';
import { convertirADate, sumarDiasALaFecha, nombreAbreviadoDelMes, nombreAbreviadoDelDiaDeLaSemana } from 'utils/Fecha';

interface IParams {
  fechaInicio: string;
  cantidadDeDias: number;
}
const EncabezadoDias = ({ fechaInicio, cantidadDeDias }: IParams): ReactElement => {
  const [_dias, actualizarDias] = useState<Date[]>([]);

  useEffect((): void => {
    for (let i = 0; i < cantidadDeDias; i++) {
      var nuevaFecha = sumarDiasALaFecha(convertirADate(fechaInicio), i);
      var nuevoArray = _dias;
      nuevoArray.push(nuevaFecha);
      actualizarDias(nuevoArray);

      console.log(_dias);
    }
  }, [fechaInicio, cantidadDeDias]);

  return (
    <thead className="is-bordered">
      <tr>
        {_dias.map(
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
