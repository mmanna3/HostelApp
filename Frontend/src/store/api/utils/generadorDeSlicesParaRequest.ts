import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  createSlice as createGetSlice,
  fetchFunc,
  fetchFuncConParams,
  obtenerPorIdFunc,
} from 'store/api/utils/httpGetSliceBase';
import { createSlice as createPostSlice, postFunc, limpiarErrores } from 'store/api/utils/httpPostSliceBase';

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

interface ISliceHttpPost<TPostBody> {
  selector: (state: any) => any;
  reducer: any;
  invocar: (body: TPostBody, onSuccess: () => void) => any;
  reiniciar: () => void;
}

interface ISliceObtenerPorId {
  selector: (state: any) => any;
  reducer: any;
  invocar: (id: number) => any;
}

export interface IApiSliceInfo {
  nombreDelSlice: string;
  endpoint: string;
}

export function generarSliceHttpGet<T>(requestSlice: IApiSliceInfo): ISliceHttpGetGenerado {
  const slice = createGetSlice(requestSlice.nombreDelSlice);
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
  requestSlice: IApiSliceInfo
): ISliceHttpGetConParametros<TParametros> {
  const slice = createGetSlice(requestSlice.nombreDelSlice);
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

export function generarSliceObtenerPorId<T>(requestSlice: IApiSliceInfo): ISliceObtenerPorId {
  const slice = createGetSlice(requestSlice.nombreDelSlice);
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

export function generarSliceHttpPost<TResultado, TPostBody>(requestSlice: IApiSliceInfo): ISliceHttpPost<TPostBody> {
  const slice = createPostSlice(requestSlice.nombreDelSlice);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocar(data: TPostBody, onSuccess: () => void): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
    return postFunc<TResultado, TPostBody>(requestSlice.endpoint, slice.actions, data, onSuccess);
  }

  function reiniciar(): (dispatch: Dispatch) => void {
    return limpiarErrores;
  }

  return {
    selector,
    reducer,
    invocar,
    reiniciar,
  };
}
