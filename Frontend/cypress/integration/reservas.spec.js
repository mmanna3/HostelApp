import "cypress-localstorage-commands";

//Que no se rompa en habitación sin camas
//Que no se rompa en habitación privada

describe('Crear reservas', () => {   

    it('Puede agregar renglones', () => {

        cy.contains('button', 'Cargar nueva')
            .click()

        cy.contains('button', 'Agregar cama')
            .click()

        cy.get('.button.is-static:visible:contains("Hab.")')
            .should('have.length', 2)
    })

    it('Al cambiar la fecha, se reinician los renglones', () => {

      cy.contains('button', 'Cargar nueva')
          .click()

      cy.contains('button', 'Agregar cama')
          .click()

      cy.get('#habitacion-renglon-0')
          .select('2')

      cy.get('[name="CamasIds[0]"]')
          .select('28')

      cy.get('.react-daterange-picker__calendar-button')
         .click()
      
      cy.get('.react-calendar__navigation__next-button')
         .click()

      cy.get('.react-calendar__month-view__days__day').contains('11')
         .click()
      
      cy.get('.react-calendar__month-view__days__day').contains('12')
         .click()

      cy.get('.button.is-static:visible:contains("Hab.")')
         .should('have.length', 1)

      cy.get('#habitacion-renglon-0')
         .should('contain.value', 1)

      cy.get('[name="CamasIds[0]"]')
         .should('contain.value', 31)
  })

    it('Al eliminar un renglón, se mantienen los datos de los de abajo', () => {

      cy.contains('button', 'Cargar nueva')
         .click()

      cy.contains('button', 'Agregar cama')
         .click()

      cy.contains('button', 'Agregar cama')
         .click()

      cy.get('#habitacion-renglon-2')
         .select('2')
      
      cy.get('[name="CamasIds[2]"]')
         .select('28')

      cy.get('#eliminar-renglon-1')
         .click()
      
      cy.get('#habitacion-renglon-2')
         .should('contain.value', 2)

      cy.get('[name="CamasIds[2]"]')
         .should('contain.value', 28)
    })
})

before(() => {    
    cy.login();
    cy.saveLocalStorage();
  });
  
beforeEach(() => {
   cy.restoreLocalStorage();   

   cy.server()
   cy.route({
      method: 'GET',
      url: '/api/habitaciones/conLugaresLibres**',
      response: [
        {
           "id":1,
           "nombre":"Roja",
           "esPrivada":false,
           "camas":[
              {
                 "id":31,
                 "nombre":"4",
                 "tipo":"Cucheta Abajo"
              },
              {
                 "id":32,
                 "nombre":"4",
                 "tipo":"Cucheta Arriba"
              },
              {
                 "id":34,
                 "nombre":"2",
                 "tipo":"Matrimimonial"
              },
              {
                 "id":33,
                 "nombre":"1",
                 "tipo":"Individual"
              }
           ],
           "cantidadDeLugaresLibres":5
        },
        {
           "id":2,
           "nombre":"Azul",
           "esPrivada":false,
           "camas":[
              {
                 "id":29,
                 "nombre":"Matri",
                 "tipo":"Matrimimonial"
              },
              {
                 "id":27,
                 "nombre":"1",
                 "tipo":"Individual"
              },
              {
                 "id":28,
                 "nombre":"2",
                 "tipo":"Individual"
              }
           ],
           "cantidadDeLugaresLibres":4
        }
     ]
    }).as('conLugaresLibres')
    
    cy.visit('/reservas')
    
    cy.wait('@conLugaresLibres')
});