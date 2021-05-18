import 'cypress-localstorage-commands';
import { CamaTipoEnum, HabitacionConLugaresLibresDTO, HuespedDTO } from '../../../../src/store/api/DTOs';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

function dadoQueHayDosHabitacionesConLugaresLibres(): void {
  const habitacionesConLugaresLibres: HabitacionConLugaresLibresDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: true,
      camas: [
        {
          id: 30,
          nombre: 'Indi1',
          tipo: CamaTipoEnum.Individual,
        },
        {
          id: 31,
          nombre: 'Indi2',
          tipo: CamaTipoEnum.Matrimonial,
        },
      ],
      cantidadDeLugaresLibres: 3,
    },
    {
      id: 2,
      nombre: 'Azul',
      esPrivada: false,
      camas: [
        {
          id: 52,
          nombre: 'IndiAzul',
          tipo: CamaTipoEnum.Individual,
        },
        {
          id: 29,
          nombre: 'MatriAzul',
          tipo: CamaTipoEnum.Matrimonial,
        },
      ],
      cantidadDeLugaresLibres: 3,
    },
  ];
  cy.intercept('/api/habitaciones/conLugaresLibres**', habitacionesConLugaresLibres).as('conLugaresLibres');
}

function dadoQueExisteElHuespedDeDni(dni: string): void {
  const huesped: HuespedDTO = {
    id: 1,
    nombreCompleto: 'Kvothe',
    dniOPasaporte: '111',
    pais: 'de',
    telefono: '44610000',
    email: 'elcolorado@gmail.edu',
  };
  cy.intercept(`/api/huespedes/obtenerPorDniOPasaporte?dniOPasaporte=${dni}`, huesped).as('datosDelHuesped');
}

function dadoQueAlEnviarLosDatosElServidorRespondeUn200(): void {
  cy.intercept('POST', '/api/reservas*', { id: 1 }).as('envioDeDatos');
}

function cargarDatosDelHuesped(): void {
  dadoQueExisteElHuespedDeDni('111');
  cy.get('[data-cy="dni"]').type('111');
  cy.get('[data-cy="boton-dni"]').click();
  cy.wait('@datosDelHuesped');
}

function cargarRenglones(): void {
  cy.get('[data-cy=boton-agregar-cama]').click();
  cy.get('#autocomplete-habitacion-renglon-0').type('azul{enter}');
  cy.get('#autocomplete-cama-renglon-0').type('Matri{enter}');
}

describe.only('Envío de datos', (): void => {
  it('Al hacer click en el botón, se envían todos los datos ingresados', (): void => {
    dadoQueHayDosHabitacionesConLugaresLibres();
    dadoQueAlEnviarLosDatosElServidorRespondeUn200();

    paginaReservas.abrirModalNuevaReserva();

    cargarDatosDelHuesped();
    cargarRenglones();

    cy.get('[data-cy=confirmar]').click();

    const form = {
      DatosMinimosDeHuesped: {
        DNIOPasaporte: '111',
        Email: 'elcolorado@gmail.edu',
        NombreCompleto: 'Kvothe',
        Pais: 'de',
        Telefono: '44610000',
      },
      camasIds: [29],
      canal: 'Presencial',
      cantidadDePasajeros: 1,
      diaDeCheckin: '2021-05-18',
      diaDeCheckout: '2021-05-19',
      habitacionesPrivadasIds: [1],
      horaEstimadaDeLlegada: '11:00',
    };

    cy.wait('@envioDeDatos').its('request.body').should('deep.equal', Object.create(form));
  });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();
  cy.visit('/reservas');
});
