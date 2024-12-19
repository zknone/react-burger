import { BurgerIngredients } from './burger-ingredients/burger-ingredients';
import { AppHeader } from './app-header/app-header';
import { BurgerConstructor } from './burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className={`${styles.content_container} pt-10`}>
        <BurgerIngredients extraClass="ml-5" />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
