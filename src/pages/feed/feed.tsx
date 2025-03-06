import OrderItem from '../../components/reel-item/order-item';
import styles from './feed.module.css';
// import Loader from '../../components/loader/laoder';
// import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';

function FeedPage() {
  // const { isLoading, error } = useGetIngredientsQuery(undefined);

  // if (isLoading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   const errorMessage =
  //     error instanceof Error
  //       ? error.message
  //       : 'status' in error
  //         ? `Error ${error.status}: ${(error.data as { message?: string })?.message || 'Unknown error'}`
  //         : 'An unknown error occurred';

  //   return <div>{errorMessage}</div>;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.ordersWrapper}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <ul className={styles.orderList}>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </ul>
      </div>

      <div className={styles.dataWrapper}>
        <div className={styles.ordersTitlesWrapper}>
          <div>
            <h3 className="text text_type_main-medium">Готовы</h3>
            <ul className={styles.orderTitlesList}>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034533</li>
            </ul>
          </div>
          <div>
            <h3 className="text text_type_main-medium">В работе</h3>
            <ul className={styles.orderTitlesList}>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034531</li>
            </ul>
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>
          <h2 className="text text_type_digits-large">28 752</h2>
        </div>
        <div className={styles.infoWrapper}>
          <span className="text text_type_main-medium">
            Выполнено за сегодня:
          </span>
          <h2 className="text text_type_digits-large">138</h2>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
