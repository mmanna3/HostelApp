import { createSlice as createSliceRTK, Dispatch, Slice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EstadosApiRequestEnum as ESTADO } from './estadosApiRequestEnum';

export const createSlice = (nombre: string, dataInicial: any[] | null): Slice => {
  const initialState = {
    estado: ESTADO.inactivo,
    datos: dataInicial,
    errores: undefined,
  };

  return createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: (state): void => {
        state.estado = ESTADO.cargando;
      },
      fetchSuccess: (state, { payload }): void => {
        if (payload === '') payload = dataInicial;
        state.datos = payload;
        state.estado = ESTADO.exitoso;
        state.errores = undefined;
      },
      fetchFailure: (state, { payload }): void => {
        state.estado = ESTADO.huboError;
        state.errores = payload;
      },
      reset: (state): void => {
        state.estado = ESTADO.inactivo;
        state.datos = dataInicial;
        state.errores = undefined;
      },
    },
  });
};

export function fetchFunc<TResultado, TParametros>(
  endpoint: string,
  actions: any,
  parametros?: TParametros,
  enRespuestaOK?: (resultado: TResultado) => void,
  enRespuestaFallida?: () => void
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
      .get<TResultado>(`/api${endpoint}${parametrosUrl}`)
      .then((res): void => {
        dispatch(fetchSuccess(res.data));
        typeof enRespuestaOK === 'function' && enRespuestaOK(res.data);
      })
      .catch((error): void => {
        dispatch(fetchFailure(error.message));
        typeof enRespuestaFallida === 'function' && enRespuestaFallida();
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
