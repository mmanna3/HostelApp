import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'store/api/api';
import { EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import { useHistory } from 'react-router-dom';
import Estilos from './CheckInsYCheckOutsDeHoy.module.scss';
import { ColoresCssEnum } from 'components/_utilidades/utilidades';

const CheckInsYCheckOutsDeHoy = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { datos, estado } = useSelector(api.reservas.cantidadDeCheckInsYCheckOutsDeHoy.selector);

  useEffect((): void => {
    dispatch(api.reservas.cantidadDeCheckInsYCheckOutsDeHoy.invocar());
  }, [dispatch]);

  return (
    <div className={Estilos.contenedor}>
      <span className={Estilos.tooltip} data-tooltip="Check-Ins de hoy">
        <Icon
          faCode="walking"
          size="lg"
          cssClass={Estilos.icono}
          badge={
            estado === EstadosApiRequestEnum.exitoso
              ? { texto: datos.checkIns.toString(), color: ColoresCssEnum.success }
              : { texto: '?', color: ColoresCssEnum.warning }
          }
          onClick={(): void => {
            history.push('/operaciones/2');
          }}
          transformar={{ flipX: true }}
        />
      </span>
      <span className={Estilos.tooltip} data-tooltip="Check-Outs de hoy">
        <Icon
          faCode="walking"
          size="lg"
          cssClass={Estilos.icono}
          badge={
            estado === EstadosApiRequestEnum.exitoso
              ? { texto: datos.checkIns.toString(), color: ColoresCssEnum.info }
              : { texto: '?', color: ColoresCssEnum.warning }
          }
          onClick={(): void => {
            history.push('/operaciones/3');
          }}
        />
      </span>
    </div>
  );
};

export default CheckInsYCheckOutsDeHoy;
