describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('redirects / to /documents', () => {
    cy.url().should('include', '/documents', { timeout: 10000 });
    cy.contains('h1', 'Documents').should('be.visible', { timeout: 10000 });
  });

  it('header shows app title and Analytics link', () => {
    cy.visit('/documents');
    cy.get('header').first().within(() => {
      cy.get('a[href="/documents"]').should('be.visible');
      cy.get('a[href="/analytics"]').should('be.visible');
    });
  });

  it('navigates to Analytics from header', () => {
    cy.visit('/documents');
    cy.contains('a', 'Analytics').click();
    cy.url().should('include', '/analytics');
    cy.contains('h1', 'Analytics').should('be.visible');
  });

  it('navigates to Documents from header', () => {
    cy.visit('/analytics');
    cy.get('header').first().find('a[href="/documents"]').click();
    cy.url().should('include', '/documents');
    cy.contains('h1', 'Documents').should('be.visible');
  });

  it('unknown path redirects to /documents', () => {
    cy.visit('/unknown-page');
    cy.url().should('include', '/documents', { timeout: 10000 });
  });
});
