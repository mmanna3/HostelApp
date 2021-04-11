import { createSlice as createSliceRTK, Slice, Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EstadosApiRequestEnum as ESTADO } from './estadosApiRequestEnum';

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
      reset: (state): void => {
        state.estado = ESTADO.inactivo;
        state.datos = [];
      },
    },
  });

const initialStateObtenerPorId = {
  estado: ESTADO.inactivo,
  datos: null,
};

export const createSliceObtenerPorId = (nombre: string): Slice =>
  createSliceRTK({
    name: nombre,
    initialState: initialStateObtenerPorId,
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
      reset: (state): void => {
        state.estado = ESTADO.inactivo;
        state.datos = null;
      },
    },
  });

export function fetchFunc<TResultado, TParametros>(
  endpoint: string,
  actions: any,
  parametros?: TParametros,
  onSuccessCallback?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
  const { fetchInit, fetchSuccess, fetchFailure } = actions;

  var parametrosUrl = '';
  if (parametros) {
    Object.keys(parametros).forEach(function (key: string): void {
      parametrosUrl += `&${key}=${(parametros as any)[key]}`;
    });

    parametrosUrl = parametrosUrl.substring(1);
    parametrosUrl = '?'.concat(parametrosUrl);
  }

  const funcionAsincronica = async (dispatch: Dispatch): Promise<any> => {
    dispatch(fetchInit());

    axios
      .get<TResultado[]>(`/api${endpoint}${parametrosUrl}`)
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

export function fetchFuncConParams<TResultado, TParametros>(
  endpoint: string,
  actions: any,
  parametros: TParametros,
  onSuccessCallback?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<TResultado>> {
  const { fetchInit, fetchSuccess, fetchFailure } = actions;

  var parametrosUrl = '';
  Object.keys(parametros).forEach(function (key: string): void {
    parametrosUrl += `&${key}=${(parametros as any)[key]}`;
  });
  parametrosUrl.substring(1);

  const funcionAsincronica = async (dispatch: Dispatch): Promise<any> => {
    dispatch(fetchInit());

    axios
      .get<TResultado[]>(`/api${endpoint}?${parametrosUrl}`)
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

export function reiniciarEstado(actions: any): (dispatch: Dispatch) => void {
  const { reset } = actions;

  return async (dispatch: Dispatch): Promise<any> => {
    dispatch(reset());
  };
}
