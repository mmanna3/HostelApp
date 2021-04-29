import { Autocomplete } from 'components/Autocomplete';
import { Input } from 'components/Input';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

const CabeceraHuesped = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.huespedes.obtenerPorDniOPasaporte.selector);
  const [camposEditables, togglearCamposEditables] = React.useState(false);

  useEffect((): void => {
    if (estado === EstadosApiRequestEnum.exitoso) togglearCamposEditables(true);
  }, [estado]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.huespedes.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  // const mensaje = (): ReactElement => {
  //   if (estado === EstadosApiRequestEnum.inactivo)
  //     return (
  //       <>
  //         <Label text=""></Label>
  //         <div className="notification is-primary is-light">
  //           Si el huésped <strong>está registrado</strong>, traeremos sus datos.
  //         </div>
  //       </>
  //     );

  //   if (datos != null)
  //     return (
  //       <>
  //         <Label text=""></Label>
  //         <div className="notification is-success is-light">
  //           El huésped está <strong>registrado</strong>. De ser necesario, podés editar sus datos.
  //         </div>
  //       </>
  //     );

  //   return (
  //     <>
  //       <Label text=""></Label>
  //       <div className="notification is-warning is-light">
  //         El huésped <strong>no está registrado</strong>. Llená sus datos para registrarlo.
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <Input
            placeHolder="DNI o Pasaporte"
            textoDelBoton="Buscar"
            onButtonClick={buscarDniOPasaporte}
            name="DatosMinimosDeHuesped.DNIOPasaporte"
            type="number"
            faIconCode="id-card"
          />
        </div>
        {/* <div className="column">{mensaje()}</div> */}
        <div className="column">
          <Input
            readOnly={!camposEditables}
            placeHolder="Nombre completo"
            name="DatosMinimosDeHuesped.NombreCompleto"
            defaultValue={datos?.nombreCompleto}
            faIconCode="user"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          {/* <Input
            readOnly={!camposEditables}
            name="DatosMinimosDeHuesped.Pais"
            // defaultValue={'AR'}
            placeHolder="Nacionalidad"
            faIconCode="globe"
          /> */}
          <Autocomplete />
        </div>
        <div className="column is-one-fifth">
          <Input
            readOnly={!camposEditables}
            name="DatosMinimosDeHuesped.Telefono"
            type="number"
            defaultValue={datos?.telefono}
            placeHolder="Teléfono"
            faIconCode="phone"
          />
        </div>
        <div className="column">
          <Input
            readOnly={!camposEditables}
            name="DatosMinimosDeHuesped.Email"
            defaultValue={datos?.email}
            placeHolder="Email"
            faIconCode="envelope"
          />
        </div>
      </div>
    </>
  );
};

export default CabeceraHuesped;
