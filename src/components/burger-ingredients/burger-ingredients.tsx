import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { IngredientType } from '../../types/types';
import { useModal } from '../../hooks/use-modal';
import { IngredientPopupDetails } from './ingredient-popup-details/ingredient-popup-details';
import { Modal } from '../modal/modal';
import { useMemo, useState } from 'react';

const BurgerIngredients = ({
  extraClass,
  ingredients,
}: {
  ingredients: IngredientType[];
  extraClass?: string;
}) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientType | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleIngredientSelected = (ingredient: IngredientType) => {
    setSelectedIngredient(ingredient);
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

  return (
    <div className={`${styles.ingredients_content_container} ${extraClass}`}>
      {isModalOpen && selectedIngredient && (
        <Modal onClose={closeModal} title="Детали ингредиента">
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
