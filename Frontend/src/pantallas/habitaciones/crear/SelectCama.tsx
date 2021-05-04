import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import React, { ReactElement } from 'react';
import { IRenglonCama } from './Modal';

interface IProps {
  cama: IRenglonCama;
  actualizarIdentificadorDeLaCama: (globalIndex: number, identificadorDeLaCama: string) => void;
  actualizarTipo: (index: number, oldTipo: string, newTipo: string) => void;
  eliminarRenglon: (globalIndex: number) => any;
}

interface IIdentificarProps {
  cama: IRenglonCama;
  setValue: (globalIndex: number, identificadorDeLaCama: string) => void;
}

const Identificador = ({ cama, setValue }: IIdentificarProps): ReactElement => {
  return (
    <div className="field">
      <span className="control is-expanded">
        <Input
          key={cama.indiceGlobal}
          name={`camas${cama.tipo}[${cama.indiceDelTipo}].nombre`}
          placeholder="Identificador"
          handleOnChange={(e: any): void => {
            setValue(cama.indiceGlobal, e.target.value);
          }}
        />
      </span>
    </div>
  );
};

const SelectCama = ({ cama, actualizarTipo, eliminarRenglon, actualizarIdentificadorDeLaCama }: IProps): ReactElement => {
  const onTipoCamaChanged = (e: any): void => {
    actualizarTipo(cama.indiceDelTipo, cama.tipo, e.target.value);
  };

  return (
    <div className="field field-body is-grouped">
      <div className="field is-expanded has-addons" style={{ minWidth: '200px' }}>
        <span className="control">
          <span className="button is-static">Cama</span>
        </span>
        <span className="control is-expanded select">
          <select value={cama.tipo || ''} className="is-fullwidth" onChange={onTipoCamaChanged}>
            <option value="Individuales">Individual</option>
            <option value="Matrimoniales">Matrimonial</option>
            <option value="Cuchetas">Cucheta</option>
          </select>
        </span>
      </div>

      <Identificador cama={cama} setValue={actualizarIdentificadorDeLaCama} />

      <button
        className="button has-text-grey has-background-light"
        type="button"
        onClick={(): void => eliminarRenglon(cama.indiceGlobal)}
      >
        {/* El onClick de arriba funciona pero no tiene sentido. Algún día lo arreglaré. */}
        <Icon faCode="trash-alt" />
      </button>
    </div>
  );
};

export default SelectCama;
