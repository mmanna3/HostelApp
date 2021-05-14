import { IHabitacionParaTablaReservas } from 'pantallas/reservas/interfaces';
import { CamaDTO, HabitacionDTO } from 'store/api/DTOs';
import { convertirADate, sumarDiasALaFecha } from 'utils/Fecha';

export function calcularDiasDeReservasVisibles(fechaDesde: string, fechaHasta: string): Date[] {
  var dias: Date[] = [];

  var nuevaFecha = convertirADate(fechaDesde);
  var fechaFinDate = convertirADate(fechaHasta);
  while (nuevaFecha < fechaFinDate) {
    dias.push(nuevaFecha);
    nuevaFecha = sumarDiasALaFecha(nuevaFecha, 1);
  }

  return dias;
}

export function calcularCamasIdsYHabitacionesConCamasUnificadas(habitaciones: HabitacionDTO[]): any {
  var camasIds: number[] = [];
  var habitacionesConCamasUnificadas: IHabitacionParaTablaReservas[] = [];

  for (let i = 0; i < habitaciones.length; i++) {
    var habitacion = habitaciones[i];

    var camasUnificadasDeLaHabitacion = habitacion.camasIndividuales;
    camasUnificadasDeLaHabitacion = camasUnificadasDeLaHabitacion.concat(habitacion.camasMatrimoniales);
    camasUnificadasDeLaHabitacion = camasUnificadasDeLaHabitacion.concat(
      habitacion.camasCuchetas.map((cucheta): CamaDTO => cucheta.abajo)
    );
    camasUnificadasDeLaHabitacion = camasUnificadasDeLaHabitacion.concat(
      habitacion.camasCuchetas.map((cucheta): CamaDTO => cucheta.arriba)
    );

    habitacionesConCamasUnificadas.push({
      nombre: habitacion.nombre,
      id: habitacion.id,
      esPrivada: habitacion.esPrivada,
      camas: camasUnificadasDeLaHabitacion,
    });

    camasIds = camasIds.concat(camasUnificadasDeLaHabitacion.map((cama): number => cama.id));
  }

  return [camasIds, habitacionesConCamasUnificadas];
}
