import { CamaDTO } from './habitacion';
import { DatosMinimosDeHuespedDTO } from './huesped';

export interface ReservasDelPeriodoDTO {
  desde: string;
  hasta: string;
  reservas: ReservaResumenDTO[];
}

export enum ReservaEstadoEnum {
  CheckinPendiente = 1,
  InHouse = 2,
  HizoCheckout = 3,
}
export interface ReservaResumenDTO {
  id: number;
  diaDeCheckin: number;
  diaDeCheckout: number;
  camasIds: number[];
  estado: ReservaEstadoEnum;
}

export interface ReservaDTO {
  id: number;
  estado: ReservaEstadoEnum;
  datosMinimosDeHuesped: DatosMinimosDeHuespedDTO;
  diaDeCheckin: number;
  diaDeCheckout: number;
  camasIds: number[];
  CamasDeHabitacionesPrivadasIds: number[];
}

export interface CheckoutsDeHoyDTO {
  id: number;
  aNombreDe: string;
}

export interface IHabitacionParaReservaDTO {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: CamaDTO[];
  cantidadDeLugaresLibres: number;
}

export interface IHabitacionParaTablaReservas {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: CamaDTO[];
}
