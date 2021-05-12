import { Autocomplete } from 'components/Autocomplete';
import { Input } from 'components/Input';
import { obtenerPaisesParaAutocomplete } from 'pantallas/reservas/crear/CabeceraHuesped/ListaDePaises';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

const CabeceraHuesped = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.huespedes.obtenerPorDniOPasaporte.selector);

  useEffect((): void => {
    if (estado === EstadosApiRequestEnum.exitoso && datos != null)
      toast('El huésped está registrado. De ser necesario, podés editar sus datos.', { type: toast.TYPE.SUCCESS });
    else if (estado === EstadosApiRequestEnum.huboError)
      toast('El huésped no está registrado. Llená sus datos para registrarlo.', { type: toast.TYPE.ERROR });
  }, [estado, datos]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.huespedes.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  const paises = obtenerPaisesParaAutocomplete();

  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <Input
            placeholder="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onButtonClick={buscarDniOPasaporte}
            name="DatosMinimosDeHuesped.DNIOPasaporte"
            type="number"
            faIconCode="id-card"
          />
        </div>
        <div className="column">
          <Input
            placeholder="Nombre completo"
            name="DatosMinimosDeHuesped.NombreCompleto"
            defaultValue={datos?.nombreCompleto}
            faIconCode="user"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          <Autocomplete
            name="DatosMinimosDeHuesped.Pais"
            opciones={paises}
            opcionInicial={paises[8]}
            placeholder="Nacionalidad"
            icono="globe"
          />
        </div>
        <div className="column is-one-fifth">
          <Input
            name="DatosMinimosDeHuesped.Telefono"
            type="number"
            defaultValue={datos?.telefono}
            placeholder="Teléfono"
            faIconCode="phone"
          />
        </div>
        <div className="column">
          <Input name="DatosMinimosDeHuesped.Email" defaultValue={datos?.email} placeholder="Email" faIconCode="envelope" />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
