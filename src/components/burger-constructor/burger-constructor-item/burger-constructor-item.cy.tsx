import { mount } from 'cypress/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructorItem from './burger-constructor-item';
import { ExtendedIngredientType } from '../../../types/types';

describe('BurgerConstructorItem', () => {
  const ingredient: ExtendedIngredientType = {
    _id: '123',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 123,
    fat: 123,
    carbohydrates: 123,
    calories: 123,
    price: 123,
    image: 'https://via.placeholder.com/150',
    image_mobile: 'https://via.placeholder.com/150',
    image_large: 'https://via.placeholder.com/150',
    __v: 0,
    uniqueId: '1123',
  };

  it('renders correctly', () => {
    mount(
      <DndProvider backend={HTML5Backend}>
        <BurgerConstructorItem
          ingredient={ingredient}
          index={0}
          handleClose={cy.spy().as('handleClose')}
          moveIngredient={cy.spy().as('moveIngredient')}
        />
      </DndProvider>
    );

    cy.get('li').should('be.visible');
    cy.contains('123').should('exist');
    cy.get('img').should('have.attr', 'src', ingredient.image_large);
  });
});
