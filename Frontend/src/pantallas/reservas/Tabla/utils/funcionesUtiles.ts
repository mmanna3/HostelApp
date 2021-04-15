import { convertirADate, sumarDiasALaFecha } from 'utils/Fecha';

export function obtenerDias(fechaInicio: string, cantidadDeDias: number): Date[] {
  var dias: Date[] = [];
  for (let i = 0; i < cantidadDeDias; i++) {
    var nuevaFecha = sumarDiasALaFecha(convertirADate(fechaInicio), i);
    var nuevoArray = dias;
    nuevoArray.push(nuevaFecha);
  }

  return dias;
}
