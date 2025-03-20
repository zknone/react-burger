import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { IngredientType } from '../../types/types';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';

const GAP = 50;
type IngredientVariantsType = 'bun' | 'sauce' | 'stuffing';

type BurgerIngredientsProps = { extraClass?: string };

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ extraClass }) => {
  const { data } = useGetIngredientsQuery(undefined);
  const ingredients: IngredientType[] = data?.data ?? [];

  const [activeTitle, setTitleActive] = useState<IngredientVariantsType>('bun');
  const [positions, setPositions] = useState({
    startingPosition: 0,
    bun: 0,
    sauce: 0,
    stuffing: 0,
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const stuffingRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (type: IngredientVariantsType) => {
    setTitleActive(type);
    switch (type) {
      case 'bun':
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'stuffing':
        stuffingRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  const bunsData = useMemo(() => {
    return ingredients.filter((item) => item.type === 'bun');
  }, [ingredients]);
  const sauceData = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );
  const mainCourseData = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  useEffect(() => {
    if (scrollRef.current) {
      setPositions((prevPositions) => ({
        ...prevPositions,
        startingPosition: scrollRef.current!.getBoundingClientRect().top,
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

    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (positions.startingPosition && positions.sauce && positions.stuffing) {
      if (positions.startingPosition + GAP <= positions.sauce) {
        setTitleActive('bun');
      } else if (positions.startingPosition + GAP <= positions.stuffing) {
        setTitleActive('sauce');
      } else {
        setTitleActive('stuffing');
      }
    }
  }, [positions]);

  if (!ingredients || ingredients.length === 0) {
    return <div>Загружаю ингредиенты...</div>;
  }

  return (
    <div className={`${styles.ingredients_content_container} ${extraClass}`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={styles.ingredients_tabs}>
        <Tab
          value="buns>"
          active={activeTitle === 'bun'}
          onClick={() => {
            handleTabClick('bun');
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={activeTitle === 'sauce'}
          onClick={() => {
            handleTabClick('sauce');
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="topping"
          active={activeTitle === 'stuffing'}
          onClick={() => {
            handleTabClick('stuffing');
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients_container} pt-6 pb-6 pr-10 custom-scroll`}
        ref={scrollRef}
      >
        <IngredientsGroup ref={bunRef} title="Булки" ingredients={bunsData} />
        <IngredientsGroup
          ref={sauceRef}
          title="Соусы"
          ingredients={sauceData}
        />
        <IngredientsGroup
          ref={stuffingRef}
          title="Начинки"
          ingredients={mainCourseData}
        />
      </div>
    </div>
  );
};

export { BurgerIngredients };
