const IngredientPopupDetails = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {title}
      </p>
      <p className="text text_type_main-default text_color_inactive">{value}</p>
    </li>
  );
};

export { IngredientPopupDetails };
