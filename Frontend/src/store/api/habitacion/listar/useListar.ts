import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { invocarHttpGet, selector } from './slice';
import { IUseListarHookRespuesta } from 'store/interfaces';

export function useListar(): IUseListarHookRespuesta {
  const dispatch = useDispatch();
  const { estado, datos } = useSelector(selector);

  const listar = useCallback((): any => dispatch(invocarHttpGet()), [dispatch]);

  return {
    estado,
    datos,
    listar,
  };
}

export default useListar;
