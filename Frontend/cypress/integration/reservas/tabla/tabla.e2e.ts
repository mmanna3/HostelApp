import 'cypress-localstorage-commands';
import { ReservasDelPeriodoDTO } from '../../../../src/store/api/DTOs';
import * as fechaUtils from '../../../../src/utils/Fecha';
import habitaciones from '../../../mocks/habitaciones/2-habitaciones-5-camas';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

describe('Mostrar reservas', (): void => {
  it('Muestra correctamente reservas', (): void => {
    // Leé por favor la doc de cypress y reescribí esto con callbacks

    paginaReservas
      .obtenerCelda(fechaUtils.convertirAString(fechaUtils.hoy()), 1)
      .invoke('attr', 'class')
      .should('contain', 'estadoCheckin');

    paginaReservas
      .obtenerCelda(fechaUtils.convertirAString(fechaUtils.hoy()), 1)
      .invoke('attr', 'data-reserva-id')
      .should('eq', '123');

    paginaReservas.obtenerCelda(fechaUtils.convertirAString(fechaUtils.hoy()), 1).should('contain', 'Semil..');
  });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();

  cy.intercept('/api/habitaciones', habitaciones).as('habitaciones');

  const ayer = fechaUtils.sumarDiasALaFecha(fechaUtils.hoy(), -1);
  const ayerString = fechaUtils.convertirAString(ayer);

  const url = `/api/reservas/vigentes?primeraNoche=${ayerString}&dias=14`;
  const reservasDelPeriodo: ReservasDelPeriodoDTO = {
    reservas: [
      {
        id: 123,
        estado: 1,
        nombreAbreviadoDelPasajero: 'Semil..',
        diaDeCheckin: fechaUtils.convertirAString(ayer),
        diaDeCheckout: fechaUtils.convertirAString(fechaUtils.sumarDiasALaFecha(ayer, 1)),
        camasIds: [1, 2],
      },
    ],
    desde: fechaUtils.convertirAString(ayer),
    hasta: fechaUtils.convertirAString(fechaUtils.sumarDiasALaFecha(ayer, 14)),
  };
  cy.intercept(url, reservasDelPeriodo).as('reservasActuales');

  cy.visit('/reservas');

  cy.wait(['@habitaciones', '@reservasActuales']);
});
