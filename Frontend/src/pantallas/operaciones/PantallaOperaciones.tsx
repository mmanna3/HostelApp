import Tab from 'components/Tabs/Tab';
import ContenedorDeTabs from 'components/Tabs/ContenedorDeTabs';
import React, { ReactElement } from 'react';
import TodasLasReservas from './Tabs/TodasLasReservas';

const PantallaOperaciones = (): ReactElement => {
  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <ContenedorDeTabs>
        <Tab
          id={1}
          texto="Todas las reservas"
          icono="calendar"
          seleccionadaPorDefecto={true}
          contenido={<TodasLasReservas />}
        />
        <Tab id={2} texto="Check-Ins" icono="walking" contenido={<div>Holi</div>} />
      </ContenedorDeTabs>
    </div>
  );
};

export default PantallaOperaciones;
