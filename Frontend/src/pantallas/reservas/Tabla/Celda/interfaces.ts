import { ReservaEstadoEnum } from 'interfaces/reserva';
import estilo from './Celda.module.scss';

export const CeldaPertenecienteAReservaEstilo = {
  EstaSeleccionada: estilo.estaSeleccionada,
  Ninguno: '',
};
export interface ICeldaInfo {
  estilo: string;
  id: Nullable<number>;
  estado: ReservaEstadoEnum;
}
