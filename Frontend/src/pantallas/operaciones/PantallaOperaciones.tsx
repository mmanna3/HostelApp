import Tab from 'components/Tabs/Tab';
import TabContainer from 'components/Tabs/TabContainer';
import React, { ReactElement } from 'react';
import TodasLasReservas from './Tabs/TodasLasReservas';

const PantallaOperaciones = (): ReactElement => {
  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <TabContainer>
        <Tab texto="Todas las reservas" icono="calendar" />
        <Tab texto="Check-Ins" icono="walking" />
      </TabContainer>
      <TodasLasReservas />
    </div>
  );
};

export default PantallaOperaciones;
