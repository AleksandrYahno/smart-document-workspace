describe('Upload flow', () => {
  beforeEach(() => {
    cy.visit('/documents/upload');
  });

  it('shows upload title and step labels', () => {
    cy.contains('h1', 'Upload document').should('be.visible');
    cy.contains('Select file').should('be.visible');
    cy.contains('Metadata').should('be.visible');
    cy.contains('Review').should('be.visible');
  });

  it('shows file step content', () => {
    cy.contains('Drag and drop a file here, or click to select').should('be.visible');
  });

  it('cannot proceed without file and shows validation on Next', () => {
    cy.contains('button', 'Next').click();
    cy.contains('Select a file').should('be.visible');
  });

  it('goes to Metadata step after selecting file and Next', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test'), fileName: 'test.pdf' },
      { force: true },
    );
    cy.contains('button', 'Next').click();
    cy.contains('Title').should('be.visible');
    cy.contains('Description').should('be.visible');
  });

  it('can go back from Metadata to File step', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test'), fileName: 'test.pdf' },
      { force: true },
    );
    cy.contains('button', 'Next').click();
    cy.contains('button', 'Back').click();
    cy.contains('Drag and drop a file here').should('be.visible');
  });

  it('completes full flow and redirects to documents', () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('test'), fileName: 'doc.pdf' },
      { force: true },
    );
    cy.contains('button', 'Next').click();
    cy.get('input[name="title"]').type('E2E Test Doc');
    cy.get('select').first().select('Contracts');
    cy.get('select').eq(1).select('View');
    cy.contains('button', 'Next').click();
    cy.contains('E2E Test Doc').should('be.visible');
    cy.contains('button', 'Upload').click();
    cy.url().should('include', '/documents', { timeout: 10000 });
    cy.contains('h1', 'Documents').should('be.visible');
  });
});
