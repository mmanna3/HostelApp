import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createSlice as createGetSlice, fetchFunc, reiniciarEstado } from 'store/api/utils/httpGetSliceBase';
import { createSlice as createPostSlice, limpiarErrores, postFunc } from 'store/api/utils/httpPostSliceBase';
import { EstadosApiRequestEnum } from './estadosApiRequestEnum';

interface Selector<T> {
  datos: T;
  estado: EstadosApiRequestEnum;
}

interface ISliceHttpGetGenerado<TResultado, TParametros = {}> {
  selector: (state: any) => Selector<TResultado>;
  reducer: any;
  invocar: (parametros?: TParametros) => any;
  reiniciar: () => void;
}

interface ISliceHttpPost<TPostBody> {
  selector: (state: any) => any;
  reducer: any;
  invocar: (body: TPostBody, onSuccess: () => void) => any;
  reiniciar: () => void;
}

export interface IApiSliceInfo {
  nombreDelSlice: string;
  endpoint: string;
  dataInicial: any[] | null;
}

export interface IObtenerPorIdParams {
  id: number;
}

export function generarSliceHttpGet<TResultado, TParametros = {}>(
  requestSlice: IApiSliceInfo
): ISliceHttpGetGenerado<TResultado, TParametros> {
  const slice = createGetSlice(requestSlice.nombreDelSlice, requestSlice.dataInicial);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocar(parametros?: TParametros): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
    return fetchFunc<TResultado, TParametros>(requestSlice.endpoint, slice.actions, parametros);
  }

  function reiniciar(): (dispatch: Dispatch) => void {
    return reiniciarEstado(slice.actions);
  }

  return {
    selector,
    reducer,
    invocar,
    reiniciar,
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
    return limpiarErrores(slice.actions);
  }

  return {
    selector,
    reducer,
    invocar,
    reiniciar,
  };
}
