import { Autocomplete } from 'components/Autocomplete';
import { Input } from 'components/Input';
import { paisesParaAutocomplete } from 'pantallas/reservas/crear/DatosDelPasajero/ListaDePaises';
import React, { ReactElement } from 'react';
import { PasajeroDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

interface IProps {
  pasajero?: PasajeroDTO;
  buscarDniOPasaporte: (dniOPasaporte: string) => void;
  name: string;
  estadoBusqueda: EstadosApiRequestEnum;
}

const DatosDelPasajero = ({ pasajero, buscarDniOPasaporte, name, estadoBusqueda }: IProps): ReactElement => {
  const paisDelPasajero = pasajero ? paisesParaAutocomplete.find((x): boolean => x.value === pasajero.pais) : undefined;
  const paisOpcionInicial = paisDelPasajero ? paisDelPasajero : paisesParaAutocomplete[8];

  return (
    <div>
      <div className="columns">
        <div className="column is-one-third">
          <Input
            placeholder="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onButtonClick={buscarDniOPasaporte}
            botonCargando={estadoBusqueda === EstadosApiRequestEnum.cargando}
            dataCy="dni"
            name={`${name}.DNIOPasaporte`}
            type="number"
            defaultValue={pasajero?.dniOPasaporte}
            faIconCode="id-card"
          />
        </div>
        <div className="column">
          <Input
            placeholder="Nombre completo"
            dataCy="nombre"
            name={`${name}.NombreCompleto`}
            defaultValue={pasajero?.nombreCompleto}
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
            defaultValue={pasajero?.telefono}
            placeholder="Teléfono"
            faIconCode="phone"
          />
        </div>
        <div className="column">
          <Input
            dataCy="email"
            name={`${name}.Email`}
            defaultValue={pasajero?.email}
            type="email"
            placeholder="Email"
            faIconCode="envelope"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosDelPasajero;
