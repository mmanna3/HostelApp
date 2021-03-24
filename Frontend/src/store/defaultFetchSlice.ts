import { createSlice as createSliceRTK, Slice, Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EstadosFetchEnum as ESTADO } from './interfaces';

const initialState = {
  estado: ESTADO.inactivo,
  datos: [],
};

export const createSlice = (nombre: string): Slice =>
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: (state): void => {
        state.estado = ESTADO.cargando;
      },
      fetchSuccess: (state, { payload }): void => {
        state.datos = payload;
        state.estado = ESTADO.exitoso;
      },
      fetchFailure: (state): void => {
        state.estado = ESTADO.huboError;
      },
    },
  });

export function fetchFunc<T>(
  endpoint: string,
  actions: any,
  onSuccessCallback?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
  const { fetchInit, fetchSuccess, fetchFailure } = actions;

  const funcionAsincronica = async (dispatch: Dispatch): Promise<any> => {
    dispatch(fetchInit());

    axios
      .get<T[]>('/api' + endpoint)
      .then((res): void => {
        dispatch(fetchSuccess(res.data));
        typeof onSuccessCallback === 'function' && onSuccessCallback();
      })
      .catch((error): void => {
        dispatch(fetchFailure(error.response.data));
      });
  };

  return funcionAsincronica;
}

export function obtenerPorIdFunc<T>(
  endpoint: string,
  id: number,
  actions: any,
  onSuccessCallback?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
  const { fetchInit, fetchSuccess, fetchFailure } = actions;

  const funcionAsincronica = async (dispatch: Dispatch): Promise<any> => {
    dispatch(fetchInit());

    axios
      .get<T[]>(`/api${endpoint}/${id}`)
      .then((res): void => {
        dispatch(fetchSuccess(res.data));
        typeof onSuccessCallback === 'function' && onSuccessCallback();
      })
      .catch((error): void => {
        dispatch(fetchFailure(error.response.data));
      });
  };

  return funcionAsincronica;
}
