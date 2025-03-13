import { useDispatch } from 'react-redux';
import OrderItem from '../order-item/order-item';
import Loader from '../loader/laoder';
import { useEffect } from 'react';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import styles from './order-history.module.css';
import { useTypedSelector } from '../../utils/typed-hooks';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { privateData, isLoading, isSocketOpen } = useTypedSelector(
    (state) => state.socket
  );

  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  if (isLoading || !isSocketOpen) {
    return (
      <div className="ml-30">
        <Loader />
      </div>
    );
  }

  if (!privateData?.orders) {
    return <div>No orders found.</div>;
  }

  return (
    <ul className={styles.feed}>
      {privateData.orders.map((item) => (
        <OrderItem isOrderHistoryItem key={item._id} {...item} />
      ))}
    </ul>
  );
};

export default OrderHistory;
