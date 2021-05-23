import { Autocomplete } from 'components/Autocomplete';
import { Input } from 'components/Input';
import { paisesParaAutocomplete } from 'pantallas/reservas/crear/DatosDelHuesped/ListaDePaises';
import React, { ReactElement, useEffect, useState } from 'react';
import { DatosMinimosDeHuespedDTO } from 'store/api/DTOs';

interface IProps {
  huesped?: DatosMinimosDeHuespedDTO;
  buscarDniOPasaporte: (dniOPasaporte: string) => void;
  name: string;
}

const DatosDelHuesped = ({ huesped, buscarDniOPasaporte, name }: IProps): ReactElement => {
  const [key, actualizarKey] = useState(huesped?.dniOPasaporte);

  useEffect((): void => {
    debugger;
    actualizarKey(huesped?.dniOPasaporte);
  }, [huesped, huesped?.dniOPasaporte]);

  const paisDelHuesped = huesped ? paisesParaAutocomplete.find((x): boolean => x.value === huesped.pais) : undefined;
  const paisOpcionInicial = paisDelHuesped ? paisDelHuesped : paisesParaAutocomplete[8];

  debugger;
  return (
    <div key={key}>
      <p>Key= {key}</p>
      {/* Porque si cambia el huesped, quiero que rerenderice */}
      <div className="columns">
        <div className="column is-one-third">
          <Input
            placeholder="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onButtonClick={buscarDniOPasaporte}
            dataCy="dni"
            name={`${name}.DNIOPasaporte`}
            type="number"
            defaultValue={huesped?.dniOPasaporte}
            faIconCode="id-card"
          />
        </div>
        <div className="column">
          <Input
            placeholder="Nombre completo"
            dataCy="nombre"
            name={`${name}.NombreCompleto`}
            defaultValue={huesped?.nombreCompleto}
            faIconCode="user"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <Autocomplete
            key={paisOpcionInicial.value}
            dataCy="pais"
            name={`${name}.Pais`}
            opciones={paisesParaAutocomplete}
            opcionInicial={paisOpcionInicial}
            placeholder="Nacionalidad"
            icono="globe"
          />
        </div>
        <div className="column is-one-fifth">
          <Input
            dataCy="telefono"
            name={`${name}.Telefono`}
            type="number"
            defaultValue={huesped?.telefono}
            placeholder="Teléfono"
            faIconCode="phone"
          />
        </div>
        <div className="column">
          <Input
            dataCy="email"
            name={`${name}.Email`}
            defaultValue={huesped?.email}
            type="email"
            placeholder="Email"
            faIconCode="envelope"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosDelHuesped;
