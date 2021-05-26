import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { Input } from 'components/Input';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import ValidationSummary from 'components/ValidationSummary';
import DatosDelPasajero from 'pantallas/reservas/crear/DatosDelPasajero/DatosDelPasajero';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'store/api/api';
import { PasajeroDTO, ReservaDetalleDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enCheckInExitoso: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckIn = ({ esVisible, datos, alOcultar, enCheckInExitoso }: IProps): ReactElement => {
  const [key, reiniciarKey] = useCounterKey();
  const [pasajeros, actualizarPasajeroes] = useState<PasajeroDTO[]>([datos.pasajeroTitular]);
  const [indiceEnBusquedaActiva, actualizarIndiceEnBusquedaActiva] = useState(0);
  const dispatch = useDispatch();
  const { datos: pasajeroEncontrado, estado: estadoPasajeroEncontrado } = useSelector(
    api.pasajeros.obtenerPorDniOPasaporte.selector
  );
  const { errores, estado } = useSelector(api.reservas.hacerCheckIn.selector);

  useEffect((): void => {
    let pasajeroVacio: PasajeroDTO = {
      id: -1,
      nombreCompleto: '',
      dniOPasaporte: '',
      pais: '',
      telefono: '',
      email: '',
    };

    for (let i = 0; i < datos.cantidadDePasajeros - 1; i++) {
      actualizarPasajeroes((anteriores): PasajeroDTO[] => [...anteriores, pasajeroVacio]);
    }
  }, [datos]);

  useEffect((): void => {
    if (pasajeroEncontrado) {
      actualizarPasajeroes((anteriores): PasajeroDTO[] => [
        ...anteriores.map((item, i): PasajeroDTO => (i === indiceEnBusquedaActiva ? pasajeroEncontrado : item)),
      ]);
    }

    dispatch(api.pasajeros.obtenerPorDniOPasaporte.reiniciar());
  }, [pasajeroEncontrado, indiceEnBusquedaActiva, dispatch]);

  useEffect((): void => {
    if (estadoPasajeroEncontrado === EstadosApiRequestEnum.exitoso) {
      toast('El pasajero está registrado. De ser necesario, podés editar sus datos.', {
        type: toast.TYPE.SUCCESS,
        toastId: `toast-exito-${indiceEnBusquedaActiva}`,
      });
    } else if (estadoPasajeroEncontrado === EstadosApiRequestEnum.huboError) {
      toast('El pasajero no está registrado. Llená sus datos para registrarlo.', {
        type: toast.TYPE.ERROR,
        toastId: `toast-error-${indiceEnBusquedaActiva}`,
      });
    }
  }, [estadoPasajeroEncontrado, indiceEnBusquedaActiva]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    reiniciarKey();
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  const clickEnBuscar = (dniOPasaporte: string, index: number): void => {
    actualizarIndiceEnBusquedaActiva(index);
    buscarDniOPasaporte(dniOPasaporte);
  };

  const alEnviar = (data: any): void => {
    dispatch(api.reservas.hacerCheckIn.invocar(data, enCheckInExitoso));
  };

  const ocultar = (): void => {
    dispatch(api.reservas.hacerCheckIn.reiniciar());
    alOcultar();
  };

  return (
    <ModalForm isVisible={esVisible} onHide={ocultar} onSubmit={alEnviar} minWidth="900px">
      <Header title="Hacer Check-In" onHide={ocultar} />
      <CardBody minHeight="460px">
        <ValidationSummary errors={errores} />

        <Input name="ReservaId" defaultValue={datos.id} style={{ display: 'none' }} />

        <LineaDivisoria texto="TITULAR DE LA RESERVA" />
        <DatosDelPasajero
          key={`${key}-0`}
          pasajero={pasajeros[0]}
          name="PasajeroTitular"
          buscarDniOPasaporte={(dniOPasaporte: string): void => clickEnBuscar(dniOPasaporte, 0)}
        />

        {pasajeros.slice(1).map(
          (pasajero, i): ReactElement => (
            <div key={i + 1}>
              <LineaDivisoria texto={`PASAJERO ${i + 2}`} />
              <DatosDelPasajero
                key={`${key}-${i + 1}`}
                pasajero={pasajero}
                name={`PasajerosAnexos[${i}]`}
                buscarDniOPasaporte={(dniOPasaporte: string): void => clickEnBuscar(dniOPasaporte, i + 1)}
              />
            </div>
          )
        )}
      </CardBody>
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default HacerCheckIn;
