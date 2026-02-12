describe('Document list', () => {
  beforeEach(() => {
    cy.visit('/documents');
  });

  it('shows list title and Upload link', () => {
    cy.contains('h1', 'Documents').should('be.visible');
    cy.contains('a', 'Upload').should('have.attr', 'href', '/documents/upload');
  });

  it('navigates to upload page via Upload link', () => {
    cy.contains('a', 'Upload').click();
    cy.url().should('include', '/documents/upload');
    cy.contains('h1', 'Upload document').should('be.visible');
  });

  it('shows document table or empty state', () => {
    cy.get('main').should('be.visible');
    cy.get('body').then(($body) => {
      const hasTable = $body.find('table').length > 0;
      const hasLoading = $body.text().includes('Loading');
      const hasNoData = $body.text().includes('No data');
      expect(hasTable || hasLoading || hasNoData).to.be.true;
    });
  });

  it('opens document detail when clicking document name', () => {
    cy.contains('a', 'Project brief.pdf', { timeout: 10000 }).click();
    cy.url().should('include', '/documents/1');
    cy.contains('Back to list').should('be.visible');
    cy.contains('Project brief.pdf').should('be.visible');
  });
});
