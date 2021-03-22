import { createSlice, fetchFunc } from 'store/defaultFetchSlice';
import { AxiosResponse } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { IGetRequestSlice } from './requestsInterfaces';

interface ISliceGenerado {
  selector: (state: any) => any;
  reducer: any;
  invocarHttpGet: () => any;
}

export function generarSlice<T>(requestSlice: IGetRequestSlice): ISliceGenerado {
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
