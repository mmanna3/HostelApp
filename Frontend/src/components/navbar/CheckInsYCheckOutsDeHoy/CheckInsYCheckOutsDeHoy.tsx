import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

const CheckInsYCheckOutsDeHoy = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.cantidadDeCheckInsDeHoy.selector);

  useEffect((): void => {
    dispatch(api.reservas.cantidadDeCheckInsDeHoy.invocar());
  }, [dispatch]);

  return (
    <span>
      <Icon
        faCode="walking"
        size="lg"
        style={{ cursor: 'pointer' }}
        dataBadge={estado === EstadosApiRequestEnum.exitoso ? datos.toString() : '?'}
        onClick={(): void => {}}
        transformar={{ flipX: true }}
      />
    </span>
  );
};

export default CheckInsYCheckOutsDeHoy;
