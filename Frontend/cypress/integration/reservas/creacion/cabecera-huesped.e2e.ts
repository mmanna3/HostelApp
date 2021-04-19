import 'cypress-localstorage-commands';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

describe('Cabecera con datos del huésped', (): void => {
  it('Antes de darle click a buscar, los campos están bloqueados', (): void => {
    cy.get('[name="DatosMinimosDeHuesped.NombreCompleto"]').should('have.attr', 'readonly');
    cy.get('[name="DatosMinimosDeHuesped.Telefono"]').should('have.attr', 'readonly');
    cy.get('[name="DatosMinimosDeHuesped.Email"]').should('have.attr', 'readonly');
  });

  // it('Al cambiar la fecha, se reinician los renglones', () => {
  //   cy.contains('button', 'Agregar cama').click();

  //   cy.get('#habitacion-renglon-0').select('2');

  //   cy.get('[name="CamasIds[0]"]').select('28');

  //   cy.get('.react-daterange-picker__calendar-button').click();

  //   cy.get('.react-calendar__navigation__next-button').click();

  //   cy.get('.react-calendar__month-view__days__day').contains('11').click();

  //   cy.get('.react-calendar__month-view__days__day').contains('12').click();

  //   cy.wait('@conLugaresLibres');

  //   cy.get('.button.is-static:visible:contains("Hab.")').should('have.length', 1);

  //   cy.get('#habitacion-renglon-0').should('contain.value', 1);

  //   cy.get('[name="CamasIds[0]"]').should('contain.value', 31);
  // });

  // it('Al eliminar un renglón, se mantienen los datos de los de abajo', () => {
  //   cy.contains('button', 'Agregar cama').click();

  //   cy.contains('button', 'Agregar cama').click();

  //   cy.get('#habitacion-renglon-2').select('2');

  //   cy.get('[name="CamasIds[2]"]').select('28');

  //   cy.get('#eliminar-renglon-1').click();

  //   cy.get('#habitacion-renglon-2').should('contain.value', 2);

  //   cy.get('[name="CamasIds[2]"]').should('contain.value', 28);
  // });

  // it('Al seleccionar una habitación sin camas disponibles, figura la leyenda correspondiente', () => {
  //   cy.get('#habitacion-renglon-0').select('4');

  //   cy.get('#renglon-sin-camas-0').should('contain.value', 'No tiene en esta fecha');
  // });

  // it('Al seleccionar una habitación privada, figura la leyenda correspondiente', () => {
  //   cy.get('#habitacion-renglon-0').select('3');

  //   cy.get('#habitacion-privada-renglon-0').should('contain.value', 3);

  //   cy.get('#habitacion-privada-renglon-0').should('contain.text', 'Todas - Habitación privada');
  // });
});

before((): void => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach((): void => {
  cy.restoreLocalStorage();

  cy.intercept('/api/habitaciones/conLugaresLibres**', [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: false,
      camas: [
        {
          id: 33,
          nombre: '1',
          tipo: 'Individual',
        },
      ],
      cantidadDeLugaresLibres: 1,
    },
  ]).as('conLugaresLibres');

  cy.visit('/reservas');

  paginaReservas.abrirModalNuevaReserva();
});
