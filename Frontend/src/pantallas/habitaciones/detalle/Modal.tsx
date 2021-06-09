import DatoConIcono from 'components/DatoConIcono/DatoConIcono';
import { DisplayLista, DisplayTextarea } from 'components/display/Display';
import Modal, { CuerpoModal, TituloModal } from 'components/Modal/Modal';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';

const Detalle = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.habitaciones.obtenerPorId.selector);

  function calcularMaximoDeCamas(): number {
    var maximo = datos.camasMatrimoniales.length;
    if (datos.camasIndividuales.length > datos.camasMatrimoniales.length) maximo = datos.camasIndividuales.length;
    if (datos.camasCuchetas.length > datos.camasIndividuales.length) maximo = datos.camasIndividuales.length;

    return maximo;
  }

  function ocultar(): void {
    dispatch(api.habitaciones.obtenerPorId.reiniciar());
  }

  var textoTipo = new Map<boolean, string>([
    [true, 'Privada'],
    [false, 'Compartida'],
  ]);

  var textoTieneBanio = new Map<boolean, string>([
    [true, 'Tiene baño privado'],
    [false, 'No tiene baño privado'],
  ]);

  if (datos !== null) {
    const rowsDelTextAreaDeCamas = calcularMaximoDeCamas() + 1;

    return (
      <Modal esVisible={true} alOcultar={ocultar}>
        <TituloModal>Habitación {datos.nombre}</TituloModal>
        <CuerpoModal>
          <DatoConIcono icono="door-closed" texto={textoTipo.get(datos.esPrivada) ?? ''} />
          <DatoConIcono icono="sink" texto={textoTieneBanio.get(datos.tieneBanio) ?? ''} />
          <div className="columns">
            <div className="column">
              <DisplayLista
                label={`Camas Indiv. (${datos.camasIndividuales.length})`}
                lista={datos.camasIndividuales}
                rows={rowsDelTextAreaDeCamas}
                prop="nombre"
              />
            </div>
            <div className="column">
              <DisplayLista
                label={`Camas Matrim. (${datos.camasMatrimoniales.length})`}
                lista={datos.camasMatrimoniales}
                rows={rowsDelTextAreaDeCamas}
                prop="nombre"
              />
            </div>
            <div className="column">
              <DisplayLista
                label={`Camas Cuchetas (${datos.camasCuchetas.length})`}
                lista={datos.camasCuchetas}
                rows={rowsDelTextAreaDeCamas}
                prop="nombre"
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <DisplayTextarea label="Información adicional" valor={datos.informacionAdicional} />
            </div>
          </div>
        </CuerpoModal>
      </Modal>
    );
  }
  return <></>;
};

export default Detalle;
