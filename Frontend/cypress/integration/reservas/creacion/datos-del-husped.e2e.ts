import 'cypress-localstorage-commands';
import { PasajeroDTO } from '../../../../src/store/api/DTOs';

function dadoQueExisteElPasajeroDeDni(dni: string): void {
  const pasajero: PasajeroDTO = {
    id: 1,
    nombreCompleto: 'Kvothe',
    dniOPasaporte: '111',
    pais: 'de',
    telefono: '44610000',
    email: 'elcolorado@gmail.edu',
  };
  cy.intercept(`/api/pasajeros/obtenerPorDniOPasaporte?dniOPasaporte=${dni}`, pasajero).as('datosDelPasajero');
}

describe('Datos del huésped', (): void => {
  it('Al principio, están todos vacíos excepto el país', (): void => {
    cy.get('[data-cy="dni"]').should('be.empty');
    cy.get('[data-cy="nombre"]').should('be.empty');
    cy.get('[data-cy="pais"]').contains('Argentina');
    cy.get('[data-cy="telefono"]').should('be.empty');
    cy.get('[data-cy="email"]').should('be.empty');
  });

  describe('Al hacer click en Buscar', (): void => {
    it('Si el huésped existe, trae sus datos y muestra popup de éxito. Si había datos, los pisa.', (): void => {
      dadoQueExisteElPasajeroDeDni('111');

      cy.get('[data-cy="dni"]').type('111');
      cy.get('[data-cy="boton-dni"]').click();
      cy.wait('@datosDelPasajero');

      cy.get('#toast-exito-111').should('be.visible');
      cy.get('#toast-error-111').should('not.exist');

      cy.get('[data-cy="pais"]').contains('Alemania');
      cy.get('[data-cy="dni"]').should('have.value', '111');
      cy.get('[data-cy="nombre"]').should('have.value', 'Kvothe');
      cy.get('[data-cy="telefono"]').should('have.value', '44610000');
      cy.get('[data-cy="email"]').should('have.value', 'elcolorado@gmail.edu');
    });

    it('Si el huésped no existe, no trae datos y muestra popup de error.', (): void => {
      cy.get('[data-cy="dni"]').type('404');
      cy.get('[data-cy="boton-dni"]').click();

      cy.get('[data-cy="telefono"]').type('45678888');

      cy.get('#toast-error').should('be.visible');
      cy.get('#toast-exito-404').should('not.exist');

      cy.get('[data-cy="dni"]').should('be.empty');
      cy.get('[data-cy="nombre"]').should('be.empty');
      cy.get('[data-cy="pais"]').contains('Argentina');
      cy.get('[data-cy="telefono"]').should('have.value', '45678888');
      cy.get('[data-cy="email"]').should('be.empty');
    });
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
