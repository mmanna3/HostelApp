import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import DatosDelPasajero from 'pantallas/reservas/crear/DatosDelPasajero/DatosDelPasajero';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { PasajeroDTO, ReservaDetalleDTO } from 'store/api/DTOs';
// import Estilos from './HacerCheckIn.module.scss';

interface IProps {
  esVisible: boolean;
  ocultar: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckIn = ({ esVisible, ocultar, datos }: IProps): ReactElement => {
  const [pasajeros, actualizarPasajeroes] = useState<PasajeroDTO[]>([datos.pasajeroTitular]);
  const [IndiceEnBusquedaActiva, actualizarIndiceEnBusquedaActiva] = useState(0);
  const dispatch = useDispatch();
  const { datos: pasajeroEncontrado } = useSelector(api.pasajeros.obtenerPorDniOPasaporte.selector);

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
        ...anteriores.map((item, i): PasajeroDTO => (i === IndiceEnBusquedaActiva ? pasajeroEncontrado : item)),
      ]);
    }

    dispatch(api.pasajeros.obtenerPorDniOPasaporte.reiniciar());
  }, [pasajeroEncontrado, IndiceEnBusquedaActiva, dispatch]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  const clickEnBuscar = (dniOPasaporte: string, index: number): void => {
    actualizarIndiceEnBusquedaActiva(index);
    buscarDniOPasaporte(dniOPasaporte);
  };

  return (
    <ModalForm isVisible={esVisible} onHide={ocultar} onSubmit={(): void => {}} minWidth="900px">
      <Header title="Hacer Check-In" onHide={ocultar} />
      <CardBody minHeight="460px">
        {/* <ValidationSummary errors={errores} /> */}

        <LineaDivisoria texto="TITULAR DE LA RESERVA" />
        <DatosDelPasajero
          pasajero={pasajeros[0]}
          name="PasajeroTitular"
          buscarDniOPasaporte={(dniOPasaporte: string): void => clickEnBuscar(dniOPasaporte, 0)}
        />

        {pasajeros.slice(1).map(
          (pasajero, i): ReactElement => (
            <div key={i + 1}>
              <LineaDivisoria texto={`HUÉSPED ${i + 2}`} />
              <DatosDelPasajero
                pasajero={pasajero}
                name={`Pasajero[${i + 1}]`}
                buscarDniOPasaporte={(dniOPasaporte: string): void => clickEnBuscar(dniOPasaporte, i + 1)}
              />
            </div>
          )
        )}
      </CardBody>
      {/* <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={estado === EstadosApiRequestEnum.cargando} /> */}
      <FooterAcceptCancel acceptDataCy="confirmar" onCancel={ocultar} loading={false} />
    </ModalForm>
  );
};

export default HacerCheckIn;
