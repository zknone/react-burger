import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { IngredientType } from '../../types/types';
import { useModal } from '../../hooks/use-modal';
import { IngredientPopupDetails } from './ingredient-popup-details/ingredient-popup-details';
import { Modal } from '../modal/modal';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  chooseIngredient,
  closeIngredient,
} from '../../services/slices/chose-ingredient/actions';
import { RootState } from '../../store';

const BurgerIngredients = ({
  extraClass,
  ingredients,
}: {
  ingredients: IngredientType[];
  extraClass?: string;
}) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(
    (store: RootState) => store.chosenIngredient.selectedIngredient
  );

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleCloseModal = () => {
    dispatch(closeIngredient());
    closeModal();
  };

  const handleIngredientSelected = (ingredient: IngredientType) => {
    dispatch(chooseIngredient(ingredient));
    openModal();
  };

  const bunsData = useMemo(() => {
    return ingredients.filter((item) => item.type === 'bun');
  }, [ingredients]);
  const sauceData = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );
  const mainCourseData = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  if (!ingredients || ingredients.length === 0) {
    return <div>Загружаю ингредиенты...</div>;
  }

  return (
    <div className={`${styles.ingredients_content_container} ${extraClass}`}>
      {isModalOpen && selectedIngredient && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientPopupDetails
            img={selectedIngredient.image}
            protein={selectedIngredient.proteins}
            calories={selectedIngredient.calories}
            fat={selectedIngredient.fat}
            carbs={selectedIngredient.carbohydrates}
          />
        </Modal>
      )}
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={styles.ingredients_tabs}>
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
      <div
        className={`${styles.ingredients_container} pt-6 pb-6 pr-10 custom-scroll`}
      >
        <IngredientsGroup
          title="Булки"
          ingredients={bunsData}
          handleIngredientSelected={handleIngredientSelected}
        />
        <IngredientsGroup
          title="Соусы"
          ingredients={sauceData}
          handleIngredientSelected={handleIngredientSelected}
        />
        <IngredientsGroup
          title="Начинки"
          ingredients={mainCourseData}
          handleIngredientSelected={handleIngredientSelected}
        />
      </div>
    </div>
  );
};

export { BurgerIngredients };
