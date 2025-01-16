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
import { addBun } from '../../services/slices/constructor/actions';
import { addIngredient } from '../../services/slices/constructor/reducers';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
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
  const { isModalOpen, openModal, closeModal } = useModal();
  const { bun, selectedIngredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  console.log(bun, selectedIngredients);

  return (
    <div ref={dropTarget} className={`${styles.burger_container} pt-15`}>
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
          text={bun?.name ? `${bun?.name} (верх)` : ''}
          thumbnail={bun?.image_mobile || ''}
          price={bun?.price || 0}
        />
        <ul className={`${styles.burger_constructor_list} custom-scroll`}>
          {selectedIngredients.map((item, index) => (
            <li
              className={styles.burger_constructor_item}
              key={`${item?._id} - ${index}`}
            >
              <div className="mr-6" />
              <ConstructorElement
                extraClass="mr-4"
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
          text={bun?.name ? `${bun?.name} (низ)` : ''}
          thumbnail={bun?.image_mobile || ''}
          price={bun?.price || 0}
        />
        <div className={`${styles.burger_button_wrapper} mt-5 mr-5`}>
          <p
            className={`${styles.burger_description} text text_type_digits-medium`}
          >
            '111'
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
