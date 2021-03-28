import React, { useCallback, useEffect, useState } from 'react';
import api from 'store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { EstadosApiRequestEnum as ESTADO } from 'store/api/utils/estadosApiRequestEnum';
import { BotonSalir } from 'components/botones/botones';

const CheckoutsDeHoy = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(api.reservas.checkoutsDeHoy.selector);
  const [visible, mostrar] = useState(true);

  const fetchData = useCallback(() => {
    dispatch(api.reservas.checkoutsDeHoy.invocar());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

  if (visible)
    return (
      <div className="notification is-primary is-light">
        <BotonSalir onClick={() => mostrar(false)} />
        {estado === ESTADO.huboError ? (
          'Hubo un error.'
        ) : estado === ESTADO.cargando ? (
          'Cargando...'
        ) : estado === ESTADO.exitoso ? (
          <>
            <strong>Checkouts de hoy</strong>
            <ul>
              {datos.map((e, i) => (
                <li key={i}>{e.aNombreDe}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  else return <></>;
};

export default CheckoutsDeHoy;
