import styles from './order.module.css';
import OrderDetails from '../../components/order-details/order-details';

type OrderPageProps = {
  isPrivateOrders?: boolean;
};

export default function OrderPage({ isPrivateOrders = false }: OrderPageProps) {
  return (
    <div className={styles.container}>
      <OrderDetails isPrivateOrders={isPrivateOrders} />
    </div>
  );
}
