import { IngredientType } from "../../../types/types";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import styles from './ingredient-item.module.css';

const IngredientItem = ({title, price, image}: IngredientType) => {
    return(
    <li className={styles.itemContainer}>
        <div className="pl-4 pr-4 pb-1">
            <img alt={title} src={`../../../assets/${image}.png`} />
        </div>
        <IngredientDetails title={title} price={price}/>
    </li>);
}

export {IngredientItem}