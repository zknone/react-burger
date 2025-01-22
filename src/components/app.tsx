import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { AppHeader } from './app-header/app-header';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import styles from './app.module.css';

import { useGetIngredientsQuery } from '../services/api/ingredients-api/ingredients-api';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const { isLoading, error } = useGetIngredientsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
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
      <AppHeader />
      <main className={`${styles.content_container} pt-10`}>
        <BurgerIngredients extraClass="ml-5" />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default App;
