import ModalPreguntaConDosBotones from 'components/ModalPreguntaConDosBotones/ModalPreguntaConDosBotones';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { ReservaDetalleDTO } from 'store/api/DTOs';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enCheckOutExitoso: () => void;
  datos: ReservaDetalleDTO;
}

const HacerCheckOut = ({ esVisible, datos, alOcultar, enCheckOutExitoso }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { estado } = useSelector(api.reservas.hacerCheckOut.selector);

  const alConfirmar = (): void => {
    dispatch(api.reservas.hacerCheckOut.invocar({ reservaId: datos.id }, enCheckOutExitoso));
  };

  return (
    <ModalPreguntaConDosBotones
      esVisible={esVisible}
      alOcultar={alOcultar}
      alConfirmar={alConfirmar}
      pregunta="¿Querés confirmar el check-out?"
      estado={estado}
    />
  );
};

export default HacerCheckOut;
