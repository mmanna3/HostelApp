import React, { ReactElement } from 'react';
import { Input, InputConBoton } from 'components/Input';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { DatosMinimosDeHuespedDTO } from 'interfaces/huesped';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

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
    if (estado === EstadosApiRequestEnum.inactivo) return <div>Si el huésped está registrado, traeremos sus datos.</div>;

    if (datos != null) return <div>El huésped está registrado. De todas formas, podés editar sus datos.</div>;

    return <div>El huésped NO está registrado. Llená sus datos para registrarlo.</div>;
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
