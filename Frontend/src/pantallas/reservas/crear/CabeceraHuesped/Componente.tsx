import React, { ReactElement } from 'react';
import { Input, NumericInput } from 'components/Input';
// import Display from 'components/display/Display';

const CabeceraHuesped = (): ReactElement => {
  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <NumericInput label="DNI o Pasaporte" name="DatosMinimosDeHuesped.DNIOPasaporte" />
        </div>
        <div className="column">
          <Input readOnly label="Nombre completo" name="DatosMinimosDeHuesped.NombreCompleto" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <NumericInput readOnly label="Teléfono" name="DatosMinimosDeHuesped.Telefono" />
        </div>
        <div className="column">
          <NumericInput readOnly label="Email" name="DatosMinimosDeHuesped.Email" />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
