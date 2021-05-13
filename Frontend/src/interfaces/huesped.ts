export interface HuespedDTO extends DatosMinimosDeHuespedDTO {
  id: number;
}

export interface DatosMinimosDeHuespedDTO {
  nombreCompleto: string;
  dniOPasaporte: string;
  telefono: string;
  email: string;
  pais: string;
}
