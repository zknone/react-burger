import styles from './order.module.css';
import OrderDetails from '../../components/order-details/order-details';

export default function OrderPage() {
  return (
    <div className={styles.container}>
      <OrderDetails isPrivateOrders />
    </div>
  );
}
