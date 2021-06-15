import DatoConIcono from 'components/DatoConIcono/DatoConIcono';
import Modal, { CuerpoModal, TituloModal } from 'components/Modal/Modal';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { obtenerTipoCamaDescripcion } from 'components/_utilidades/utilidades';
import Acordeon from 'components/Acordeon/Acordeon';
import { Boton } from 'components/botones/botones';
import Deshabilitar from './Deshabilitar';
import Habilitar from './Habilitar';
import Estilos from './Modal.module.scss';

interface IProps {
  enDeshabilitacionExitosa: () => void;
  enHabilitacionExitosa: () => void;
}

const Detalle = ({ enDeshabilitacionExitosa, enHabilitacionExitosa }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.habitaciones.obtenerPorId.selector);
  const [modalDeshabilitarEsVisible, cambiarVisibilidadDeModalDeshabilitar] = useState(false);
  const [modalHabilitarEsVisible, cambiarVisibilidadDeModalHabilitar] = useState(false);
  const [modalPrincipalEsVisible, cambiarVisibilidadDeModalPrincipal] = useState(true);

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
      <>
        <Deshabilitar
          id={datos.id}
          esVisible={modalDeshabilitarEsVisible}
          alOcultar={(): void => {
            cambiarVisibilidadDeModalDeshabilitar(false);
            cambiarVisibilidadDeModalPrincipal(true);
          }}
          enDeshabilitacionExitosa={(): void => {
            cambiarVisibilidadDeModalDeshabilitar(false);
            cambiarVisibilidadDeModalPrincipal(true);
            ocultar();
            enDeshabilitacionExitosa();
          }}
        />
        <Habilitar
          id={datos.id}
          esVisible={modalHabilitarEsVisible}
          alOcultar={(): void => {
            cambiarVisibilidadDeModalHabilitar(false);
            cambiarVisibilidadDeModalPrincipal(true);
          }}
          enHabilitacionExitosa={(): void => {
            cambiarVisibilidadDeModalHabilitar(false);
            cambiarVisibilidadDeModalPrincipal(true);
            ocultar();
            enHabilitacionExitosa();
          }}
        />
        <Modal esVisible={modalPrincipalEsVisible} alOcultar={ocultar}>
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
            <div className={Estilos.margenArriba05rem}>
              <div className="columns">
                <div className="column">
                  {datos.estaHabilitada ? (
                    <Boton
                      icono="times"
                      className="is-danger ocuparTodoElAncho"
                      texto="Deshabilitar"
                      onClick={(): void => {
                        cambiarVisibilidadDeModalPrincipal(false);
                        cambiarVisibilidadDeModalDeshabilitar(true);
                      }}
                    />
                  ) : (
                    <Boton
                      icono="check"
                      className="is-primary ocuparTodoElAncho"
                      texto="Habilitar"
                      onClick={(): void => {
                        cambiarVisibilidadDeModalPrincipal(false);
                        cambiarVisibilidadDeModalHabilitar(true);
                      }}
                    />
                  )}
                </div>
                <div className="column">
                  <Boton icono="copy" className="ocuparTodoElAncho" texto="Crear copia" onClick={(): void => {}} />
                </div>
              </div>
            </div>
          </CuerpoModal>
        </Modal>
      </>
    );
  }
  return <></>;
};

export default Detalle;
