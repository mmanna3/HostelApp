import { Boton, SubmitButton } from 'components/botones/botones';
import Form from 'components/Form';
import { Input } from 'components/Input';
import Modal from 'components/Modal/Modal';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaDetalleDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './Cancelar.module.scss';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enCancelacionExitosa: () => void;
  datos: ReservaDetalleDTO;
}

const Cancelar = ({ esVisible, datos, alOcultar, enCancelacionExitosa }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { estado } = useSelector(api.reservas.cancelar.selector);

  const alEnviar = (data: any): void => {
    dispatch(api.reservas.cancelar.invocar(data, enCancelacionExitosa));
  };

  return (
    <Modal esVisible={esVisible} alOcultar={alOcultar}>
      <Form defaultValues={undefined} onSubmit={alEnviar}>
        <div className={Estilos.pregunta}>¿Querés confirmar la cancelación de la reserva?</div>
        <Input style={{ display: 'none' }} defaultValue={datos.id} name="reservaId" />
        <div className="columns">
          <div className="column">
            <Boton className={Estilos.ocuparTodoElAncho} texto="Volver" onClick={alOcultar} />
          </div>
          <div className="column">
            <SubmitButton
              className={`is-primary ${Estilos.ocuparTodoElAncho}`}
              text="Confirmar"
              loading={estado === EstadosApiRequestEnum.cargando}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default Cancelar;
