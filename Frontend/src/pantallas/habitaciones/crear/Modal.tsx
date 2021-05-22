import { Boton } from 'components/botones/botones';
import { Input } from 'components/Input';
import Label from 'components/Label';
import { CardBody, FooterAcceptCancel, Header, ModalForm } from 'components/Modal';
import Select from 'components/Select';
import SiNo from 'components/SiNo';
import Textarea from 'components/Textarea';
import ValidationSummary from 'components/ValidationSummary';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useCounterKey } from 'utils/hooks/useCounterKey';
import SelectCama from './SelectCama';

interface IProps {
  isVisible: boolean;
  onHide: () => void;
  onSuccessfulSubmit: () => void;
}

export interface IRenglonCama {
  indiceDelTipo: number;
  tipo: string;
  indiceGlobal: number;
  identificadorDeLaCama: string;
}

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }: IProps): ReactElement => {
  const camaInicial = { indiceDelTipo: 0, tipo: 'Individuales', indiceGlobal: 0, identificadorDeLaCama: '' };
  const [modalKey, reiniciarModal] = useCounterKey();
  const [camas, actualizarCamas] = React.useState<IRenglonCama[]>([camaInicial]);

  const dispatch = useDispatch();
  const { selector, invocar, reiniciar } = api.habitaciones.crear;
  const { estado, errores } = useSelector(selector);

  function onSuccess(): void {
    onSuccessfulSubmit();
    reiniciarModal();
    actualizarCamas([camaInicial]);
  }

  const onSubmit = (data: any): void => {
    let newData = data;

    let camasIndividuales: any[] = [];
    let camasMatrimoniales: any[] = [];
    let camasCuchetas: any[] = [];

    camas.forEach((cama: IRenglonCama): any => {
      if (cama.tipo === 'Individuales') camasIndividuales.push({ nombre: cama.identificadorDeLaCama });
      if (cama.tipo === 'Matrimoniales') camasMatrimoniales.push({ nombre: cama.identificadorDeLaCama });
      if (cama.tipo === 'Cuchetas') camasCuchetas.push({ nombre: cama.identificadorDeLaCama });
    });

    if (camasIndividuales.length > 0) newData['camasIndividuales'] = camasIndividuales;
    if (camasMatrimoniales.length > 0) newData['camasMatrimoniales'] = camasMatrimoniales;
    if (camasCuchetas.length > 0) newData['camasCuchetas'] = camasCuchetas;

    dispatch(invocar(newData, onSuccess));
  };

  function hide(): void {
    onHide();
    reiniciarModal();
    dispatch(reiniciar());
    actualizarCamas([camaInicial]);
  }

  function proximoindiceDelTipo(array: IRenglonCama[], tipo: string): number {
    var cama = array
      .slice()
      .reverse()
      .find((x: IRenglonCama): boolean => x.tipo === tipo);
    return cama ? cama.indiceDelTipo + 1 : 0;
  }

  function proximoIndiceGlobal(array: IRenglonCama[]): number {
    var camasReverse = array.slice().reverse();
    return camasReverse[0].indiceGlobal + 1;
  }

  function arreglarIndicesParaQueSeanConsecutivosSegunElTipo(array: IRenglonCama[]): IRenglonCama[] {
    let ultimoIndiceDelTipoIndividuales = -1;
    let ultimoIndiceDelTipoMatrimoniales = -1;
    let ultimoIndiceDelTipoCuchetas = -1;

    let resultado = array.map(
      (cama: IRenglonCama): IRenglonCama => {
        if (cama.tipo === 'Individuales') {
          ultimoIndiceDelTipoIndividuales++;
          if (cama.indiceDelTipo !== ultimoIndiceDelTipoIndividuales) cama.indiceDelTipo = ultimoIndiceDelTipoIndividuales;
        } else if (cama.tipo === 'Matrimoniales') {
          ultimoIndiceDelTipoMatrimoniales++;
          if (cama.indiceDelTipo !== ultimoIndiceDelTipoMatrimoniales) cama.indiceDelTipo = ultimoIndiceDelTipoMatrimoniales;
        } else {
          ultimoIndiceDelTipoCuchetas++;
          if (cama.indiceDelTipo !== ultimoIndiceDelTipoCuchetas) cama.indiceDelTipo = ultimoIndiceDelTipoCuchetas;
        }
        return cama;
      }
    );

    return resultado;
  }

  function agregarRenglon(): void {
    var nextIndex = proximoindiceDelTipo(camas, 'Individuales');
    actualizarCamas((prevIndexes: IRenglonCama[]): IRenglonCama[] => [
      ...prevIndexes,
      {
        ...camaInicial,
        indiceDelTipo: nextIndex,
        indiceGlobal: proximoIndiceGlobal(camas),
      },
    ]);
  }

  const eliminarRenglon = (globalIndex: number): void => {
    if (camas.length > 1) {
      var camasSinLaEliminada = camas.filter((item): boolean => item.indiceGlobal !== globalIndex);
      let camasConIndicesArreglados = arreglarIndicesParaQueSeanConsecutivosSegunElTipo(camasSinLaEliminada);
      actualizarCamas(camasConIndicesArreglados);
    }
  };

  function actualizarIdentificadorDeLaCama(globalIndex: number, identificadorDeLaCama: string): void {
    var newArray = [...camas];

    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].indiceGlobal === globalIndex) {
        newArray[i].identificadorDeLaCama = identificadorDeLaCama;
        break;
      }
    }

    actualizarCamas(newArray);
  }

  function actualizarTipo(index: number, oldTipo: string, newTipo: string): void {
    var newArray = [...camas];

    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].indiceDelTipo === index && newArray[i].tipo === oldTipo) {
        newArray[i].indiceDelTipo = proximoindiceDelTipo(newArray, newTipo);
        newArray[i].tipo = newTipo;
        newArray[i].identificadorDeLaCama = '';
        break;
      }
    }

    let camasConIndicesArreglados = arreglarIndicesParaQueSeanConsecutivosSegunElTipo(newArray);
    console.log(camasConIndicesArreglados);
    actualizarCamas(camasConIndicesArreglados);
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} key={modalKey}>
      <Header title="Crear habitación" onHide={hide} />
      <CardBody>
        <ValidationSummary errors={errores} />
        <Input label="Nombre" name="nombre" />

        <div className="columns">
          <div className="column">
            <Label text="Tipo" />
            <Select name="esPrivada">
              <option value="false">Compartida</option>
              <option value="true">Privada</option>
            </Select>
          </div>
          <div className="column">
            <SiNo name="tieneBanio" label="Baño privado" />
          </div>
          <div className="column is-two-fifths">
            <div className="field">
              <Label text="Información adicional" />
              <Textarea rows={3} name="informacionAdicional" placeholder="Ej.: tiene rampa para discapacitados" />
            </div>
          </div>
        </div>

        <div className="field">
          <Label text="Camas" />
          {camas.map(
            (cama): ReactElement => {
              return (
                <SelectCama
                  key={cama.indiceGlobal}
                  cama={cama}
                  actualizarTipo={actualizarTipo}
                  eliminarRenglon={eliminarRenglon}
                  actualizarIdentificadorDeLaCama={actualizarIdentificadorDeLaCama}
                />
              );
            }
          )}
          <Boton texto="Agregar cama" onClick={(): void => agregarRenglon()} style={{ marginTop: '1em' }} />
        </div>
      </CardBody>
      <FooterAcceptCancel onCancel={hide} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
