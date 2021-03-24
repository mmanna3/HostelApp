import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createSlice, fetchFunc, obtenerPorIdFunc } from 'store/defaultFetchSlice';
import { ISliceHttpGetInfo } from './requestsInterfaces';

interface ISliceHttpGetGenerado {
  selector: (state: any) => any;
  reducer: any;
  invocar: () => any;
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
