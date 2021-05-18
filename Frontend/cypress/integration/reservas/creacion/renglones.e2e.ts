import 'cypress-localstorage-commands';
import { CamaTipoEnum, HabitacionConLugaresLibresDTO } from '../../../../src/store/api/DTOs';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

function dadoQueLaPrimeraHabitacionConLugaresLibresEsPrivada(): void {
  const habitacionesConLugaresLibres: HabitacionConLugaresLibresDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: true,
      camas: [
        {
          id: 33,
          nombre: '1',
          tipo: CamaTipoEnum.Individual,
        },
      ],
      cantidadDeLugaresLibres: 1,
    },
  ];
  cy.intercept('/api/habitaciones/conLugaresLibres**', habitacionesConLugaresLibres).as('conLugaresLibres');
}

function dadoQueLaPrimeraHabitacionConLugaresLibresNoTieneLugaresLibres(): void {
  const habitacionesConLugaresLibres: HabitacionConLugaresLibresDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: false,
      camas: [],
      cantidadDeLugaresLibres: 0,
    },
  ];
  cy.intercept('/api/habitaciones/conLugaresLibres**', habitacionesConLugaresLibres).as('conLugaresLibres');
}

describe('Renglones: Habitación privada y sin camas', (): void => {
  it('Si se selecciona una habitación privada, figura la leyenda correspondiente', (): void => {
    dadoQueLaPrimeraHabitacionConLugaresLibresEsPrivada();

    paginaReservas.abrirModalNuevaReserva();

    cy.get('[data-cy=autocomplete-habitacion-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-privada-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-privada-renglon-0]').should('have.attr', 'placeholder', 'Se reservarán todas las camas');

    cy.get('[data-cy=autocomplete-cama-renglon-0]').should('not.exist');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('not.exist');
  });

  it('Si se selecciona una habitación sin camas disponibles, figura la leyenda correspondiente', (): void => {
    dadoQueLaPrimeraHabitacionConLugaresLibresNoTieneLugaresLibres();

    paginaReservas.abrirModalNuevaReserva();

    cy.get('[data-cy=autocomplete-habitacion-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('be.visible');
    cy.get('[data-cy=input-no-tiene-camas-renglon-0]').should('have.attr', 'placeholder', 'No tiene camas en esta fecha');

    cy.get('[data-cy=autocomplete-cama-renglon-0]').should('not.exist');
    cy.get('[data-cy=input-privada-renglon-0]').should('not.exist');
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
