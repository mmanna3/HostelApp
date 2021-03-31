export function obtenerCelda(dia: number, camaId: number) {
  return cy.get(`[data-dia="${dia}"][data-cama-id="${camaId}"]`);
}

export function abrirModalCargarNueva() {
  cy.contains('button', 'Cargar nueva').click();

  cy.wait('@conLugaresLibres');
}
