import 'cypress-localstorage-commands';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

function mockearSoloUnaHabitacionPrivada() {
  cy.server();
  cy.route({
    method: 'GET',
    url: '/api/habitaciones/conLugaresLibres**',
    response: [
      {
        id: 1,
        nombre: 'Roja',
        esPrivada: true,
        camas: [
          {
            id: 31,
            nombre: '4',
            tipo: 'Cucheta Abajo',
          },
          {
            id: 32,
            nombre: '4',
            tipo: 'Cucheta Arriba',
          },
          {
            id: 34,
            nombre: '2',
            tipo: 'Matrimimonial',
          },
          {
            id: 33,
            nombre: '1',
            tipo: 'Individual',
          },
        ],
        cantidadDeLugaresLibres: 5,
      },
    ],
  }).as('conLugaresLibres');

  cy.visit('/reservas');
}

function mockearSoloUnaHabitacionSinCamas() {
  cy.server();
  cy.route({
    method: 'GET',
    url: '/api/habitaciones/conLugaresLibres**',
    response: [
      {
        id: 1,
        nombre: 'Roja',
        esPrivada: false,
        camas: [],
        cantidadDeLugaresLibres: 0,
      },
    ],
  }).as('conLugaresLibres');

  cy.visit('/reservas');
}

describe('Renglones: Habitación privada y sin camas', () => {
  it('Si se selecciona una habitación privada, figura la leyenda correspondiente', () => {
    mockearSoloUnaHabitacionPrivada();

    paginaReservas.abrirModalNuevaReserva();

    cy.get('[data-cy=autocomplete-habitacion-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-privada-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-privada-renglon-0]').should('have.attr', 'placeholder', 'Se reservarán todas las camas');

    cy.get('[data-cy=autocomplete-cama-renglon-0]').should('not.exist');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('not.exist');
  });

  it('Si se selecciona una habitación sin camas disponibles, figura la leyenda correspondiente', () => {
    mockearSoloUnaHabitacionSinCamas();

    paginaReservas.abrirModalNuevaReserva();

    cy.get('[data-cy=autocomplete-habitacion-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('have.attr', 'placeholder', 'No tiene camas en esta fecha');

    cy.get('[data-cy=autocomplete-cama-renglon-0]').should('not.exist');
    cy.get('[data-cy=input-privada-renglon-0]').should('not.exist');
  });
});

before(() => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach(() => {
  cy.restoreLocalStorage();
});
