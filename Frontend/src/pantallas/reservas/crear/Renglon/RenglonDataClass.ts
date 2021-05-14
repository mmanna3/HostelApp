import { IHabitacionParaTablaReservas } from 'pantallas/reservas/interfaces';
import { CamaDTO, HabitacionParaReservaDTO } from 'store/api/DTOs';

export class RenglonData {
  public habitacionSeleccionada: Nullable<IHabitacionParaTablaReservas>;
  public camaSeleccionadaId: Nullable<string>;
  public indice: number;
  public habitacionesDisponibles: HabitacionParaReservaDTO[];
  public camasDisponibles: CamaDTO[];

  public constructor(
    indice: number,
    habitacionesDisponibles: HabitacionParaReservaDTO[],
    camasDisponibles: CamaDTO[],
    habitacionSeleccionada: Nullable<IHabitacionParaTablaReservas> = null,
    camaSeleccionadaId: Nullable<string> = null
  ) {
    this.habitacionSeleccionada = habitacionSeleccionada;
    this.indice = indice;
    this.habitacionesDisponibles = habitacionesDisponibles;
    this.camasDisponibles = camasDisponibles;
    this.camaSeleccionadaId = null; //No sé si esto está súper bien

    if (camaSeleccionadaId) this.camaSeleccionadaId = camaSeleccionadaId;
    else if (camasDisponibles.length > 0) {
      this.camaSeleccionadaId = camasDisponibles[0].id.toString();
    }
  }
}
