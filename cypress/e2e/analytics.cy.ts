describe('Analytics page', () => {
  beforeEach(() => {
    cy.visit('/analytics');
  });

  it('shows analytics title', () => {
    cy.contains('h1', 'Analytics').should('be.visible');
  });

  it('shows date filter inputs', () => {
    cy.get('input[type="date"]').should('have.length', 2);
  });

  it('shows chart sections', () => {
    cy.contains('Storage by file type').should('be.visible');
    cy.contains('Upload activity').should('be.visible');
    cy.contains('Documents by status').should('be.visible');
  });
});
