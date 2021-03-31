import { createSlice } from '@reduxjs/toolkit';
import { ReservaResumenDTO } from 'interfaces/reserva';
import {
  CeldaPertenecienteAReservaEstilo,
  ICeldaPertenecienteAReservaInfo,
} from 'pantallas/reservas/Tabla/Celda/interfaces';

export const initialState: IInitialState = {
  diaMesArray: [],
  camasIdsArray: [],
  tabla: {},
  reservas: {},
  reservaSeleccionadaId: null,
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
        celdaInicial[`${camaId}`] = {
          id: null,
          estilo: CeldaPertenecienteAReservaEstilo.Ninguno,
        } as ICeldaPertenecienteAReservaInfo;
      });
      payload.diaMesArray.forEach((diaMes: { dia: number }): void => {
        state.tabla[`${diaMes.dia}`] = celdaInicial;
      });
    },
    _modificarCelda: (state, { payload }): void => {
      state.tabla[`${payload.dia}`][`${payload.camaId}`] = payload.valor;
    },
    _insertarReserva: (state, { payload }): void => {
      var reserva = payload as ReservaResumenDTO;

      var celdaInfo: ICeldaPertenecienteAReservaInfo = {
        id: reserva.id,
        estilo: CeldaPertenecienteAReservaEstilo.Ninguno,
      };

      for (let dia = reserva.diaInicio; dia <= reserva.diaFin; dia++) {
        reserva.camasIds.forEach((camaId: any): void => {
          state.tabla[`${dia}`][`${camaId}`] = celdaInfo;

          if (!state.reservas[`${reserva.id}`]) state.reservas[`${reserva.id}`] = [];
          state.reservas[`${reserva.id}`].push({ dia: dia, camaId: camaId });
        });
      }
    },
    _seleccionarTodasLasCeldasDeLaReserva: (state, { payload }): void => {
      const reservaId = payload;

      state.reservas[`${reservaId}`].forEach((diaCamaId: IDiaCamaId): void => {
        state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].estilo = CeldaPertenecienteAReservaEstilo.EstaSeleccionada;
      });

      state.reservaSeleccionadaId = reservaId;
    },
    _limpiarCeldasSeleccionadasSiLaCeldaNoPerteneceALaReserva: (state, { payload }): void => {
      const reservaId = payload;

      if (state.reservaSeleccionadaId && state.reservaSeleccionadaId !== reservaId) {
        const reservaId = state.reservaSeleccionadaId;

        state.reservas[`${reservaId}`].forEach((diaCamaId: IDiaCamaId): void => {
          state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].estilo = CeldaPertenecienteAReservaEstilo.Ninguno;
        });
      }
    },
  },
});

export const {
  _inicializar,
  _modificarCelda,
  _insertarReserva,
  _seleccionarTodasLasCeldasDeLaReserva,
  _limpiarCeldasSeleccionadasSiLaCeldaNoPerteneceALaReserva,
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

export function seleccionarTodasLasCeldasDeLaReserva(reservaId: Nullable<number>): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    dispatch(_limpiarCeldasSeleccionadasSiLaCeldaNoPerteneceALaReserva(reservaId));
    if (reservaId !== null) dispatch(_seleccionarTodasLasCeldasDeLaReserva(reservaId));
  };
}

interface IInitialState {
  diaMesArray: IDiaMes[];
  camasIdsArray: number[];
  tabla: ITabla;
  reservas: {
    [id: string]: IDiaCamaId[];
  };
  reservaSeleccionadaId: Nullable<number>;
}

interface IDiaCamaId {
  dia: number;
  camaId: number;
}
export interface ITabla {
  [dia: string]: {
    [camaId: string]: ICeldaPertenecienteAReservaInfo;
  };
}

export interface IReserva {
  [id: number]: {
    [camaId: string]: ReservaResumenDTO;
  };
}

export interface ICeldaInicial {
  [key: string]: ICeldaPertenecienteAReservaInfo;
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
