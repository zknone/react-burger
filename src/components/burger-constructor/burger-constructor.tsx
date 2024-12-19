import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useState } from 'react';
import ingredients from '../../utils/data';
import { Modal } from '../modal/modal';
import BurgerOrderDetails from './burger-order-details/burger-order-details';

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

  return (
    <div className={`${styles.burger_container} pt-15`}>
      <Modal size="L" isOpen={isPopupOpen} onClose={() => setOpen(false)}>
        <BurgerOrderDetails orderNumber="12343" />
      </Modal>
      <div className={styles.burger_constructor_wrapper}>
        <ConstructorElement
          type="top"
          extraClass={`${styles.burger_constructor_element} mr-4`}
          isLocked={true}
          text={`${buns[0]?.name} (верх)` || ''}
          thumbnail={buns[0]?.image_mobile || ''}
          price={buns[0]?.price || 0}
        />
        <ul className={`${styles.burger_constructor_list} custom-scroll`}>
          {stuffing.map((item, index) => (
            <li
              className={styles.burger_constructor_item}
              key={`${item?._id} - ${index}`}
            >
              {!buns.some((bun) => item?._id === bun?._id) ? (
                <DragIcon type="primary" />
              ) : (
                <div className="mr-6" />
              )}
              <ConstructorElement
                extraClass="mr-4"
                isLocked={buns.some((bun) => item?._id === bun?._id)}
                text={item?.name as string}
                thumbnail={item?.image_mobile as string}
                price={item?.price as number}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          extraClass={`${styles.burger_constructor_element} mr-4`}
          isLocked={true}
          text={`${buns[0]?.name} (низ)` || ''}
          thumbnail={buns[0]?.image_mobile || ''}
          price={buns[0]?.price || 0}
        />
        <div className={`${styles.burger_button_wrapper} mt-5 mr-5`}>
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
    </div>
  );
};

export { BurgerConstructor };
