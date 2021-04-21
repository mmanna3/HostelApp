import { createSlice } from '@reduxjs/toolkit';
import { ReservaResumenDTO } from 'interfaces/reserva';
import { CeldaPertenecienteAReservaEstilo, ICeldaInfo } from 'pantallas/reservas/Tabla/Celda/interfaces';
import { convertirAString, obtenerDia } from 'utils/Fecha';

export const initialState: IInitialState = {
  dias: [],
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
      state.dias = payload.dias;
      state.camasIdsArray = payload.camasIdsArray;
      var celdaInicial: ICeldaInicial = {};

      payload.camasIdsArray.forEach((camaId: number): void => {
        celdaInicial[`${camaId}`] = {
          id: null,
          estilo: CeldaPertenecienteAReservaEstilo.Ninguno,
        } as ICeldaInfo;
      });
      payload.dias.forEach((dia: string): void => {
        state.tabla[`${obtenerDia(dia)}`] = celdaInicial;
      });
    },
    _modificarCelda: (state, { payload }): void => {
      state.tabla[`${payload.dia}`][`${payload.camaId}`] = payload.valor;
    },
    _insertarReserva: (state, { payload }): void => {
      var reserva = payload as ReservaResumenDTO;

      var celdaInfo: ICeldaInfo = {
        id: reserva.id,
        estado: reserva.estado,
        estilo: CeldaPertenecienteAReservaEstilo.Ninguno,
      };

      for (let dia = reserva.diaDeCheckin; dia <= reserva.diaDeCheckout; dia++) {
        reserva.camasIds.forEach((camaId: any): void => {
          state.tabla[`${dia}`][`${camaId}`] = celdaInfo;

          if (!state.reservas[`${reserva.id}`]) state.reservas[`${reserva.id}`] = [];
          state.reservas[`${reserva.id}`].push({ dia: dia, camaId: camaId });
        });
      }
    },
    _seleccionarTodasLasCeldasDeLaReserva: (state, { payload }): void => {
      const reservaId = payload;

      if (reservaId !== null) {
        state.reservas[`${reservaId}`].forEach((diaCamaId: IDiaCamaId): void => {
          state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].estilo = CeldaPertenecienteAReservaEstilo.EstaSeleccionada;
        });

        state.reservaSeleccionadaId = reservaId;
      }
    },
    _limpiarCeldasSeleccionadasSiLaCeldaNoPerteneceALaReserva: (state, { payload }): void => {
      const reservaId = payload;

      if (state.reservaSeleccionadaId && state.reservaSeleccionadaId !== reservaId) {
        const reservaSeleccionadaId = state.reservaSeleccionadaId;

        state.reservas[`${reservaSeleccionadaId}`].forEach((diaCamaId: IDiaCamaId): void => {
          state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].estilo = CeldaPertenecienteAReservaEstilo.Ninguno;
        });

        state.reservaSeleccionadaId = null;
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

export function inicializarTabla(dias: Date[], camasIdsArray: number[]): (dispatch: IDispatch) => Promise<any> {
  return async (dispatch: IDispatch): Promise<any> => {
    const diasString = dias.map((dia): string => convertirAString(dia));
    dispatch(_inicializar({ dias: diasString, camasIdsArray }));
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
    dispatch(_seleccionarTodasLasCeldasDeLaReserva(reservaId));
  };
}

interface IInitialState {
  dias: string[];
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
    [camaId: string]: ICeldaInfo;
  };
}

export interface IReserva {
  [id: number]: {
    [camaId: string]: ReservaResumenDTO;
  };
}

export interface ICeldaInicial {
  [key: string]: ICeldaInfo;
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
