import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../types/types';
import styles from './burger-constructor.module.css';
import { bottom } from '@popperjs/core';
import bun from '../../assets/bun-02-mini.png';
import sauce from '../../assets/sauce-03-mini.png';
import meat from '../../assets/meat-02-mini.png';
import topping from '../../assets/topping-01-mini.png';
import rings from '../../assets/rings-01-mini.png';

const mockBurger: IngredientType[] = [
  {
    id: '2a',
    title: 'Соус традиционный галактический',
    price: 20,
    image: 'sauce',
  },
  {
    id: '2b',
    title: 'Мясо бессмертных моллюсков Protostomia',
    price: 200,
    image: 'meat',
  },
  {
    id: '2c',
    title: 'Плоды Фалленианского дерева',
    price: 20,
    image: 'topping',
  },
  {
    id: '2c',
    title: 'Хрустящие минеральные кольца',
    price: 20,
    image: 'rings',
  },
  {
    id: '2c',
    title: 'Хрустящие минеральные кольца',
    price: 20,
    image: 'rings',
  },
];

const mockBun: IngredientType[] = [
  {
    id: '1a',
    title: 'Краторная булка N-200i (верх)',
    price: 20,
    image: 'bun',
  },
  {
    id: '1b',
    title: 'Краторная булка N-200i (низ)',
    price: 20,
    image: 'bun',
  },
];

const images: Record<string, string> = {
  bun: bun,
  meat: meat,
  sauce: sauce,
  topping: topping,
  rings: rings,
};

const BurgerConstructor = () => {
  const resultingBurger = [
    ...mockBun.slice(0, 1),
    ...mockBurger,
    ...mockBun.slice(1),
  ];

  const totalCost = resultingBurger.reduce((acc, item) => {
    acc += item.price;
    return acc;
  }, 0);

  const firsElement = 0;
  const lastElement = resultingBurger.length - 1;
  return (
    <div className={`${styles.burger_container} mt-10`}>
      <div className={`${styles.burger_content_wrapper} mb-6`}>
        <ul className={`${styles.burger_constructor_list} mt-0 ml-0 mb-6 mr-4`}>
          {resultingBurger.map((item, index) => (
            <li className={styles.burger_constructor_item}>
              {!mockBun.some((bun) => item.id === bun.id) && (
                <DragIcon type="primary" />
              )}
              <ConstructorElement
                extraClass={styles.burger_constructor_element}
                type={
                  index === firsElement
                    ? 'top'
                    : index === lastElement
                      ? bottom
                      : undefined
                }
                isLocked={mockBun.some((bun) => item.id === bun.id)}
                text={item.title}
                thumbnail={images[item.image]}
                price={item.price}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.burger_button_wrapper} mr-5`}>
        <p
          className={`${styles.burger_description} text text_type_digits-medium`}
        >
          {totalCost}
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button">Оформить заказ</Button>
      </div>
    </div>
  );
};

export { BurgerConstructor };
