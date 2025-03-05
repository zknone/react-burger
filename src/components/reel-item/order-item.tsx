import { FC } from 'react';
// import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type OrderProps = {
  //   id: number;
};

const mockData = {
  orderId: 345,
  date: 'Сегодня, 16:20',
  title: 'Death Star Starship Main бургер',
  ingredients: ['1', '2', '3', '4', '5', '6', '8', '12'],
  summ: 540,
};

const OrderItem: FC<OrderProps> = () => {
  //   const { data, isLoading, error } = useGetIngredientsQuery(id);

  return (
    <li className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className="text text_type_main-default">#{mockData.orderId}</span>
        <span className={`text text_type_main-default ${styles.dateTitle}`}>
          {mockData.date}
        </span>
      </div>
      <h3 className="text text_type_main-medium">{mockData.title}</h3>
      <div className={styles.ingredientsWrapper}>
        <ul className={styles.ingredientsList}>
          {mockData.ingredients.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className={styles.ingredientListItem}
              style={{
                zIndex: mockData.ingredients.length - index,
                marginLeft: index === 0 ? '0' : '-24px',
              }}
            >
              <div className={styles.svgBackground}>
                <span>
                  {index < 4 ? item : `+${mockData.ingredients.length - index}`}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.priceWrapper}>
          <span className="text text_type_digits-default">{mockData.summ}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
