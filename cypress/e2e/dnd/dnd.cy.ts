import '@4tw/cypress-drag-drop';

describe('Burger Constructor E2E - DnD Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            _id: '1',
            name: 'Булка тестовая',
            type: 'bun',
            image: '/test-bun.png',
          },
          {
            _id: '2',
            name: 'Соус тестовый',
            type: 'sauce',
            image: '/test-sauce.png',
          },
        ],
      },
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('[data-test-id^="ingredient-"]')
      .contains('Булка тестовая')
      .as('bunIngredient');

    cy.get('[data-test-id^="ingredient-"]')
      .contains('Соус тестовый')
      .as('sauceIngredient');
  });

  it('добавляет ингредиенты через drag and drop', () => {
    cy.get('@bunIngredient').drag('[data-test-id="burger-drop-target"]');

    cy.get('[data-test-id="burger-drop-target"]')
      .should('contain.text', 'Булка тестовая (верх)')
      .and('contain.text', 'Булка тестовая (низ)');

    cy.get('@sauceIngredient').drag('[data-test-id="burger-drop-target"]');
    cy.get('@sauceIngredient').drag('[data-test-id="burger-drop-target"]');

    cy.get('[data-test-id="burger-drop-target"]').should(
      'contain.text',
      'Соус тестовый'
    );
  });
});
