import styles from './ingredient-popup-details.module.css';

const IngredientPopupDetails = ({
  img,
  calories,
  protein,
  carbs,
  fat,
}: {
  img: string;
  protein: number;
  carbs: number;
  calories: number;
  fat: number;
}) => {
  return (
    <div className={styles.burger_popup_container}>
      <img
        className="mb-4"
        width={480}
        height={240}
        src={img}
        alt="Заказ исполнен"
      />
      <p
        className={`${styles.burger_popup_text} text text_type_main-medium mb-6`}
      >
        Биокотлета из марсианской Магнолии
      </p>
      <dl className={styles.burger_popup_details}>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {calories}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {protein}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {fat}
          </dd>
        </div>
        <div className={styles.burger_popup_detail_item}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </dt>
          <dd className="text text_type_main-default text_color_inactive">
            {carbs}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export { IngredientPopupDetails };
