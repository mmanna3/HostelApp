import DatoConIcono from 'components/DatoConIcono/DatoConIcono';
import Modal, { CuerpoModal, TituloModal } from 'components/Modal/Modal';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import Acordeon from 'components/Acordeon/Acordeon';

const Detalle = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.habitaciones.obtenerPorId.selector);

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
    return (
      <Modal esVisible={true} alOcultar={ocultar}>
        <TituloModal>Habitación {datos.nombre}</TituloModal>
        <CuerpoModal>
          <DatoConIcono icono="door-closed" texto={textoTipo.get(datos.esPrivada) ?? ''} />
          <DatoConIcono icono="sink" texto={textoTieneBanio.get(datos.tieneBanio) ?? ''} />

          <Acordeon icono="bed" texto="camas">
            <table className="table is-fullwidth">
              <tbody>
                {datos.camas.map(
                  (cama): ReactElement => (
                    <tr key={cama.id}>
                      <td>Cama {cama.nombre}</td>
                      <td>{obtenerTipoCamaDescripcion.get(cama.tipo)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Acordeon>
          <Acordeon icono="align-right" texto="información adicional">
            {datos.informacionAdicional !== '' ? datos.informacionAdicional : 'Sin información adicional'}
          </Acordeon>
        </CuerpoModal>
      </Modal>
    );
  }
  return <></>;
};

export default Detalle;
