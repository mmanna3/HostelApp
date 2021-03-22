import { IGetRequestSlice } from './requestsInterfaces';
import { generarSlice } from './generadorDeSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

const a: IGetRequestSlice = {
  nombreDelSlice: 'habitaciones',
  endpoint: '/habitaciones',
};

export const { selector, reducer, invocarHttpGet } = generarSlice<HabitacionDTO[]>(a);
