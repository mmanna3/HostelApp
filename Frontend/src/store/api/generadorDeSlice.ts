import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createSlice, fetchFunc, fetchFuncConParams, obtenerPorIdFunc } from 'store/defaultFetchSlice';
import { ISliceHttpGetInfo } from './requestsInterfaces';

interface ISliceHttpGetGenerado {
  selector: (state: any) => any;
  reducer: any;
  invocar: () => any;
}

interface ISliceHttpGetConParametros<TParametros> {
  selector: (state: any) => any;
  reducer: any;
  invocar: (parametros: TParametros) => any;
}

interface ISliceObtenerPorId {
  selector: (state: any) => any;
  reducer: any;
  invocar: (id: number) => any;
}

export function generarSliceHttpGet<T>(requestSlice: ISliceHttpGetInfo): ISliceHttpGetGenerado {
  const slice = createSlice(requestSlice.nombreDelSlice);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocar(): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
    return fetchFunc<T>(requestSlice.endpoint, slice.actions);
  }

  return {
    selector,
    reducer,
    invocar,
  };
}

export function generarSliceHttpGetConParams<TResultado, TParametros>(
  requestSlice: ISliceHttpGetInfo
): ISliceHttpGetConParametros<TParametros> {
  const slice = createSlice(requestSlice.nombreDelSlice);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocar(parametros: TParametros): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
    return fetchFuncConParams<TResultado, TParametros>(requestSlice.endpoint, slice.actions, parametros);
  }

  return {
    selector,
    reducer,
    invocar,
  };
}

export function generarSliceObtenerPorId<T>(requestSlice: ISliceHttpGetInfo): ISliceObtenerPorId {
  const slice = createSlice(requestSlice.nombreDelSlice);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocar(id: number): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
    return obtenerPorIdFunc<T>(requestSlice.endpoint, id, slice.actions);
  }

  return {
    selector,
    reducer,
    invocar,
  };
}
