import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal';
import BurgerOrderDetails from './burger-order-details/burger-order-details';
import { useModal } from '../../hooks/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDrop } from 'react-dnd';
import { IngredientType } from '../../types/types';
import {
  addBun,
  moveIngredient,
  removeIngredient,
} from '../../services/slices/constructor/actions';
import { addIngredient } from '../../services/slices/constructor/reducers';
import { useMemo } from 'react';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import BurgerEmptyItem from './burger-empty-item/burger-empty-item';
import { useSendOrderMutation } from '../../services/api/order-api/order-api';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [sendOrder] = useSendOrderMutation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { bun, selectedIngredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const handleRemove = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  const handleSendOrder = (order: string[]) => {
    if (order.length >= 3) {
      sendOrder(order);
      openModal();
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item: IngredientType) => {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const order = useMemo(() => {
    return [bun, ...selectedIngredients, bun]
      .map((item) => item?._id)
      .filter((id) => id !== undefined);
  }, [bun, selectedIngredients]);

  const totalPrice = useMemo(() => {
    return [bun, ...selectedIngredients, bun].reduce(
      (acc: number, item: IngredientType | null) => {
        if (item) {
          acc += item.price;
        }
        return acc;
      },
      0
    );
  }, [bun, selectedIngredients]);

  return (
    <div ref={dropTarget} className={`${styles.burger_container} pt-15`}>
      {isModalOpen && (
        <Modal size="L" onClose={closeModal}>
          <BurgerOrderDetails orderNumber="12343" />
        </Modal>
      )}
      <div className={styles.burger_constructor_wrapper}>
        {!bun ? (
          <BurgerEmptyItem type="top" title="Добавьте булочку" />
        ) : (
          <ConstructorElement
            type="top"
            extraClass={`${styles.burger_constructor_element} mr-4`}
            isLocked={true}
            text={bun?.name ? `${bun?.name} (верх)` : ''}
            thumbnail={bun?.image_mobile || ''}
            price={bun?.price || 0}
          />
        )}
        {selectedIngredients.length === 0 ? (
          <BurgerEmptyItem title="Добавьте ингредиенты" />
        ) : (
          <ul className={`${styles.burger_constructor_list} custom-scroll`}>
            {selectedIngredients.map((item, index) => (
              <BurgerConstructorItem
                index={index}
                moveIngredient={handleMoveIngredient}
                ingredient={item}
                key={`${item?._id} - ${index}`}
                handleClose={handleRemove}
              />
            ))}
          </ul>
        )}
        {!bun ? (
          <BurgerEmptyItem type="bottom" title="Добавьте булочку" />
        ) : (
          <ConstructorElement
            type="bottom"
            extraClass={`${styles.burger_constructor_element} mr-4`}
            isLocked={true}
            text={bun?.name ? `${bun?.name} (низ)` : ''}
            thumbnail={bun?.image_mobile || ''}
            price={bun?.price || 0}
          />
        )}
        <div className={`${styles.burger_button_wrapper} mt-5 mr-5`}>
          <p
            className={`${styles.burger_description} text text_type_digits-medium`}
          >
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
          <Button htmlType="button" onClick={() => handleSendOrder(order)}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BurgerConstructor };
