import { Body, Modal } from 'components/Modal';
import React, { ReactElement, ReactNode } from 'react';
import Estilos from './ModalDetalle.module.scss';

interface IProps {
  children: ReactNode;
  esVisible: boolean;
  alOcultar: () => void;
}

const ModalDetalle = ({ children, esVisible, alOcultar }: IProps): ReactElement => {
  return (
    <Modal isVisible={esVisible} onHide={alOcultar}>
      <Body width={'500px'}>
        <div className={Estilos.contenedor}>{children}</div>
      </Body>
    </Modal>
  );
};

export default ModalDetalle;
