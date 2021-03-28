import { createSlice } from '@reduxjs/toolkit';
import { ReservaResumenDTO } from 'interfaces/reserva';

export const initialState: IInitialState = {
  diaMesArray: [],
  camasIdsArray: [],
  tabla: {},
};

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    _inicializar: (state, { payload }): void => {
      state.diaMesArray = payload.diaMesArray;
      state.camasIdsArray = payload.camasIdsArray;
      var celdaInicial: ICeldaInicial = {};

      payload.camasIdsArray.forEach((camaId: number): void => {
        celdaInicial[`${camaId}`] = {} as ReservaResumenDTO;
      });
      payload.diaMesArray.forEach((diaMes: { dia: number }): void => {
        state.tabla[`${diaMes.dia}`] = celdaInicial;
      });
    },
    _modificarCelda: (state, { payload }): void => {
      state.tabla[`${payload.dia}`][`${payload.camaId}`] = payload.valor;
    },
    _insertarReserva: (state, { payload }): void => {
      for (let dia = payload.diaInicio; dia <= payload.diaFin; dia++) {
        payload.camasIds.forEach((camaId: any): void => {
          state.tabla[`${dia}`][`${camaId}`] = payload;
        });
      }
    },
    _seleccionarTodasLasCeldasDeLaReserva: (state, { payload }): void => {
      Object.entries(state.tabla).forEach(([dia, camaIds]): void => {
        Object.entries(camaIds).forEach(([camaId, celda]): void => {
          if (celda.id === payload) celda.estaSeleccionada = true;
          else celda.estaSeleccionada = false;
        });
      });
    },
  },
});

export const {
  _inicializar,
  _modificarCelda,
  _insertarReserva,
  _seleccionarTodasLasCeldasDeLaReserva,
} = tablaDeReservasSlice.actions;
export const tablaDeReservasSelector = (state: any): IInitialState => state.tablaDeReservas;
export default tablaDeReservasSlice.reducer;

export function inicializarTabla(diaMesArray: IDiaMes[], camasIdsArray: number[]): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    dispatch(_inicializar({ diaMesArray, camasIdsArray }));
  };
}

export function modificarCelda(dia: number, camaId: number, valor: any): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    dispatch(_modificarCelda({ dia, camaId, valor }));
  };
}

export function insertarReserva(reserva: ReservaResumenDTO): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    dispatch(_insertarReserva(reserva));
  };
}
export function seleccionarTodasLasCeldasDeLaReserva(reservaId: number): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    dispatch(_seleccionarTodasLasCeldasDeLaReserva(reservaId));
  };
}

interface IInitialState {
  diaMesArray: IDiaMes[];
  camasIdsArray: number[];
  tabla: ITabla;
}

export interface ITabla {
  [dia: string]: {
    [camaId: string]: ReservaResumenDTO;
  };
}

export interface ICeldaInicial {
  [key: string]: ReservaResumenDTO;
}

export interface IDiaMes {
  dia: number;
  mes: number;
}

export interface ICama {
  id: number;
  nombre: string;
  tipo: string;
}

export interface IDispatch {
  (arg0: { payload: any; type: string }): void;
}
