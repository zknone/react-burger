import { IngredientType } from "../../../types/types";
import { IngredientItem } from "../ingredient-item/ingredient-item";

const IngredientsGroup = ({title, ingredients}: {title: string, ingredients: IngredientType[]}) => {
    return(
    <>
        <h3 className="text text_type_main-medium mb-6">{title}</h3>
        <ul>
            {ingredients.map(item => <IngredientItem key={item.id} {...item}/>)}
        </ul>
    </>);
}

export {IngredientsGroup}