import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useHistory } from 'react-router-dom';
import Estilos from './CheckInsYCheckOutsDeHoy.module.scss';

const CheckInsYCheckOutsDeHoy = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { datos, estado } = useSelector(api.reservas.cantidadDeCheckInsYCheckOutsDeHoy.selector);

  useEffect((): void => {
    dispatch(api.reservas.cantidadDeCheckInsYCheckOutsDeHoy.invocar());
  }, [dispatch]);

  return (
    <div className={Estilos.contenedor}>
      <span>
        <Icon
          faCode="walking"
          size="lg"
          cssClass={Estilos.icono}
          dataBadge={estado === EstadosApiRequestEnum.exitoso ? datos.checkIns.toString() : '?'}
          onClick={(): void => {
            history.push('/operaciones/2');
          }}
          transformar={{ flipX: true }}
        />
      </span>
      <span>
        <Icon
          faCode="walking"
          size="lg"
          cssClass={Estilos.icono}
          dataBadge={estado === EstadosApiRequestEnum.exitoso ? datos.checkOuts.toString() : '?'}
          onClick={(): void => {
            history.push('/operaciones/3');
          }}
        />
      </span>
    </div>
  );
};

export default CheckInsYCheckOutsDeHoy;
