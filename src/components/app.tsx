import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { AppHeader } from './app-header/app-header';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import styles from './app.module.css';

import { useGetIngredientsQuery } from '../services/api/api';

function App() {
  const { isLoading, error, data } = useGetIngredientsQuery(undefined);
  const ingredients = data?.data;

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
    <>
      <AppHeader />
      <main className={`${styles.content_container} pt-10`}>
        <BurgerIngredients extraClass="ml-5" ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
}

export default App;
