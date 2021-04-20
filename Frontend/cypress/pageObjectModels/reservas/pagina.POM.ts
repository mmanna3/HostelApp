export function obtenerCelda(dia: number, camaId: number): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[data-dia="${dia}"][data-cama-id="${camaId}"]`);
}

export function abrirModalNuevaReserva(): void {
  cy.contains('button', 'Nueva reserva').click();

  cy.wait('@conLugaresLibres');
}
