import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createSlice, fetchFunc } from 'store/defaultFetchSlice';
import { ISliceHttpGetInfo } from './requestsInterfaces';

interface ISliceGenerado {
  selector: (state: any) => any;
  reducer: any;
  invocarHttpGet: () => any;
}

export function generarSliceHttpGet<T>(requestSlice: ISliceHttpGetInfo): ISliceGenerado {
  const slice = createSlice(requestSlice.nombreDelSlice);
  const selector = (state: any): any => state[requestSlice.nombreDelSlice];
  const reducer = slice.reducer;

  function invocarHttpGet(): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
    return fetchFunc<T>(requestSlice.endpoint, slice.actions);
  }

  return {
    selector,
    reducer,
    invocarHttpGet,
  };
}
