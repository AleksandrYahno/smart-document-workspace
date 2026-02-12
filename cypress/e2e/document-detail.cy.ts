describe('Document detail', () => {
  it('shows back link and document content for valid id', () => {
    cy.visit('/documents/1');
    cy.contains('a', 'Back to list').should('be.visible').and('have.attr', 'href', '/documents');
    cy.contains('Project brief.pdf').should('be.visible');
  });

  it('shows error for invalid id', () => {
    cy.visit('/documents/invalid-id-999');
    cy.contains('a', 'Back to list').should('be.visible');
    cy.contains(/An error occurred|Document not found/, { timeout: 10000 }).should('be.visible');
  });

  it('navigates back to list', () => {
    cy.visit('/documents/1');
    cy.contains('a', 'Back to list').click();
    cy.url().should('include', '/documents');
    cy.contains('h1', 'Documents').should('be.visible');
  });
});
