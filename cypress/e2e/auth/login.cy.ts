describe('Login Flow', () => {
  beforeEach(() => {
    cy.mockAuth();
    cy.visit('/login');
  });

  it('should allow a user to log in', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait('@login');

    cy.url().should('include', '/');
  });
});
