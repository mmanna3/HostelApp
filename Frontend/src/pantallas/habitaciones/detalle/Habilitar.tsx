import ModalPreguntaConDosBotones from 'components/ModalPreguntaConDosBotones/ModalPreguntaConDosBotones';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enHabilitacionExitosa: () => void;
  id: number;
}

const Habilitar = ({ esVisible, id, alOcultar, enHabilitacionExitosa }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { estado } = useSelector(api.habitaciones.habilitar.selector);

  const alConfirmar = (): void => {
    dispatch(api.habitaciones.habilitar.invocar({ id }, enHabilitacionExitosa));
  };

  return (
    <ModalPreguntaConDosBotones
      esVisible={esVisible}
      alOcultar={alOcultar}
      alConfirmar={alConfirmar}
      textoConfirmar="Habilitar"
      pregunta="Al habilitar la habitación, esta podrá seleccionarse en futuras reservas."
      estado={estado}
    />
  );
};

export default Habilitar;
