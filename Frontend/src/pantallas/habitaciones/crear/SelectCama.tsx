import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import Select from 'components/Select';
import React, { ReactElement } from 'react';
import { IRenglonCama } from './Modal';

interface IProps {
  cama: IRenglonCama;
  setValue: (globalIndex: number, value: object) => void;
  setTipoCama: (index: number, oldTipo: string, newTipo: string) => void;
  removeCama: (globalIndex: number) => any;
}

const SelectCama = ({ cama, setTipoCama, removeCama, setValue }: IProps): ReactElement => {
  interface IIdentificarProps {
    cama: IRenglonCama;
    setValue: (globalIndex: number, value: object) => void;
  }

  const Identificador = ({ cama, setValue }: IIdentificarProps): ReactElement => {
    return (
      <div className="field">
        <span className="control is-expanded">
          <Input
            name={`camas${cama.tipo}[${cama.index}].nombre`}
            placeholder="Identificador"
            handleOnChange={(valor: string): void => {
              setValue(cama.globalIndex, { nombre: valor });
            }}
            // value={cama.value?.nombre}
          />
        </span>
      </div>
    );
  };

  const onTipoCamaChanged = (e: any): void => {
    setTipoCama(cama.index, cama.tipo, e.target.value);
  };

  return (
    <div className="field field-body is-grouped">
      <div className="field is-expanded has-addons" style={{ minWidth: '200px' }}>
        <span className="control">
          <span className="button is-static">Cama</span>
        </span>
        <span className="control is-expanded">
          <Select value={cama.tipo || ''} ccsClass="is-fullwidth" onChange={onTipoCamaChanged}>
            <option value="Individuales">Individual</option>
            <option value="Matrimoniales">Matrimonial</option>
            <option value="Cuchetas">Cucheta</option>
          </Select>
        </span>
      </div>

      <Identificador cama={cama} setValue={setValue} />

      <button
        className="button has-text-grey has-background-light"
        type="button"
        onClick={(): void => removeCama(cama.globalIndex)}
      >
        {/* El onClick de arriba funciona pero no tiene sentido. Algún día lo arreglaré. */}
        <Icon faCode="trash-alt" />
      </button>
    </div>
  );
};

export default SelectCama;
