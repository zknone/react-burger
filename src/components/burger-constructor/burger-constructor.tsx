import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal';
import BurgerOrderDetails from './burger-order-details/burger-order-details';
import { useModal } from '../../hooks/use-modal';
import { IngredientType } from '../../types/types';

const BurgerConstructor = ({
  ingredients,
}: {
  ingredients: IngredientType[];
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log('constructor', ingredients);

  const stuffingIds = [
    ingredients[3]?._id,
    ingredients[5]?._id,
    ingredients[3]?._id,
    ingredients[4]?._id,
    ingredients[2]?._id,
  ];

  const bunIds = [ingredients[0]?._id, ingredients[0]?._id];

  const buns = bunIds.map((id) => ingredients.find((item) => item._id === id));

  const stuffing = stuffingIds.map((id) =>
    ingredients.find((item) => item._id === id)
  );

  const resultingBurger = [...buns.slice(0, 1), ...stuffing, ...buns.slice(1)];

  const totalCost = resultingBurger.reduce((acc, item) => {
    if (item === undefined) return 0;
    acc += item.price;
    return acc;
  }, 0);

  return (
    <div className={`${styles.burger_container} pt-15`}>
      {isModalOpen && (
        <Modal size="L" onClose={closeModal}>
          <BurgerOrderDetails orderNumber="12343" />
        </Modal>
      )}
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
          <Button htmlType="button" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BurgerConstructor };
