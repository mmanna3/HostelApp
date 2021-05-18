import 'cypress-localstorage-commands';
import { CamaTipoEnum, HabitacionConLugaresLibresDTO } from '../../../../src/store/api/DTOs';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

function dadoQueHayDosHabitacionesConLugaresLibres(): void {
  const habitacionesConLugaresLibres: HabitacionConLugaresLibresDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: false,
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

describe('Renglones', (): void => {
  describe.only('Casos generales', (): void => {
    beforeEach((): void => {
      dadoQueHayDosHabitacionesConLugaresLibres();
      paginaReservas.abrirModalNuevaReserva();
    });

    it('El usuario puede agregar renglones', (): void => {
      cy.get('[data-cy=boton-agregar-cama]').click();
      cy.get('[data-cy=autocomplete-habitacion-renglon-1]').should('be.visible');
      cy.get('[data-cy=autocomplete-cama-renglon-1]').should('be.visible');
    });

    it('Al cambiar la fecha, se reinician los renglones', (): void => {
      cy.get('[data-cy=boton-agregar-cama]').click();
      cy.get('#autocomplete-habitacion-renglon-0').type('azul{enter}');
      cy.get('#autocomplete-cama-renglon-0').type('Matri{enter}');

      cy.get('.react-daterange-picker__calendar-button').click();
      cy.get('.react-calendar__navigation__next-button').click();
      cy.get('.react-calendar__month-view__days__day').contains('11').click();
      cy.get('.react-calendar__month-view__days__day').contains('12').click();

      cy.wait('@conLugaresLibres');

      cy.get('#autocomplete-habitacion-renglon-0').contains('Roja');
      cy.get('#autocomplete-cama-renglon-0').contains('Indi1');
    });

    it.only('Al eliminar un renglón, se mantienen los datos de los de abajo', (): void => {
      cy.get('[data-cy=boton-agregar-cama]').click();
      cy.get('[data-cy=boton-agregar-cama]').click();

      cy.get('#autocomplete-habitacion-renglon-2').type('azul{enter}');
      cy.get('#autocomplete-cama-renglon-2').type('Matri{enter}');

      cy.get('[data-cy=eliminar-renglon-1]').click();

      cy.get('#autocomplete-habitacion-renglon-2').contains('Azul');
      cy.get('#autocomplete-cama-renglon-2').contains('MatriAzul');
    });
  });

  describe('Habitación privada y sin camas', (): void => {
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
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();
  cy.visit('/reservas');
});
