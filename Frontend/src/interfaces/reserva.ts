import { CamaDTO } from './habitacion';
import { DatosMinimosDeHuespedDTO } from './huesped';

export interface ReservasDelPeriodoDTO {
  desde: string;
  hasta: string;
  reservas: ReservaResumenDTO[];
}

export interface ReservaResumenDTO {
  id: number;
  diaDeCheckin: number;
  diaDeCheckout: number;
  camasIds: number[];
}

export interface ReservaDTO {
  id: number;
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

export interface IHabitacionParaTablaReservas {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: CamaDTO[];
}
