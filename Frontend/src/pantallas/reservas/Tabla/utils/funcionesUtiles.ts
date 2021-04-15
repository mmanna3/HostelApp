import { CamaDTO, HabitacionDTO } from 'interfaces/habitacion';
import { IHabitacionParaTablaReservas } from 'interfaces/reserva';
import { convertirADate, sumarDiasALaFecha } from 'utils/Fecha';

export function calcularDiasDeReservasVisibles(fechaInicio: string, cantidadDeDias: number): Date[] {
  var dias: Date[] = [];
  for (let i = 0; i < cantidadDeDias; i++) {
    var nuevaFecha = sumarDiasALaFecha(convertirADate(fechaInicio), i);
    var nuevoArray = dias;
    nuevoArray.push(nuevaFecha);
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
