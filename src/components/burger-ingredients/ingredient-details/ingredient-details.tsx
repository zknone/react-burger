const IngredientDetails = ({price, title}: {price: number, title: string}) => {
    return(
        <div >
            <p>{title}</p>
            <p>{price}</p>
        </div>);
}

export {IngredientDetails}