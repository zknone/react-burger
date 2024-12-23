import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { AppHeader } from './app-header/app-header';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import styles from './app.module.css';
import { FetchedIngredients, IngredientType } from '../types/types';
import { useEffect, useState } from 'react';
import fetchData from '../utils/fetch-data';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState<IngredientType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const { data } = await fetchData<FetchedIngredients>(API_URL);
        setData(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };
    setLoading(false);
    fetchIngredients();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <AppHeader />
      <main className={`${styles.content_container} pt-10`}>
        <BurgerIngredients extraClass="ml-5" ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </>
  );
}

export default App;
