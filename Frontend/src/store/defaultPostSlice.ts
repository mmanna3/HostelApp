import { createSlice as createSliceRTK, Slice, Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const initialState = {
  loading: false,
  requestData: '',
  responseData: '',
  errores: undefined,
};

export const createSlice = (nombre: string): Slice =>
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      postInit: (state, { payload }): void => {
        state.loading = true;
        state.requestData = payload;
      },
      postSuccess: (state): void => {
        state.loading = false;
        state.errores = undefined;
      },
      postFailure: (state, { payload }): void => {
        state.loading = false;
        state.errores = payload?.errors;
      },
      reset: (state): void => {
        state.loading = false;
        state.responseData = '';
        state.requestData = '';
        state.errores = undefined;
      },
    },
  });

export function postFunc<TResultado, TPostBody>(
  endpoint: string,
  actions: any,
  data: TPostBody,
  onSuccess?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
  const { postInit, postSuccess, postFailure } = actions;

  const funcionAsincronica = async (dispatch: Dispatch): Promise<any> => {
    dispatch(postInit());

    axios
      .post<TResultado>('/api' + endpoint, data)
      .then((res): void => {
        dispatch(postSuccess(res.data));
        typeof onSuccess === 'function' && onSuccess();
      })
      .catch((error): void => {
        dispatch(postFailure(error.response.data));
      });
  };

  return funcionAsincronica;
}

export function cleanErrors(actions: any): (dispatch: Dispatch) => void {
  const { reset } = actions;

  return async (dispatch: Dispatch): Promise<any> => {
    dispatch(reset());
  };
}
