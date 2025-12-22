/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('mockAuth', () => {
  const user = {
    email: 'test@example.com',
    name: 'Test User',
  };
  const success = true;

  cy.intercept('POST', '**/auth/login', {
    statusCode: 200,
    body: {
      success,
      accessToken: 'Bearer some-access-token',
      refreshToken: 'some-refresh-token',
      user,
    },
  }).as('login');

  cy.intercept('POST', '**/auth/register', {
    statusCode: 200,
    body: {
      success,
      user,
      accessToken: 'Bearer some-access-token',
      refreshToken: 'some-refresh-token',
    },
  }).as('register');

  cy.intercept('PATCH', '**/auth/user', {
    statusCode: 200,
    body: {
      success,
      user,
    },
  }).as('updateUser');

  cy.intercept('POST', '**/auth/logout', {
    statusCode: 200,
    body: {
      success,
      message: 'Successful logout',
    },
  }).as('logout');

  cy.intercept('POST', '**/auth/token', {
    statusCode: 200,
    body: {
      success,
      accessToken: 'Bearer new-access-token',
      refreshToken: 'new-refresh-token',
    },
  }).as('refreshToken');

  cy.intercept('GET', '**/auth/user', {
    statusCode: 200,
    body: {
      success,
      user,
    },
  }).as('getUser');

  cy.intercept('POST', '**/password-reset/reset', {
    statusCode: 200,
    body: {
      success,
      message: 'Password successfully reset',
    },
  }).as('resetPassword');

  cy.intercept('POST', '**/password-reset', {
    statusCode: 200,
    body: {
      success,
      message: 'Reset email sent',
    },
  }).as('restorePassword');
});

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mockAuth(): Chainable<void>;
      login(email: string, password:string): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */