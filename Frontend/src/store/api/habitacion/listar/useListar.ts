import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchHabitaciones, habitacionesSelector } from './slice';
import { IUseListarHookRespuesta } from 'store/interfaces';

export function useListar(): IUseListarHookRespuesta {
  const dispatch = useDispatch();
  const { estado, datos } = useSelector(habitacionesSelector);

  const listar = useCallback((): any => dispatch(fetchHabitaciones()), [dispatch]);

  return {
    estado,
    datos,
    listar,
  };
}

export default useListar;
