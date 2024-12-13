import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    return(
        <div className={styles.contentContainer}>
            <h2 className="text text_type_main-large">
                Соберите бургер
            </h2>
        </div>
    );
}

export {BurgerIngredients};