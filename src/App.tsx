import './App.css';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { AppHeader } from './components/app-header/app-header';

function App() {
  return (
    <>
      <AppHeader />
      <div className="contentContainer pt-10">
        <BurgerIngredients extraClass="ml-5" />
        <BurgerIngredients />
      </div>
    </>
  );
}

export default App;
