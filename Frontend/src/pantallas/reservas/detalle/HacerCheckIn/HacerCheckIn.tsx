import { LineaDivisoria } from 'components/Divider/LineaDivisoria';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import DatosDelHuesped from 'pantallas/reservas/crear/DatosDelHuesped/DatosDelHuesped';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { HuespedDTO, ReservaDetalleDTO } from 'store/api/DTOs';
// import Estilos from './HacerCheckIn.module.scss';

interface IProps {
  esVisible: boolean;
  ocultar: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckIn = ({ esVisible, ocultar, datos }: IProps): ReactElement => {
  const [huespedes, actualizarHuespedes] = useState<HuespedDTO[]>([datos.huesped]);
  const [huespedBusquedaActivaIndex, actualizarHuespedBusquedaActivaIndex] = useState(0);
  const dispatch = useDispatch();
  const { datos: huespedEncontrado } = useSelector(api.huespedes.obtenerPorDniOPasaporte.selector);

  useEffect((): void => {
    let huespedVacio: HuespedDTO = {
      id: -1,
      nombreCompleto: '',
      dniOPasaporte: '',
      pais: '',
      telefono: '',
      email: '',
    };

    for (let i = 0; i < datos.cantidadDePasajeros - 1; i++) {
      actualizarHuespedes((anteriores): HuespedDTO[] => [...anteriores, huespedVacio]);
    }
  }, [datos]);

  useEffect((): void => {
    if (huespedEncontrado) {
      actualizarHuespedes((anteriores): HuespedDTO[] => [
        ...anteriores.map((item, i): HuespedDTO => (i === huespedBusquedaActivaIndex ? huespedEncontrado : item)),
      ]);
    }

    dispatch(api.huespedes.obtenerPorDniOPasaporte.reiniciar());
  }, [huespedEncontrado, huespedBusquedaActivaIndex, dispatch]);

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    dispatch(api.huespedes.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }));
  };

  const clickEnBuscar = (dniOPasaporte: string, index: number): void => {
    actualizarHuespedBusquedaActivaIndex(index);
    buscarDniOPasaporte(dniOPasaporte);
  };

  return (
    <ModalForm isVisible={esVisible} onHide={ocultar} onSubmit={(): void => {}} minWidth="900px">
      <Header title="Hacer Check-In" onHide={ocultar} />
      <CardBody minHeight="460px">
        {/* <ValidationSummary errors={errores} /> */}

        <LineaDivisoria texto="TITULAR DE LA RESERVA" />
        <DatosDelHuesped
          huesped={huespedes[0]}
          name="HuespedTitular"
          buscarDniOPasaporte={(dniOPasaporte: string): void => clickEnBuscar(dniOPasaporte, 0)}
        />

        {huespedes.slice(1).map(
          (huesped, i): ReactElement => (
            <div key={i + 1}>
              <LineaDivisoria texto={`HUÉSPED ${i + 2}`} />
              <DatosDelHuesped
                huesped={huesped}
                name={`Huesped[${i + 1}]`}
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
