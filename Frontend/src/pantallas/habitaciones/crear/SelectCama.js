import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import Select from 'components/Select';
import React from 'react';

const SelectCama = ({ cama, setTipoCama, removeCama, setValue }) => {
  const Identificador = ({ cama, setValue }) => {
    return (
      <div className="field">
        <span className="control is-expanded">
          <Input
            name={`camas${cama.tipo}[${cama.index}].nombre`}
            placeholder="Identificador"
            handleOnChange={valor => {
              setValue(cama.globalIndex, { nombre: valor });
            }}
            // value={cama.value?.nombre}
          />
        </span>
      </div>
    );
  };

  const onTipoCamaChanged = e => {
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

      <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(cama.globalIndex)}>
        <Icon faCode="trash-alt" />
      </button>
    </div>
  );
};

export default SelectCama;
