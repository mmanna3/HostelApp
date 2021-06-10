import React, { ReactElement } from 'react';
import { Boton } from 'components/botones/botones';
import Modal from 'components/Modal/Modal';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './ModalPreguntaConDosBotones.module.scss';

interface IProps {
  esVisible: boolean;
  pregunta: string;
  alOcultar: () => void;
  alConfirmar: () => void;
  textoCancelar?: string;
  textoConfirmar?: string;
  estado: EstadosApiRequestEnum;
}

const ModalPreguntaConDosBotones = ({
  esVisible,
  pregunta,
  alOcultar,
  alConfirmar,
  textoCancelar = 'Cancelar',
  textoConfirmar = 'Confirmar',
  estado,
}: IProps): ReactElement => {
  return (
    <Modal esVisible={esVisible} alOcultar={alOcultar}>
      <div className={Estilos.pregunta}>{pregunta}</div>
      <div className="columns">
        <div className="column">
          <Boton className={Estilos.ocuparTodoElAncho} texto={textoCancelar} onClick={alOcultar} />
        </div>
        <div className="column">
          <Boton
            className={`is-primary ${Estilos.ocuparTodoElAncho}`}
            texto={textoConfirmar}
            cargando={estado === EstadosApiRequestEnum.cargando}
            onClick={alConfirmar}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalPreguntaConDosBotones;
