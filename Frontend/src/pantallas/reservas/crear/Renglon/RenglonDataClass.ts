import { HabitacionDTO } from 'interfaces/habitacion';

export class RenglonData {
  public habitacionSeleccionada: Nullable<HabitacionDTO>;
  public camaSeleccionadaId: Nullable<string>; //No sé si esto está súper bien
  public indice: number;
  public habitacionesDisponibles: any[];
  public camasDisponibles: any[];

  public constructor(
    indice: number,
    habitacionesDisponibles: any,
    camasDisponibles: any,
    habitacionSeleccionada: Nullable<HabitacionDTO> = null,
    camaSeleccionadaId: Nullable<string> = null
  ) {
    this.habitacionSeleccionada = habitacionSeleccionada;
    this.indice = indice;
    this.habitacionesDisponibles = habitacionesDisponibles;
    this.camasDisponibles = camasDisponibles;
    this.camaSeleccionadaId = null; //No sé si esto está súper bien

    if (camaSeleccionadaId) this.camaSeleccionadaId = camaSeleccionadaId;
    else if (camasDisponibles.length > 0) this.camaSeleccionadaId = camasDisponibles[0].id;
  }
}
