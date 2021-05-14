import { CamaTipo, HabitacionDTO } from '../../../src/store/api/DTOs';

const habitaciones: HabitacionDTO[] = [
  {
    id: 1,
    nombre: 'Azul',
    tieneBanio: false,
    esPrivada: false,
    informacionAdicional: '',
    camasIndividuales: [
      {
        id: 1,
        nombre: '1',
        tipo: CamaTipo.Individual,
      },
    ],
    camasCuchetas: [],
    camasMatrimoniales: [
      {
        id: 2,
        nombre: 'Matri',
        tipo: CamaTipo.Matrimonial,
      },
    ],
  },
  {
    id: 2,
    nombre: 'Roja',
    tieneBanio: true,
    esPrivada: true,
    informacionAdicional: '',
    camasIndividuales: [
      {
        id: 5,
        nombre: '1',
        tipo: CamaTipo.Individual,
      },
      {
        id: 6,
        nombre: '2',
        tipo: CamaTipo.Individual,
      },
    ],
    camasCuchetas: [
      {
        id: 1,
        nombre: null,
        abajo: {
          id: 3,
          nombre: 'Cucheta',
          tipo: CamaTipo.CuchetaAbajo,
        },
        arriba: {
          id: 4,
          nombre: 'Cucheta',
          tipo: CamaTipo.CuchetaArriba,
        },
      },
    ],
    camasMatrimoniales: [],
  },
];

export default habitaciones;
