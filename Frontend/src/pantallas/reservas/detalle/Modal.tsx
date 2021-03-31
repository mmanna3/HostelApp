import React, { useEffect, useCallback, ReactElement } from 'react';
import { Modal, Body, Header, FooterVolver } from 'components/Modal';
import Display from 'components/display/Display';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { ReservaResumenDTO } from 'interfaces/reserva';

interface IProps {
  onHide: () => any;
  id: Nullable<number>;
}

const Detalle = ({ onHide, id }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.obtenerPorId.selector) as {
    datos: ReservaResumenDTO;
    estado: ESTADO;
  };

  const fetchData = useCallback((): any => {
    if (id !== null) dispatch(api.reservas.obtenerPorId.invocar(id)); // El primer if está al pedo, hay que sacarlo
  }, [dispatch, id]);

  useEffect((): any => fetchData(), [fetchData]);

  return (
    <Modal isVisible={id !== null && estado === ESTADO.exitoso} onHide={onHide}>
      <Header title="Detalle de reserva" onHide={onHide} />
      <Body>
        <div className="columns">
          <div className="column">
            <Display label="Nombre" valor={datos.aNombreDe} />
          </div>
          <div className="column">
            <Display label="Desde" valor={datos.diaInicio} />
          </div>
          <div className="column">
            <Display label="Hasta" valor={datos.diaFin} />
          </div>
        </div>
      </Body>
      <FooterVolver onClick={onHide} />
    </Modal>
  );
};

export default Detalle;
