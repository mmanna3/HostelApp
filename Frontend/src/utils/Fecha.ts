export function convertirAString(fecha: Date): string {
  //Si son las 23.59.99999 (como en el hasta del daterangepicker), al pasar a ISOString redondea a un día más
  fecha.setHours(0);

  return fecha.toISOString().slice(0, 10);
}

export function obtenerMes(fechaString: string): number {
  return parseInt(fechaString.slice(5, 7));
}

export function obtenerDia(fechaString: string): number {
  return parseInt(fechaString.slice(8));
}

export function obtenerAnio(fechaString: string): number {
  return parseInt(fechaString.slice(0, 4));
}

export function hoy(): Date {
  return new Date();
}

export function esHoy(fecha: Date): boolean {
  const hoy = new Date();
  return (
    fecha.getDate() === hoy.getDate() && fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear()
  );
}

export function maniana(): Date {
  let maniana = new Date();
  maniana.setDate(maniana.getDate() + 1);
  return maniana;
}

export function convertirADate(fecha: string): Date {
  return new Date(obtenerAnio(fecha), obtenerMes(fecha) - 1, obtenerDia(fecha));
}

export function restarFechas(b: Date, a: Date): number {
  const _milisegundosQueTieneCadaDia = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _milisegundosQueTieneCadaDia);
}

export function sumarMesesALaFecha(fecha: Date, cantidadDeMeses: number): Date {
  var resultado = new Date(fecha);
  resultado.setMonth(resultado.getMonth() + cantidadDeMeses);
  return resultado;
}

export function sumarDiasALaFecha(fecha: Date, cantidadDeDias: number): Date {
  var resultado = new Date(fecha);
  resultado.setDate(resultado.getDate() + cantidadDeDias);
  return resultado;
}

export function nombreAbreviadoDelMes(fecha: Date): string {
  const meses = new Map<number, string>([
    [0, 'ENE'],
    [1, 'FEB'],
    [2, 'MAR'],
    [3, 'ABR'],
    [4, 'MAY'],
    [5, 'JUN'],
    [6, 'JUL'],
    [7, 'AGO'],
    [8, 'SEP'],
    [9, 'OCT'],
    [10, 'NOV'],
    [11, 'DIC'],
  ]);

  return meses.get(fecha.getMonth()) || '';
}

export function nombreDelMes(fecha: Date): string {
  const meses = new Map<number, string>([
    [0, 'Enero'],
    [1, 'Febrero'],
    [2, 'Marzo'],
    [3, 'Abril'],
    [4, 'Mayo'],
    [5, 'Junio'],
    [6, 'Julio'],
    [7, 'Agosto'],
    [8, 'Septiembre'],
    [9, 'Octubre'],
    [10, 'Noviembre'],
    [11, 'Diciiembre'],
  ]);

  return meses.get(fecha.getMonth()) || '';
}

export function nombreAbreviadoDelDiaDeLaSemana(fecha: Date): string {
  const meses = new Map<number, string>([
    [0, 'DOM'],
    [1, 'LUN'],
    [2, 'MAR'],
    [3, 'MIÉ'],
    [4, 'JUE'],
    [5, 'VIE'],
    [6, 'SÁB'],
  ]);

  return meses.get(fecha.getDay()) || '';
}

export function nombreDelDiaDeLaSemana(fecha: Date): string {
  const meses = new Map<number, string>([
    [0, 'Domingo'],
    [1, 'Lunes'],
    [2, 'Martes'],
    [3, 'Miércoles'],
    [4, 'Jueves'],
    [5, 'Viernes'],
    [6, 'Sábado'],
  ]);

  return meses.get(fecha.getDay()) || '';
}
