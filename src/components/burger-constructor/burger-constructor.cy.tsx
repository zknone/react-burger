import { mount } from 'cypress/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from './burger-constructor';
import { Provider } from 'react-redux';
import { store } from '../../store';
import '@4tw/cypress-drag-drop';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { MemoryRouter } from 'react-router-dom';
import { IngredientType } from '../../types/types';
import { BASE_API_URL } from '../../consts';

describe('renders correctly', () => {
  beforeEach(() => {
    if (!document.getElementById('modal-root')) {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex' }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </DndProvider>
        </MemoryRouter>
      </Provider>
    );

    cy.get('[data-test-id^="ingredient-"]')
      .filter(':contains("булка")')
      .first()
      .as('bunIngredient');

    cy.get('@bunIngredient').drag('[data-test-id="burger-drop-target"]');

    cy.get('[data-test-id^="ingredient-"]')
      .filter((_, el) => el.innerText.toLowerCase().includes('соус'))
      .first()
      .as('sauceIngredient');

    cy.get('@sauceIngredient').drag('[data-test-id="burger-drop-target"]');
    cy.get('@sauceIngredient').drag('[data-test-id="burger-drop-target"]');
  });

  it('should add bun ingredient correctly', () => {
    cy.get('@bunIngredient')
      .find('img')
      .invoke('attr', 'alt')
      .then((bunName) => {
        cy.get('[data-test-id="burger-drop-target"]')
          .should('contain.text', `${bunName} (верх)`)
          .and('contain.text', `${bunName} (низ)`);

        cy.window()
          .its('store')
          .invoke('getState')
          .then((state) => {
            const { bun } = state.burgerConstructor;
            expect(bun?.name).to.equal(bunName);
            expect(bun?.type).to.equal('bun');
          });
      });
  });

  it('dnd new sauce ingredient', () => {
    cy.get('[data-test-id="burger-drop-target"]')
      .find('ul')
      .invoke('css', 'height', '300px');

    cy.get('@sauceIngredient')
      .find('img')
      .invoke('attr', 'alt')
      .then((sauceName) => {
        cy.get('[data-test-id="burger-drop-target"]').should(
          'contain.text',
          sauceName
        );

        cy.window()
          .its('store')
          .invoke('getState')
          .then((state) => {
            const { selectedIngredients } = state.burgerConstructor;
            expect(
              selectedIngredients.some(
                (item: IngredientType) =>
                  item.name === sauceName && item.type === 'sauce'
              )
            ).to.be.true;
          });
      });
  });

  it('sends order', () => {
    cy.intercept('POST', `${BASE_API_URL}/orders`, {
      statusCode: 200,
      body: {
        success: true,
        name: 'Тестовый бургер',
        order: { number: 99999 },
      },
    }).as('sendOrder');

    cy.get('[data-test-id="burger-send-button"]').click();

    cy.wait('@sendOrder').its('response.statusCode').should('eq', 200);
    cy.get('#modal-root').find('[data-test-id="burger-modal"]').should('exist');
  });
});
