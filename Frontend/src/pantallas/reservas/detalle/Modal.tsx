import { Body, Modal } from 'components/Modal';
import { ReservaDTO } from 'interfaces/reserva';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './Detalle.module.scss';

const Detalle = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.reservas.obtenerPorId.selector) as {
    datos: ReservaDTO;
    estado: ESTADO;
  };

  function ocultar(): void {
    dispatch(api.reservas.obtenerPorId.reiniciar());
  }

  // Estaría bueno que haya un spinner que bloquee la pantalla y opere según el estado

  return datos !== null ? (
    <Modal isVisible={true} onHide={ocultar}>
      <Body width={'400px'}>
        <div className={Estilos.contenedor}>
          <p className={Estilos.nombre}>{datos.datosMinimosDeHuesped.nombreCompleto}</p>
        </div>
      </Body>
    </Modal>
  ) : (
    <></>
  );
};

export default Detalle;
