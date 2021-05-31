import Tab from 'components/Tabs/Tab';
import ContenedorDeTabs from 'components/Tabs/ContenedorDeTabs';
import React, { ReactElement, useEffect, useState } from 'react';
import TodasLasReservas from './Tabs/TodasLasReservas';
import { ReservaEstadoEnum } from 'store/api/DTOs';
import { convertirAString, hoy } from 'utils/Fecha';
import { useParams, useLocation } from 'react-router-dom';

interface IUrlParams {
  id: string;
}

const PantallaOperaciones = (): ReactElement => {
  let { id } = useParams<IUrlParams>();
  let location = useLocation();
  const [tabSeleccionadaPorParametro, modificarTabSeleccionadaPorParametro] = useState(id);

  useEffect((): void => {
    modificarTabSeleccionadaPorParametro(id);
  }, [location, id]);

  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <ContenedorDeTabs key={tabSeleccionadaPorParametro}>
        <Tab
          id={1}
          texto="Todas las reservas"
          icono="calendar"
          seleccionadaPorDefecto={tabSeleccionadaPorParametro === '1'}
          contenido={<TodasLasReservas key={1} verFiltros={true} />}
        />
        <Tab
          id={2}
          texto="Check-Ins de hoy"
          icono="walking"
          seleccionadaPorDefecto={tabSeleccionadaPorParametro === '2'}
          contenido={
            <TodasLasReservas
              key={2}
              verFiltros={false}
              estadoInicial={ReservaEstadoEnum.CheckinPendiente}
              checkInDesde={convertirAString(hoy())}
              checkInHasta={convertirAString(hoy())}
            />
          }
        />
        <Tab
          id={3}
          texto="Check-Outs de hoy"
          icono="walking"
          seleccionadaPorDefecto={tabSeleccionadaPorParametro === '3'}
          contenido={
            <TodasLasReservas
              key={3}
              verFiltros={false}
              estadoInicial={ReservaEstadoEnum.InHouse}
              checkOutDesde={convertirAString(hoy())}
              checkOutHasta={convertirAString(hoy())}
            />
          }
        />
      </ContenedorDeTabs>
    </div>
  );
};

export default PantallaOperaciones;
