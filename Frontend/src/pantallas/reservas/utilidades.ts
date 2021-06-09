import { CamaDTO } from 'store/api/DTOs';

export interface IHabitacionParaTablaReservas {
  id: number;
  nombre: string;
  esPrivada: boolean;
  camas: CamaDTO[];
}
