import React, { ReactElement } from 'react';
import { Input } from 'components/Input';

const CabeceraHuesped = (): ReactElement => {
  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <Input label="DNI o Pasaporte" name="DatosMinimosDeHuesped.DNIOPasaporte" />
        </div>
        <div className="column">
          <Input label="Nombre completo" name="DatosMinimosDeHuesped.NombreCompleto" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input label="Teléfono" name="DatosMinimosDeHuesped.Telefono" />
        </div>
        <div className="column">
          <Input label="Email" name="DatosMinimosDeHuesped.Email" />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
