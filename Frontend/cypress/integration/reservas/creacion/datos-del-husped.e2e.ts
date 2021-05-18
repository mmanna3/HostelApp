import 'cypress-localstorage-commands';
import { HuespedDTO } from '../../../../src/store/api/DTOs';

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

describe('Datos del huésped', (): void => {
  it('Al principio, están todos vacíos excepto el país', (): void => {
    cy.get('[data-cy="dni"]').should('be.empty');
    cy.get('[data-cy="nombre"]').should('be.empty');
    cy.get('[data-cy="pais"]').contains('Argentina');
    cy.get('[data-cy="telefono"]').should('be.empty');
    cy.get('[data-cy="email"]').should('be.empty');
  });

  describe('Al hacer click en Buscar', (): void => {
    it('Si el huésped existe, trae sus datos y muestra popup. Si había datos, los pisa.', (): void => {
      dadoQueExisteElHuespedDeDni('111');

      cy.get('[data-cy="dni"]').type('111');
      cy.get('[data-cy="boton-dni"]').click();
      cy.wait('@datosDelHuesped');

      cy.get('#toast-exito-111').should('be.visible');
      cy.get('#toast-error-111').should('not.exist');

      cy.get('[data-cy="pais"]').contains('Alemania');
      cy.get('[data-cy="dni"]').should('have.value', '111');
      cy.get('[data-cy="nombre"]').should('have.value', 'Kvothe');
      cy.get('[data-cy="telefono"]').should('have.value', '44610000');
      cy.get('[data-cy="email"]').should('have.value', 'elcolorado@gmail.edu');
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
