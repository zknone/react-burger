import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

const bunsData = [
  {
    id: '1a',
    title: 'Краторная булка N-200i',
    price: 20,
    image: 'firstBun',
    quantity: 1,
  },
  {
    id: '2b',
    title: 'Флюоресцентная булка R2-D3',
    price: 20,
    image: 'secondBun',
  },
];

const sauceData = [
  {
    id: '3b',
    title: 'Соус Spicy-X',
    price: 20,
    image: 'firstSauce',
    quantity: 1,
  },
  {
    id: '4a',
    title: 'Соус фирменный Space Sauce',
    price: 30,
    image: 'secondSauce',
  },
  {
    id: '5a',
    title: 'Соус традиционный галактический',
    price: 40,
    image: 'thirdSauce',
  },

  {
    id: '5b',
    title: 'Соус традиционный галактический 2',
    price: 40,
    image: 'fourthSauce',
  },
];

const BurgerIngredients = ({ extraClass }: { extraClass?: string }) => {
  return (
    <div className={`${styles.ingredients_content_container} ${extraClass}`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="buns>" active={true} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauce" active={false} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="topping" active={false} onClick={() => {}}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container} pt-6 pb-6`}>
        <IngredientsGroup title="Булки" ingredients={bunsData} />
        <IngredientsGroup title="Соусы" ingredients={sauceData} />
        <IngredientsGroup title="Начинки" ingredients={sauceData} />
      </div>
    </div>
  );
};

export { BurgerIngredients };
