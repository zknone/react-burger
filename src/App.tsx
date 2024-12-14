import './App.css'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'
import { Menu } from './components/menu/menu'

function App() {

  return (
    <>
      <Menu/>
      <div className='contentContainer pt-10'>
        <BurgerIngredients/>
        <BurgerIngredients/>
      </div>
    </>
  )
}

export default App
