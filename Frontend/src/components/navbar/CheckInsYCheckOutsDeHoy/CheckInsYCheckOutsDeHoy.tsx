import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
// import Estilos from './CheckInsYCheckOutsDeHoy.module.scss';

const CheckInsYCheckOutsDeHoy = (): ReactElement => {
  const dispatch = useDispatch();
  const { datos } = useSelector(api.reservas.cantidadDeCheckInsDeHoy.selector);

  useEffect((): void => {
    dispatch(api.reservas.cantidadDeCheckInsDeHoy.invocar());
  }, [dispatch]);

  return <div>{datos}</div>;
};

export default CheckInsYCheckOutsDeHoy;
