import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { useGetIngredientsQuery } from '../services/api/ingredients-api/ingredients-api';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import Loader from '../components/loader/loader';
import { useEffect } from 'react';
import { store } from '../store';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import RefreshPrompt from '../components/refresh-prompt/refresh-prompt';

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {error ? (
          <RefreshPrompt message="Yo have seen mock-error, please refresh" />
        ) : (
          <BurgerIngredients extraClass="ml-5" />
        )}
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default App;
