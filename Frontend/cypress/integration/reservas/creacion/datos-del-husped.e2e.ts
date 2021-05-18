import 'cypress-localstorage-commands';

describe('Datos del huésped', (): void => {
  it('Al principio, están todos vacíos excepto el país', (): void => {
    cy.get('[data-cy="dni"]').should('be.empty');
    cy.get('[data-cy="nombre"]').should('be.empty');
    cy.get('[data-cy="pais"]').contains('Argentina');
    cy.get('[data-cy="telefono"]').should('be.empty');
    cy.get('[data-cy="email"]').should('be.empty');
  });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();
  cy.visit('/reservas');
  cy.contains('button', 'Nueva reserva').click();
});
