import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../reel-item/order-item';
import { RootState } from '../../store';
import Loader from '../loader/laoder';
import { useEffect } from 'react';
import { startSocket, stopSocket } from '../../services/slices/socket/actions';
import styles from './order-history.module.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { privateData, isLoading, isSocketOpen } = useSelector(
    (state: RootState) => state.socket
  );

  useEffect(() => {
    dispatch(startSocket());

    return () => {
      dispatch(stopSocket());
    };
  }, [dispatch]);

  if (isLoading || !isSocketOpen || privateData.orders) {
    <Loader />;
  }
  return (
    <ul className={styles.feed}>
      {privateData.orders.map((item) => (
        <OrderItem key={item._id} {...item} />
      ))}
    </ul>
  );
};

export default OrderHistory;
