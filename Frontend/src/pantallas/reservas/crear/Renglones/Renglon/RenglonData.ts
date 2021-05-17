import { CamaDTO, HabitacionConLugaresLibresDTO } from 'store/api/DTOs';

export interface RenglonData {
  habitacionSeleccionada: HabitacionConLugaresLibresDTO;
  camaSeleccionadaId: Nullable<string>;
  indice: number;
  habitacionesDisponibles: HabitacionConLugaresLibresDTO[];
  camasDisponibles: CamaDTO[];
}

export const crearRenglonData = (
  indice: number,
  habitacionesDisponibles: HabitacionConLugaresLibresDTO[],
  habitacionSeleccionada?: HabitacionConLugaresLibresDTO
): RenglonData => {
  let _habitacionSeleccionada = habitacionSeleccionada ?? habitacionesDisponibles[0];
  let camasDisponibles: CamaDTO[] = [];
  let camaSeleccionadaId = null;

  if (!_habitacionSeleccionada.esPrivada && _habitacionSeleccionada.camas.length > 0) {
    camasDisponibles = _habitacionSeleccionada.camas;
    camaSeleccionadaId = camasDisponibles[0].id.toString();
  }

  return {
    indice: indice,
    camaSeleccionadaId: camaSeleccionadaId,
    habitacionSeleccionada: _habitacionSeleccionada,
    habitacionesDisponibles: habitacionesDisponibles,
    camasDisponibles: camasDisponibles,
  };
};
