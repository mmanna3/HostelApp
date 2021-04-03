import { CamaDTO } from './habitacion';

export interface ReservasDelPeriodoDTO {
  desde: string;
  hasta: string;
  reservas: ReservaResumenDTO[];
}

export interface ReservaResumenDTO {
  id: number;
  diaDeCheckin: number;
  diaDeCheckout: number;
  aNombreDe: string;
  camasIds: number[];
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
