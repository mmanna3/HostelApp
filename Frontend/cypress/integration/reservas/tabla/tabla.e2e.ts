import 'cypress-localstorage-commands';
import { ReservasDelPeriodoDTO } from '../../../../src/interfaces/reserva';
import * as fechaUtils from '../../../../src/utils/Fecha';
import habitaciones from '../../../mocks/habitaciones/2-habitaciones-5-camas';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

describe('Mostrar reservas', (): void => {
  it('Muestra correctamente reservas', (): void => {
    paginaReservas.obtenerCelda(fechaUtils.hoy().getDate(), 1).invoke('attr', 'class').should('contain', 'Celda_color');
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

  const url = `/api/reservas?primeraNoche=${ayerString}&dias=14`;
  const reservasDelPeriodo: ReservasDelPeriodoDTO = {
    reservas: [
      {
        id: 1,
        diaDeCheckin: ayer.getDate(),
        diaDeCheckout: ayer.getDate() + 1,
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
