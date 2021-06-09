import Display, { DisplayLista, DisplayTextarea, SiNo } from 'components/display/Display';
import { CardBody, FooterVolver, Header, ModalCard } from 'components/Modal/Modal';
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

  if (datos !== null) {
    const rowsDelTextAreaDeCamas = calcularMaximoDeCamas() + 1;

    return (
      <ModalCard isVisible={true} onHide={ocultar}>
        <Header title="Detalle de habitación" onHide={ocultar} />
        <CardBody>
          <div className="columns">
            <div className="column">
              <Display label="Nombre" valor={datos.nombre} />
            </div>
            <div className="column">
              <Display label="Tipo" valor={textoTipo.get(datos.esPrivada)} />
            </div>
            <div className="column">
              <SiNo label="Tiene baño" valor={datos.tieneBanio} />
            </div>
          </div>
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
        </CardBody>
        <FooterVolver onClick={ocultar} />
      </ModalCard>
    );
  }
  return <></>;
};

export default Detalle;
