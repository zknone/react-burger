import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

import { useGetIngredientsQuery } from '../services/api/ingredients-api/ingredients-api';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import Loader from '../components/loader/loader';
import { useEffect } from 'react';
import { store } from '../store';

function App() {
  const { data, isLoading, error } = useGetIngredientsQuery(undefined);

  useEffect(() => {
    if (window.Cypress) {
      window.store = store;
    }
  }, []);

  useEffect(() => {
    console.log('[🍔 CYPRESS DEBUG] useGetIngredientsQuery triggered');
    if (data) {
      console.log('[🍔 CYPRESS DEBUG] Ingredients:', data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'status' in error
          ? `Error ${error.status}: ${(error.data as { message?: string })?.message || 'Unknown error'}`
          : 'An unknown error occurred';

    return <div>{errorMessage}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <BurgerIngredients extraClass="ml-5" />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default App;
