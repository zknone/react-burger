import { RefObject, useEffect, useState } from 'react';

type IngredientPositions = {
  startingPosition: number;
  bun: number;
  sauce: number;
  stuffing: number;
};

const useIngredientsScrollPositions = (
  scrollRef: RefObject<HTMLDivElement>,
  bunRef: RefObject<HTMLDivElement>,
  sauceRef: RefObject<HTMLDivElement>,
  stuffingRef: RefObject<HTMLDivElement>
) => {
  const [positions, setPositions] = useState<IngredientPositions>({
    startingPosition: 0,
    bun: 0,
    sauce: 0,
    stuffing: 0,
  });

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      setPositions((prevPositions) => ({
        ...prevPositions,
        startingPosition: scrollElement.getBoundingClientRect().top,
      }));
    }
    const handleScroll = () => {
      setPositions((prevPositions) => ({
        ...prevPositions,
        bun: bunRef.current?.getBoundingClientRect().top || 0,
        sauce: sauceRef.current?.getBoundingClientRect().top || 0,
        stuffing: stuffingRef.current?.getBoundingClientRect().top || 0,
      }));
    };

    scrollElement?.addEventListener('scroll', handleScroll);
    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, bunRef, sauceRef, stuffingRef]);

  return positions;
};

export default useIngredientsScrollPositions;
