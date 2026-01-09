import { useEffect, useState } from 'react';

type IngredientVariantsType = 'bun' | 'sauce' | 'stuffing';

type IngredientPositions = {
  startingPosition: number;
  bun: number;
  sauce: number;
  stuffing: number;
};

const useIngredientsActiveTitle = (
  positions: IngredientPositions,
  gap: number
) => {
  const [activeTitle, setActiveTitle] = useState<IngredientVariantsType>('bun');

  useEffect(() => {
    if (positions.startingPosition && positions.sauce && positions.stuffing) {
      if (positions.startingPosition + gap <= positions.sauce) {
        setActiveTitle('bun');
      } else if (positions.startingPosition + gap <= positions.stuffing) {
        setActiveTitle('sauce');
      } else {
        setActiveTitle('stuffing');
      }
    }
  }, [gap, positions]);

  return [activeTitle, setActiveTitle] as const;
};

export default useIngredientsActiveTitle;
