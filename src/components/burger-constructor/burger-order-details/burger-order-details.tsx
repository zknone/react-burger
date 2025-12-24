import { FC, useMemo } from 'react';
import done from '../../../assets/done.png';
import { convertEstimatedMinutesToSeconds, mockMinuteInMs } from '../../../utils/order-time';

type BurgerOrderDetailsProps = {
  orderNumber: string;
  estimatedCookingTimeMinutes?: number;
  estimatedReadyAt?: string;
};

const BurgerOrderDetails: FC<BurgerOrderDetailsProps> = ({
  orderNumber,
  estimatedCookingTimeMinutes,
  estimatedReadyAt,
}) => {
  const estimatedSeconds = useMemo(() => {
    if (estimatedCookingTimeMinutes === undefined) return undefined;
    return convertEstimatedMinutesToSeconds(estimatedCookingTimeMinutes, mockMinuteInMs);
  }, [estimatedCookingTimeMinutes]);

  const readyTime =
    estimatedReadyAt &&
    new Date(estimatedReadyAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <>
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        className="mb-15"
        width={120}
        height={120}
        src={done}
        alt="Заказ исполнен"
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      {estimatedSeconds !== undefined && (
        <p className="text text_type_main-default text_color_inactive mb-2">
          Примерное время: ~{estimatedSeconds} сек
          {readyTime ? ` (около ${readyTime})` : ''}
        </p>
      )}
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default BurgerOrderDetails;
