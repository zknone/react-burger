import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api/ingredients-api';

const GAP = 50;
type IngredientVariantsType = 'bun' | 'sauce' | 'stuffing';

type BurgerIngredientsProps = { extraClass?: string };

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ extraClass }) => {
  const { data: { data: ingredients } = { data: [] } } =
    useGetIngredientsQuery(undefined);

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
    return <div>Loading ingredients...</div>;
  }

  return (
    <div className={`${styles.ingredients_content_container} ${extraClass}`}>
      <h2 className="text text_type_main-large mb-5">Build your burger</h2>
      <div className={styles.ingredients_tabs}>
        <Tab
          value="buns>"
          active={activeTitle === 'bun'}
          onClick={() => {
            handleTabClick('bun');
          }}
        >
          Buns
        </Tab>
        <Tab
          value="sauce"
          active={activeTitle === 'sauce'}
          onClick={() => {
            handleTabClick('sauce');
          }}
        >
          Sauces
        </Tab>
        <Tab
          value="topping"
          active={activeTitle === 'stuffing'}
          onClick={() => {
            handleTabClick('stuffing');
          }}
        >
          Fillings
        </Tab>
      </div>
      <div
        data-test-id="burger-ingredients"
        className={`${styles.ingredients_container} pt-6 pb-6 pr-10 custom-scroll`}
        ref={scrollRef}
      >
        <IngredientsGroup ref={bunRef} title="Buns" ingredients={bunsData} />
        <IngredientsGroup
          ref={sauceRef}
          title="Sauces"
          ingredients={sauceData}
        />
        <IngredientsGroup
          ref={stuffingRef}
          title="Fillings"
          ingredients={mainCourseData}
        />
      </div>
    </div>
  );
};

export { BurgerIngredients };
