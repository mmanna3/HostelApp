import ModalPreguntaConDosBotones from 'components/ModalPreguntaConDosBotones/ModalPreguntaConDosBotones';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';

interface IProps {
  esVisible: boolean;
  alOcultar: () => void;
  enDeshabilitacionExitosa: () => void;
  id: number;
}

const Deshabilitar = ({ esVisible, id, alOcultar, enDeshabilitacionExitosa }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { estado } = useSelector(api.habitaciones.deshabilitar.selector);

  const alConfirmar = (): void => {
    dispatch(api.habitaciones.deshabilitar.invocar({ id }, enDeshabilitacionExitosa));
  };

  return (
    <ModalPreguntaConDosBotones
      esVisible={esVisible}
      alOcultar={alOcultar}
      alConfirmar={alConfirmar}
      textoConfirmar="Deshabilitar"
      pregunta="Al deshabilitar la habitación, no podrá seleccionarse en futuras reservas."
      estado={estado}
    />
  );
};

export default Deshabilitar;
