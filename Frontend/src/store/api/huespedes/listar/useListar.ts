import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchHuespedes, huespedesSelector } from './slice';
import { IUseListarHookRespuesta } from 'store/interfaces';

export function useListar(): IUseListarHookRespuesta {
  const dispatch = useDispatch();
  const { estado, datos } = useSelector(huespedesSelector);

  const listar = useCallback((): any => dispatch(fetchHuespedes()), [dispatch]);

  return {
    estado,
    datos,
    listar,
  };
}

export default useListar;
