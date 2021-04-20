import 'cypress-localstorage-commands';
import { CamaTipo } from '../../../../src/interfaces/habitacion';
import { IHabitacionParaReservaDTO } from '../../../../src/interfaces/reserva';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

describe('Cabecera con datos del huésped', (): void => {
  it('Antes de darle click a buscar, los campos están bloqueados', (): void => {
    cy.get('[name="DatosMinimosDeHuesped.NombreCompleto"]').should('have.attr', 'readonly');
    cy.get('[name="DatosMinimosDeHuesped.Telefono"]').should('have.attr', 'readonly');
    cy.get('[name="DatosMinimosDeHuesped.Email"]').should('have.attr', 'readonly');
  });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();

  const habitacionesConLugaresLibres: IHabitacionParaReservaDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: false,
      camas: [
        {
          id: 33,
          nombre: '1',
          tipo: CamaTipo.Individual,
        },
      ],
      cantidadDeLugaresLibres: 1,
    },
  ];

  cy.intercept('/api/habitaciones/conLugaresLibres**', habitacionesConLugaresLibres).as('conLugaresLibres');

  cy.visit('/reservas');

  paginaReservas.abrirModalNuevaReserva();
});
