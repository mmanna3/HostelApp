import Display from 'components/display/Display';
import { Body, FooterVolver, Header, Modal } from 'components/Modal';
import { ReservaDTO } from 'interfaces/reserva';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';

interface IProps {
  onHide: () => any;
  id: Nullable<number>;
}

const Detalle = ({ onHide, id }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.reservas.obtenerPorId.selector) as {
    datos: ReservaDTO;
    estado: ESTADO;
  };

  const fetchData = useCallback((): any => {
    if (id !== null) dispatch(api.reservas.obtenerPorId.invocar({ id }));
  }, [dispatch, id]);

  useEffect((): any => fetchData(), [fetchData]);

  function ocultar(): void {
    onHide();
    dispatch(api.reservas.obtenerPorId.reiniciar());
  }

  // Estaría bueno que haya un spinner que bloquee la pantalla y opere según el estado

  return datos !== null ? (
    <Modal isVisible={true} onHide={ocultar}>
      <Header title="Detalle de reserva" onHide={ocultar} />
      <Body>
        <div className="columns">
          <div className="column">
            <Display label="Nombre" valor={datos.datosMinimosDeHuesped.nombreCompleto} />
          </div>
          <div className="column">
            <Display label="Desde" valor={datos.diaDeCheckin} />
          </div>
          <div className="column">
            <Display label="Hasta" valor={datos.diaDeCheckout} />
          </div>
        </div>
      </Body>
      <FooterVolver onClick={ocultar} />
    </Modal>
  ) : (
    <></>
  );
};

export default Detalle;
