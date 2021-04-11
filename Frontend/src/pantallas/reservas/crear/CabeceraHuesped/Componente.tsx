import React, { ReactElement } from 'react';
import { Input, InputConBoton } from 'components/Input';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { DatosMinimosDeHuespedDTO } from 'interfaces/huesped';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Label from 'components/Label';

const CabeceraHuesped = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.huespedes.obtenerPorDniOPasaporte.selector) as {
    datos: DatosMinimosDeHuespedDTO;
    estado: EstadosApiRequestEnum;
  };

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.huespedes.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
    console.log(dniOPasaporte);
  };

  const mensaje = (): ReactElement => {
    if (estado === EstadosApiRequestEnum.inactivo)
      return (
        <>
          <Label text=""></Label>
          <div className="notification is-primary is-light">
            Si el huésped <strong>está registrado</strong>, traeremos sus datos.
          </div>
        </>
      );

    if (datos != null)
      return (
        <>
          <Label text=""></Label>
          <div className="notification is-success is-light">
            El huésped está <strong>registrado</strong>. De ser necesario, podés editar sus datos.
          </div>
        </>
      );

    return (
      <>
        <Label text=""></Label>
        <div className="notification is-warning is-light">
          El huésped <strong>no está registrado</strong>. Llená sus datos para registrarlo.
        </div>
      </>
    );
  };

  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <InputConBoton
            label="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onClick={buscarDniOPasaporte}
            name="DatosMinimosDeHuesped.DNIOPasaporte"
            type="number"
          />
        </div>
        <div className="column">{mensaje()}</div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            readOnly
            label="Nombre completo"
            name="DatosMinimosDeHuesped.NombreCompleto"
            defaultValue={datos?.nombreCompleto}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            readOnly
            label="Teléfono"
            name="DatosMinimosDeHuesped.Telefono"
            type="number"
            defaultValue={datos?.telefono}
          />
        </div>
        <div className="column">
          <Input readOnly label="Email" name="DatosMinimosDeHuesped.Email" defaultValue={datos?.email} />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
