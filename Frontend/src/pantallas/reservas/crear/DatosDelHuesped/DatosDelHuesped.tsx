import { Autocomplete } from 'components/Autocomplete';
import { Input } from 'components/Input';
import { paisesParaAutocomplete } from 'pantallas/reservas/crear/DatosDelHuesped/ListaDePaises';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'store/api/api';
import { HuespedDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

interface IProps {
  huesped?: HuespedDTO;
}

const DatosDelHuesped = ({ huesped }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const [paisOpcionInicial, modificarPaisOpcionInicial] = useState(paisesParaAutocomplete[8]);
  const { datos, estado } = useSelector(api.huespedes.obtenerPorDniOPasaporte.selector);

  useEffect((): void => {
    if (estado === EstadosApiRequestEnum.exitoso && datos != null)
      toast('El huésped está registrado. De ser necesario, podés editar sus datos.', {
        type: toast.TYPE.SUCCESS,
        toastId: `toast-exito-${datos.dniOPasaporte}`,
      });
    else if (estado === EstadosApiRequestEnum.huboError)
      toast('El huésped no está registrado. Llená sus datos para registrarlo.', {
        type: toast.TYPE.ERROR,
        toastId: `toast-error`,
      });
  }, [estado, datos]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.huespedes.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  useEffect((): void => {
    if (datos) {
      let pais = paisesParaAutocomplete.find((x): boolean => x.value === datos.pais);
      if (pais) {
        modificarPaisOpcionInicial(pais);
      }
    }
  }, [datos]);

  return (
    <div>
      <div className="columns">
        <div className="column is-one-third">
          <Input
            placeholder="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onButtonClick={buscarDniOPasaporte}
            dataCy="dni"
            name="DatosMinimosDeHuesped.DNIOPasaporte"
            type="number"
            faIconCode="id-card"
          />
        </div>
        <div className="column">
          <Input
            placeholder="Nombre completo"
            dataCy="nombre"
            name="DatosMinimosDeHuesped.NombreCompleto"
            defaultValue={datos ? datos.nombreCompleto : huesped?.nombreCompleto}
            faIconCode="user"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <Autocomplete
            key={paisOpcionInicial.value}
            dataCy="pais"
            name="DatosMinimosDeHuesped.Pais"
            opciones={paisesParaAutocomplete}
            opcionInicial={paisOpcionInicial}
            placeholder="Nacionalidad"
            icono="globe"
          />
        </div>
        <div className="column is-one-fifth">
          <Input
            dataCy="telefono"
            name="DatosMinimosDeHuesped.Telefono"
            type="number"
            defaultValue={datos?.telefono}
            placeholder="Teléfono"
            faIconCode="phone"
          />
        </div>
        <div className="column">
          <Input
            dataCy="email"
            name="DatosMinimosDeHuesped.Email"
            defaultValue={datos?.email}
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
