import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { bottom } from '@popperjs/core';
import { useState } from 'react';
import { BurgerPopup } from './burger-popup/burger-popup';
import ingredients from '../../utils/data';

const stuffingIds = [
  '60666c42cc7b410027a1a9b9',
  '60666c42cc7b410027a1a9b4',
  '60666c42cc7b410027a1a9bc',
  '60666c42cc7b410027a1a9bb',
  '60666c42cc7b410027a1a9bb',
];

const bunIds = ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b1'];

const buns = bunIds.map((id) => ingredients.find((item) => item._id === id));

const stuffing = stuffingIds.map((id) =>
  ingredients.find((item) => item._id === id)
);

const BurgerConstructor = () => {
  const [isPopupOpen, setOpen] = useState<boolean>(false);

  const resultingBurger = [...buns.slice(0, 1), ...stuffing, ...buns.slice(1)];

  const totalCost = resultingBurger.reduce((acc, item) => {
    if (item === undefined) return 0;
    acc += item.price;
    return acc;
  }, 0);

  const firsElement = 0;
  const lastElement = resultingBurger.length - 1;

  return (
    <div className={`${styles.burger_container} mt-10`}>
      <BurgerPopup
        orderNumber={123232}
        isOpen={isPopupOpen}
        onClose={() => setOpen(false)}
      />
      <div className={`${styles.burger_content_wrapper} mb-6 custom-scroll`}>
        <ul
          className={`${styles.burger_constructor_list} mt-0 ml-0 mb-6 mr-4 `}
        >
          {resultingBurger.map((item, index) => (
            <li
              className={styles.burger_constructor_item}
              key={`${item?._id} - ${index}`}
            >
              {!buns.some((bun) => item?._id === bun?._id) && (
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
                isLocked={buns.some((bun) => item?._id === bun?._id)}
                text={item?.name as string}
                thumbnail={item?.image_mobile as string}
                price={item?.price as number}
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
        <Button htmlType="button" onClick={() => setOpen(!isPopupOpen)}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export { BurgerConstructor };
