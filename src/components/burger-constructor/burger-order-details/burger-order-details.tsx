import done from '../../../assets/done.png';

const BurgerOrderDetails = ({ orderNumber }: { orderNumber: string }) => {
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
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default BurgerOrderDetails;
