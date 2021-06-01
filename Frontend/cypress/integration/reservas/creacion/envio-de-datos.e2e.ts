import 'cypress-localstorage-commands';
import { CamaTipoEnum, HabitacionConLugaresLibresDTO, PasajeroDTO } from '../../../../src/store/api/DTOs';
import { convertirAString, hoy } from '../../../../src/utils/Fecha';
import * as paginaReservas from '../../../pageObjectModels/reservas/pagina.POM';

function dadoQueHayDosHabitacionesConLugaresLibres(): void {
  const habitacionesConLugaresLibres: HabitacionConLugaresLibresDTO[] = [
    {
      id: 1,
      nombre: 'Roja',
      esPrivada: true,
      camas: [
        {
          id: 30,
          nombre: 'Indi1',
          tipo: CamaTipoEnum.Individual,
          nombreHabitacion: 'Roja',
        },
        {
          id: 31,
          nombre: 'Indi2',
          tipo: CamaTipoEnum.Matrimonial,
          nombreHabitacion: 'Roja',
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
          nombreHabitacion: 'Azul',
        },
        {
          id: 29,
          nombre: 'MatriAzul',
          tipo: CamaTipoEnum.Matrimonial,
          nombreHabitacion: 'Azul',
        },
      ],
      cantidadDeLugaresLibres: 3,
    },
  ];
  cy.intercept('/api/habitaciones/conLugaresLibres**', habitacionesConLugaresLibres).as('conLugaresLibres');
}

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

function dadoQueAlEnviarLosDatosElServidorRespondeUn200(): void {
  cy.intercept('POST', '/api/reservas*', { id: 1 }).as('envioDeDatos');
}

function cargarDatosDelPasajero(): void {
  dadoQueExisteElPasajeroDeDni('111');
  cy.get('[data-cy="dni"]').type('111');
  cy.get('[data-cy="boton-dni"]').click();
  cy.wait('@datosDelPasajero');
}

function cargarCheckinCheckout(): void {
  cy.get('.react-daterange-picker__calendar-button').click();
  cy.get('.react-calendar__navigation__next-button').click();
  cy.get('.react-calendar__month-view__days__day').contains('11').click();
  cy.get('.react-calendar__month-view__days__day').contains('12').click();

  cy.wait('@conLugaresLibres');
}

function cargarRenglones(): void {
  cy.get('#autocomplete-habitacion-renglon-0').type('azul{enter}');
  cy.get('#autocomplete-cama-renglon-0').type('Matri{enter}');

  cy.get('[data-cy=boton-agregar-cama]').click();
  cy.get('#autocomplete-habitacion-renglon-1').type('azul{enter}');
  cy.get('#autocomplete-cama-renglon-1').type('Indi{enter}');

  cy.get('[data-cy=boton-agregar-cama]').click();
}

describe('Envío de datos', (): void => {
  it('Al hacer click en el botón, se envían todos los datos ingresados', (): void => {
    dadoQueHayDosHabitacionesConLugaresLibres();
    dadoQueAlEnviarLosDatosElServidorRespondeUn200();

    paginaReservas.abrirModalNuevaReserva();

    cargarCheckinCheckout();
    cargarDatosDelPasajero();
    cargarRenglones();

    cy.get('[data-cy=confirmar]').click();

    let diaDeCheckin = hoy();
    diaDeCheckin.setDate(11);
    diaDeCheckin.setMonth(hoy().getMonth() + 1);

    let diaDeCheckout = hoy();
    diaDeCheckout.setDate(12);
    diaDeCheckout.setMonth(hoy().getMonth() + 1);

    const form = {
      PasajeroTitular: {
        dniOPasaporte: '111',
        email: 'elcolorado@gmail.edu',
        nombreCompleto: 'Kvothe',
        pais: 'de',
        telefono: '44610000',
      },
      camasIds: [29, 52],
      canal: 'Presencial',
      cantidadDePasajeros: 1,
      diaDeCheckin: convertirAString(diaDeCheckin),
      diaDeCheckout: convertirAString(diaDeCheckout),
      habitacionesPrivadasIds: [1],
      horaEstimadaDeLlegada: '11:00',
    };

    cy.wait('@envioDeDatos').its('request.body').should('deep.equal', Object.create(form));
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
