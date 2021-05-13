export enum CamaTipo {
  Individual = 1,
  Matrimonial = 2,
  CuchetaArriba = 3,
  CuchetaAbajo = 4,
}
export interface CamaDTO {
  id: number;
  nombre: string;
  tipo: CamaTipo;
}

interface CamaCuchetaDTO {
  id: number;
  nombre: string;
  abajo: CamaDTO;
  arriba: CamaDTO;
}

export interface HabitacionDTO {
  id: number;
  nombre: string;
  tieneBanio: boolean;
  esPrivada: boolean;
  informacionAdicional: string;
  camasIndividuales: CamaDTO[];
  camasCuchetas: CamaCuchetaDTO[];
  camasMatrimoniales: CamaDTO[];
}
