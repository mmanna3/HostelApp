//hacer logout y login fallido

describe('Login', () => {
  it('Exitoso', () => {
    acceder();

    irAHabitaciones();

    cy.contains('h1', 'Habitaciones').should('be.visible');
  });
});

const acceder = () => {
  cy.visit('/');

  cy.get('[name="username"]').type('yo');

  cy.get('[name="password"]').type('123');

  cy.get('[type="submit"]').click();
};

const irAHabitaciones = () => {
  cy.contains('a', 'Habitaciones').click();
};

before(() => {
  cy.server();

  cy.route({
    method: 'POST',
    url: '/api/usuarios/autenticar',
    response: { id: 3, username: 'yo', firstName: 'nombre', lastName: 'apellido', token: 'untokencualquiera' },
  });

  cy.route({
    method: 'GET',
    url: 'api/habitaciones',
    response: [
      {
        id: 2144,
        nombre: 'Azul',
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: null,
        camasIndividuales: [
          { id: 27, nombre: '1', tipo: 'Individual' },
          { id: 28, nombre: '2', tipo: 'Individual' },
        ],
        camasCuchetas: [],
        camasMatrimoniales: [{ id: 29, nombre: 'Matri', tipo: 'Matrimimonial' }],
      },
      {
        id: 2145,
        nombre: 'La deseada',
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: null,
        camasIndividuales: [],
        camasCuchetas: [],
        camasMatrimoniales: [{ id: 30, nombre: '1', tipo: 'Matrimimonial' }],
      },
      {
        id: 2146,
        nombre: 'Roja',
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: null,
        camasIndividuales: [{ id: 33, nombre: '1', tipo: 'Individual' }],
        camasCuchetas: [
          {
            id: 7,
            nombre: null,
            abajo: { id: 31, nombre: '4', tipo: 'Cucheta Abajo' },
            arriba: { id: 32, nombre: '4', tipo: 'Cucheta Arriba' },
          },
        ],
        camasMatrimoniales: [{ id: 34, nombre: '2', tipo: 'Matrimimonial' }],
      },
      {
        id: 2147,
        nombre: 'Verde',
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: null,
        camasIndividuales: [{ id: 35, nombre: '1', tipo: 'Individual' }],
        camasCuchetas: [],
        camasMatrimoniales: [{ id: 36, nombre: 'm', tipo: 'Matrimimonial' }],
      },
      {
        id: 2148,
        nombre: 'Amarilla',
        tieneBanio: false,
        esPrivada: false,
        informacionAdicional: null,
        camasIndividuales: [
          { id: 37, nombre: '1', tipo: 'Individual' },
          { id: 38, nombre: '2', tipo: 'Individual' },
          { id: 39, nombre: '4', tipo: 'Individual' },
          { id: 40, nombre: '5', tipo: 'Individual' },
        ],
        camasCuchetas: [],
        camasMatrimoniales: [],
      },
      {
        id: 2149,
        nombre: 'Privada soy',
        tieneBanio: false,
        esPrivada: true,
        informacionAdicional: 'a',
        camasIndividuales: [{ id: 41, nombre: '1', tipo: 'Individual' }],
        camasCuchetas: [],
        camasMatrimoniales: [],
      },
    ],
  });
});
