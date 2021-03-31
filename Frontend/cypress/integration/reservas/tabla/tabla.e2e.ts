import 'cypress-localstorage-commands';
import habitaciones from '../../../mocks/habitaciones/2-habitaciones-5-camas';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';
import * as fechaUtils from '../../../utils/fecha';

describe('Mostrar reservas', (): void => {
  it('Muestra correctamente reservas', (): void => {
    cy.contains('h1', 'Reservas').should('have.length', 1);
    paginaReservas.obtenerCelda(fechaUtils.diaDeHoy(), 1).invoke('attr', 'class').should('contain', 'Celda_color');
  });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();

  cy.intercept('/api/habitaciones', habitaciones).as('habitaciones');

  cy.intercept('/api/reservas/actuales', {
    reservas: [
      {
        id: 1,
        diaInicio: fechaUtils.diaDeHoy(),
        diaFin: fechaUtils.diaDeHoy(),
        aNombreDe: 'Elliot',
        camasIds: [1, 2],
      },
    ],
    desde: fechaUtils.fechaDeHoy(),
    hasta: fechaUtils.fechaDentroDe30Dias(),
  }).as('reservasActuales');

  cy.visit('/reservas');

  cy.wait(['@habitaciones', '@reservasActuales']);
});
