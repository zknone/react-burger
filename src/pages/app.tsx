import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

import { useGetIngredientsQuery } from '../services/api/ingredients-api/ingredients-api';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import Loader from '../components/loader/laoder';

function App() {
  const { isLoading, error } = useGetIngredientsQuery(undefined);

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
