import { ReservaEstadoEnum, ReservaResumenDTO } from 'interfaces/reserva';
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
  nombreAbreviadoDelHuesped: string;
  estado: ReservaEstadoEnum | EstadoSinReservar;
}

export const crearCeldaDataVacio = (): ICeldaData => {
  return {
    claseCssEstaHovereadaONo: '',
    reservaId: null,
    nombreAbreviadoDelHuesped: '',
    estado: EstadoSinReservar.SinReservar,
  };
};

export const crearCeldaData = (reserva: ReservaResumenDTO): ICeldaData => {
  return {
    reservaId: reserva.id,
    nombreAbreviadoDelHuesped: reserva.nombreAbreviadoDelHuesped,
    estado: reserva.estado,
    claseCssEstaHovereadaONo: ClaseCssEstaHovereadaONo.NoEstaHovereada,
  };
};
