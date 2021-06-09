import { Boton, SubmitButton } from 'components/botones/botones';
import Form from 'components/Form';
import { Input } from 'components/Input';
import Modal from 'components/Modal/Modal';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaDetalleDTO } from 'store/api/DTOs';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './HacerCheckOut.module.scss';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enCheckOutExitoso: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckOut = ({ esVisible, datos, alOcultar, enCheckOutExitoso }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { estado } = useSelector(api.reservas.hacerCheckOut.selector);

  const alEnviar = (data: any): void => {
    dispatch(api.reservas.hacerCheckOut.invocar(data, enCheckOutExitoso));
  };

  return (
    <Modal esVisible={esVisible} alOcultar={alOcultar}>
      <Form defaultValues={undefined} onSubmit={alEnviar}>
        <div className={Estilos.pregunta}>¿Querés confirmar el check-out?</div>
        <Input style={{ display: 'none' }} defaultValue={datos.id} name="reservaId" />
        <div className="columns">
          <div className="column">
            <Boton className={Estilos.ocuparTodoElAncho} texto="Cancelar" onClick={alOcultar} />
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

export default HacerCheckOut;
