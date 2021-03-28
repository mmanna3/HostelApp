import React from 'react';
import Estilos from './Encabezado.module.scss'
import Tooltip from "react-tooltip"

const Encabezado = ({habitaciones, mostrarDetalle}) => {

  var iconosCamas = {
    Individual: 'individual',
    Matrimonial: 'matrimonial',
    'Cucheta Abajo': 'cucheta-abajo',
    'Cucheta Arriba': 'cucheta-arriba',    
  }

  var estilosIconoCama = {
    Individual: 'iconoCamaIndividual',
    Matrimonial: 'iconoCamaMatrimonial',
    'Cucheta Abajo': 'iconoCamaCucheta',
    'Cucheta Arriba': 'iconoCamaCucheta',    
  }

  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2" className={Estilos.interseccion}></th>
            {habitaciones.map((habitacion, i) => 
              <th key={i} className={`has-text-weight-medium has-text-centered ${Estilos.habitacionContainer}`} colSpan={habitacion.camas.length}>
                <div className={Estilos.habitacion} onClick={() => mostrarDetalle(habitacion.id)}>
                  {habitacion.nombre} {habitacion.esPrivada ? '\uf023' : ''}
                </div>                
              </th>
            )}
          </tr>        
          <tr>
            {habitaciones.map((habitacion) => 
              habitacion.camas.map((cama,i) =>
                <th key={i} className={`${Estilos.cama}`}>                  
                  <img data-tip={`Cama '${cama.nombre}' - ${cama.tipo}`} className={Estilos[`${estilosIconoCama[cama.tipo]}`]} src={`images/icons/camas/${iconosCamas[cama.tipo]}.svg`} alt={cama.tipo}/>
                  <Tooltip className={Estilos.tooltipCama} place="top" effect="solid" />
                </th>
              )
            )}
          </tr>          
        </thead>
  )
}

export default Encabezado;