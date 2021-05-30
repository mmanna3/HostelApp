import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useHistory } from 'react-router-dom';

const CheckInsYCheckOutsDeHoy = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { datos, estado } = useSelector(api.reservas.cantidadDeCheckInsDeHoy.selector);

  useEffect((): void => {
    dispatch(api.reservas.cantidadDeCheckInsDeHoy.invocar());
  }, [dispatch]);

  //Hacé una clase y ponele un hover opacity
  return (
    <span>
      <Icon
        faCode="walking"
        size="lg"
        style={{ cursor: 'pointer', top: '2px' }}
        dataBadge={estado === EstadosApiRequestEnum.exitoso ? datos.toString() : '?'}
        onClick={(): void => {
          history.push('/operaciones/2');
        }}
        transformar={{ flipX: true }}
      />
    </span>
  );
};

export default CheckInsYCheckOutsDeHoy;
