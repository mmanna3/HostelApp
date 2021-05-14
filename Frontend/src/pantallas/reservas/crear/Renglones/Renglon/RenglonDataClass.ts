import { CamaDTO, HabitacionParaReservaDTO } from 'store/api/DTOs';

export interface RenglonData {
  habitacionSeleccionada: HabitacionParaReservaDTO;
  camaSeleccionadaId: Nullable<string>;
  indice: number;
  habitacionesDisponibles: HabitacionParaReservaDTO[];
  camasDisponibles: CamaDTO[];
}

export const crearRenglonData = (
  indice: number,
  habitacionesDisponibles: HabitacionParaReservaDTO[],
  habitacionSeleccionada?: HabitacionParaReservaDTO
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
