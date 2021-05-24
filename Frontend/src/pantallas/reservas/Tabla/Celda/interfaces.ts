import { ReservaEstadoEnum, ReservaResumenDTO } from 'store/api/DTOs';
import estilo from './Celda.module.scss';

export const ClaseCssEstaHovereadaONo = {
  EstaHovereada: estilo.estaHovereada,
  NoEstaHovereada: '',
};

export enum EstadoSinReservar {
  SinReservar = 0,
}

export interface ICeldaData {
  claseCssEstaHovereadaONo: string;
  reservaId: Nullable<number>;
  nombreAbreviadoDelPasajero: string;
  estado: ReservaEstadoEnum | EstadoSinReservar;
}

export const crearCeldaDataVacia = (): ICeldaData => {
  return {
    claseCssEstaHovereadaONo: '',
    reservaId: null,
    nombreAbreviadoDelPasajero: '',
    estado: EstadoSinReservar.SinReservar,
  };
};

export const crearCeldaData = (reserva: ReservaResumenDTO): ICeldaData => {
  return {
    reservaId: reserva.id,
    nombreAbreviadoDelPasajero: reserva.nombreAbreviadoDelPasajero,
    estado: reserva.estado,
    claseCssEstaHovereadaONo: ClaseCssEstaHovereadaONo.NoEstaHovereada,
  };
};
