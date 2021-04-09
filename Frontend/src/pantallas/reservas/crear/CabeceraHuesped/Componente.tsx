import React, { ReactElement } from 'react';
import { Input, InputConBoton } from 'components/Input';
// import Display from 'components/display/Display';

const CabeceraHuesped = (): ReactElement => {
  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <InputConBoton
            label="DNI o Pasaporte"
            textoDelBoton="Buscar"
            callback={(): void => console.log(1)}
            name="DatosMinimosDeHuesped.DNIOPasaporte"
            type="number"
          />
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column">
          <Input readOnly label="Nombre completo" name="DatosMinimosDeHuesped.NombreCompleto" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input readOnly label="Teléfono" name="DatosMinimosDeHuesped.Telefono" type="number" />
        </div>
        <div className="column">
          <Input readOnly label="Email" name="DatosMinimosDeHuesped.Email" type="number" />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
