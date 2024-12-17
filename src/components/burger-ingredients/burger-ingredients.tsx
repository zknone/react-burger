import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import ingredients from '../../utils/data';

const bunsData = ingredients.filter((item) => item.type === 'bun');
const sauceData = ingredients.filter((item) => item.type === 'sauce');
const mainCourseData = ingredients.filter((item) => item.type === 'main');

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
      <div
        className={`${styles.ingredients_container} pt-6 pb-6 pr-10 custom-scroll`}
      >
        <IngredientsGroup title="Булки" ingredients={bunsData} />
        <IngredientsGroup title="Соусы" ingredients={sauceData} />
        <IngredientsGroup title="Начинки" ingredients={mainCourseData} />
      </div>
    </div>
  );
};

export { BurgerIngredients };
