import { CamaDTO } from './habitacion';

export interface ReservasDelPeriodoDTO {
  desde: string;
  hasta: string;
  reservas: ReservaResumenDTO[];
}

export interface ReservaResumenDTO {
  estaSeleccionada: boolean; //Este atributo no viene del backend
  id: number;
  diaInicio: number;
  diaFin: number;
  aNombreDe: string;
  CamasIds: number[];
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
