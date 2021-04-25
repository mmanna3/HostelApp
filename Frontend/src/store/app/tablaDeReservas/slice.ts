import { createSlice } from '@reduxjs/toolkit';
import { ReservaResumenDTO } from 'interfaces/reserva';
import {
  ClaseCssEstaHovereadaONo,
  crearCeldaData,
  crearCeldaDataVacio,
  ICeldaData,
} from 'pantallas/reservas/Tabla/Celda/interfaces';
import { convertirADate, convertirAString, sumarDiasALaFecha } from 'utils/Fecha';

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
      var columnaInicial: IColumna = {};

      payload.camasIdsArray.forEach((camaId: number): void => {
        columnaInicial[`${camaId}`] = crearCeldaDataVacio();
      });
      payload.dias.forEach((dia: string): void => {
        state.tabla[dia] = columnaInicial;
      });
    },
    _insertarReserva: (state, { payload }): void => {
      var reserva = payload as ReservaResumenDTO;

      var celdaData = crearCeldaData(reserva);
      var diaCheckin = convertirADate(reserva.diaDeCheckin);
      var diaCheckout = convertirADate(reserva.diaDeCheckout);

      for (let dia = diaCheckin; dia <= diaCheckout; dia = sumarDiasALaFecha(dia, 1)) {
        reserva.camasIds.forEach((camaId: number): void => {
          var diaString = convertirAString(dia);
          state.tabla[diaString][`${camaId}`] = celdaData;

          if (!state.reservas[`${reserva.id}`]) state.reservas[`${reserva.id}`] = [];
          state.reservas[`${reserva.id}`].push({ dia: diaString, camaId: camaId });
        });
      }
    },
    _seleccionarTodasLasCeldasDeLaReserva: (state, { payload }): void => {
      const reservaId = payload;

      if (reservaId !== null) {
        state.reservas[`${reservaId}`].forEach((diaCamaId: IDiaCamaId): void => {
          state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].claseCssEstaHovereadaONo =
            ClaseCssEstaHovereadaONo.EstaHovereada;
        });

        state.reservaSeleccionadaId = reservaId;
      }
    },
    _limpiarCeldasSeleccionadasSiLaCeldaNoPerteneceALaReserva: (state, { payload }): void => {
      const reservaId = payload;

      if (state.reservaSeleccionadaId && state.reservaSeleccionadaId !== reservaId) {
        const reservaSeleccionadaId = state.reservaSeleccionadaId;

        state.reservas[`${reservaSeleccionadaId}`].forEach((diaCamaId: IDiaCamaId): void => {
          state.tabla[`${diaCamaId.dia}`][`${diaCamaId.camaId}`].claseCssEstaHovereadaONo =
            ClaseCssEstaHovereadaONo.NoEstaHovereada;
        });

        state.reservaSeleccionadaId = null;
      }
    },
  },
});

export const {
  _inicializar,
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
  dia: string;
  camaId: number;
}

export interface ITabla {
  [dia: string]: {
    [camaId: string]: ICeldaData;
  };
}

export interface IReserva {
  [id: number]: {
    [camaId: string]: ReservaResumenDTO;
  };
}

export interface IColumna {
  [key: string]: ICeldaData;
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
