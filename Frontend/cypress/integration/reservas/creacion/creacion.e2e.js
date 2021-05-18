import 'cypress-localstorage-commands';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

describe('Crear reservas', () => {
  it('Al seleccionar una habitación sin camas disponibles, figura la leyenda correspondiente', () => {
    cy.get('#habitacion-renglon-0').select('4');

    cy.get('#renglon-sin-camas-0').should('contain.value', 'No tiene en esta fecha');
  });

  it('Al seleccionar una habitación privada, figura la leyenda correspondiente', () => {
    cy.get('#habitacion-renglon-0').select('3');

    cy.get('#habitacion-privada-renglon-0').should('contain.value', 3);

    cy.get('#habitacion-privada-renglon-0').should('contain.text', 'Todas - Habitación privada');
  });
});

before(() => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach(() => {
  cy.restoreLocalStorage();

  cy.server();
  cy.route({
    method: 'GET',
    url: '/api/habitaciones/conLugaresLibres**',
    response: [
      {
        id: 1,
        nombre: 'Roja',
        esPrivada: false,
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
      {
        id: 2,
        nombre: 'Azul',
        esPrivada: false,
        camas: [
          {
            id: 29,
            nombre: 'Matri',
            tipo: 'Matrimimonial',
          },
          {
            id: 27,
            nombre: '1',
            tipo: 'Individual',
          },
          {
            id: 28,
            nombre: '2',
            tipo: 'Individual',
          },
        ],
        cantidadDeLugaresLibres: 4,
      },
      {
        id: 3,
        nombre: 'Priv',
        esPrivada: true,
        camas: [
          {
            id: 50,
            nombre: 'Matri',
            tipo: 'Matrimimonial',
          },
          {
            id: 60,
            nombre: '1',
            tipo: 'Individual',
          },
        ],
        cantidadDeLugaresLibres: 3,
      },
      {
        id: 4,
        nombre: 'Vacía',
        esPrivada: false,
        camas: [],
        cantidadDeLugaresLibres: 0,
      },
    ],
  }).as('conLugaresLibres');

  cy.visit('/reservas');

  paginaReservas.abrirModalNuevaReserva();
});
