import React, { ReactElement } from 'react';
import TodasLasReservas from './Tabs/TodasLasReservas';

const PantallaOperaciones = (): ReactElement => {
  return (
    <div className="container">
      <h1 className="title is-2">Operaciones</h1>
      <TodasLasReservas />
    </div>
  );
};

export default PantallaOperaciones;
