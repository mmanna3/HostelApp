import { ReservaEstadoEnum } from 'interfaces/reserva';
import estilo from './Celda.module.scss';

export const ClaseCssEstaHovereadaONo = {
  EstaHovereada: estilo.estaHovereada,
  NoEstaHovereada: '',
};
export interface ICeldaInfo {
  claseCssEstaHovereadaONo: string;
  reservaId: Nullable<number>;
  nombreAbreviadoDelHuesped: string;
  estado: ReservaEstadoEnum;
}
