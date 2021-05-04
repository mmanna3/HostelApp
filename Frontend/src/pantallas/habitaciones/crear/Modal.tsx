import { Button } from 'components/botones/botones';
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
  identificadorDeLaCama: Nullable<string>;
}

const Crear = ({ isVisible, onHide, onSuccessfulSubmit }: IProps): ReactElement => {
  const [resetOnChanged, resetForm] = React.useState(0);
  const [camas, actualizarCamas] = React.useState<IRenglonCama[]>([
    { indiceDelTipo: 0, tipo: 'Individuales', indiceGlobal: 0, identificadorDeLaCama: null },
  ]);

  const dispatch = useDispatch();
  const { selector, invocar, reiniciar } = api.habitaciones.crear;
  const { estado, errores } = useSelector(selector);

  function onSuccess(): void {
    onSuccessfulSubmit();
    resetForm(resetOnChanged + 1);
    actualizarCamas([{ indiceDelTipo: 0, tipo: 'Individuales', indiceGlobal: 0, identificadorDeLaCama: null }]);
  }

  const onSubmit = (data: any): void => {
    dispatch(invocar(data, onSuccess));
  };

  function hide(): void {
    onHide();
    dispatch(reiniciar());
    actualizarCamas([{ indiceDelTipo: 0, tipo: 'Individuales', indiceGlobal: 0, identificadorDeLaCama: null }]);
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

  function arreglarIndicesParaQueSeanConsecutivosSegunElTipo(array: IRenglonCama[]): void {
    function updatePorTipo(array: IRenglonCama[], tipo: string): void {
      var arrayDelTipo = array.filter((x): boolean => x.tipo === tipo);

      for (let i = 0; i < arrayDelTipo.length; i++)
        if (arrayDelTipo[i].indiceDelTipo !== i) arrayDelTipo[i].indiceDelTipo = i;
    }

    updatePorTipo(array, 'Individuales');
    updatePorTipo(array, 'Matrimoniales');
    updatePorTipo(array, 'Cuchetas');
  }

  function agregarRenglon(): void {
    var nextIndex = proximoindiceDelTipo(camas, 'Individuales');
    actualizarCamas((prevIndexes: IRenglonCama[]): IRenglonCama[] => [
      ...prevIndexes,
      {
        indiceDelTipo: nextIndex,
        tipo: 'Individuales',
        indiceGlobal: proximoIndiceGlobal(camas),
        identificadorDeLaCama: null,
      },
    ]);
  }

  const eliminarRenglon = (globalIndex: number): void => {
    if (camas.length > 1) {
      var newArray = camas.filter((item): boolean => item.indiceGlobal !== globalIndex);
      arreglarIndicesParaQueSeanConsecutivosSegunElTipo(newArray);
      actualizarCamas(newArray);
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
        newArray[i].identificadorDeLaCama = null;
        break;
      }
    }

    arreglarIndicesParaQueSeanConsecutivosSegunElTipo(newArray);
    actualizarCamas(newArray);
  }

  return (
    <ModalForm isVisible={isVisible} onHide={hide} onSubmit={onSubmit} resetOnChanged={resetOnChanged}>
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
          <Button text="Agregar cama" onClick={(): void => agregarRenglon()} style={{ marginTop: '1em' }} />
        </div>
      </CardBody>
      <FooterAcceptCancel onCancel={hide} loading={estado === EstadosApiRequestEnum.cargando} />
    </ModalForm>
  );
};

export default Crear;
