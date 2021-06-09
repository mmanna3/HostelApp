import Acordeon from 'components/Acordeon/Acordeon';
import { Icon } from 'components/Icon';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import React, { ReactElement } from 'react';
import { CamaDTO, HabitacionDTO } from 'store/api/DTOs';
import Estilos from './MostrarHabitacionesYCamas.module.scss';

interface IProps {
  habitacionesPrivadas: HabitacionDTO[];
  camasDeHabitacionesCompartidas: CamaDTO[];
}

const MostrarHabitacionesYCamas = ({ habitacionesPrivadas, camasDeHabitacionesCompartidas }: IProps): ReactElement => {
  const renderizarHabitacionesPrivadas = (habs: HabitacionDTO[]): ReactElement =>
    habs.length === 0 ? (
      <div className={Estilos.dato}>
        <Icon faCode="door-closed" />
        <p>Habitaciones privadas: Ninguna.</p>
      </div>
    ) : (
      <div className={Estilos.dato}>
        <Icon faCode="door-closed" />
        <p>Habitaciones privadas:</p>
        <ul className={Estilos.lista}>
          {habs.map(
            (hab, i): ReactElement => (
              <li key={i}>{hab.nombre}</li>
            )
          )}
        </ul>
      </div>
    );

  const renderizarCamasDeHabitacionesCompartidas = (camas: CamaDTO[]): ReactElement => {
    if (camas.length === 0)
      return (
        <div className={Estilos.dato}>
          <Icon faCode="bed" />
          <p>Camas: Ninguna.</p>
        </div>
      );

    const camasAgrupadas: Map<string, CamaDTO[]> = camas.reduce(
      (entryMap, cama): Map<string, CamaDTO[]> =>
        entryMap.set(cama.nombreHabitacion, [...(entryMap.get(cama.nombreHabitacion) || []), cama]),
      new Map()
    );

    let camasLi: ReactElement[] = [];
    camasAgrupadas.forEach((camas, habitacionNombre): void => {
      camasLi.push(
        <li key={habitacionNombre}>
          Habitación {habitacionNombre}
          <ul className={Estilos.listaCamasDeHabitacionesCompartidas}>
            {camas.map(
              (c, i): ReactElement => (
                <li key={i}>
                  Cama {c.nombre} ({obtenerTipoCamaDescripcion.get(c.tipo)})
                </li>
              )
            )}
          </ul>
        </li>
      );
    });

    return (
      <div className={Estilos.dato}>
        <Icon faCode="bed" />
        <p>Camas de habitaciones compartidas: </p>
        <ul className={Estilos.lista}>{camasLi}</ul>
      </div>
    );
  };

  return (
    <Acordeon texto="habitaciones y camas" icono="bed">
      {renderizarHabitacionesPrivadas(habitacionesPrivadas)}
      {renderizarCamasDeHabitacionesCompartidas(camasDeHabitacionesCompartidas)}
    </Acordeon>
  );
};

export default MostrarHabitacionesYCamas;
