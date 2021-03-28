import React, {useState} from 'react'
import Select from 'components/Select'
import Estilos from './Componente.module.scss'

const SelectorDeVista = ({onFechaChanged, onDisabled }) => {

  const anioActual = new Date().getFullYear();
  const [mes, actualizarMes] = useState(new Date().getMonth()+1);
  const [anio, actualizarAnio] = useState(anioActual);
  const [vistaMensualHabilitada, habilitarVistaMensual] = useState(false);

  function onMesChanged(nuevoMes) {
    actualizarMes(nuevoMes);
    onFechaChanged(anio, nuevoMes);
  }

  function onAnioChanged(nuevoAnio) {
    actualizarAnio(nuevoAnio);
    onFechaChanged(nuevoAnio, mes);
  }

  function onSwitchClicked() {
    if (vistaMensualHabilitada) {
      habilitarVistaMensual(false);
      onDisabled();
    } else {
      habilitarVistaMensual(true);
      onFechaChanged(anio, mes);
    }    
  }

  return (
        <div className="field is-pulled-left">
          <span className={Estilos.switch}>
            <input id="vistaMensual" type="checkbox" onClick={onSwitchClicked} name="vistaMensual" className="switch" />
            <label htmlFor="vistaMensual">Vista mensual</label>
          </span>

          <Select disabled={!vistaMensualHabilitada} defaultValue={mes} onChange={(e) => onAnioChanged(e.target.value)}>
            <option value={anioActual}>{anioActual}</option>
            <option value={anioActual-1}>{anioActual-1}</option>
          </Select>
          <Select disabled={!vistaMensualHabilitada} defaultValue={mes} onChange={(e) => onMesChanged(e.target.value)}>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </Select>
        </div>
  )
}

export default SelectorDeVista;