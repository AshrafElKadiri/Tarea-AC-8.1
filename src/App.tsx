import { lazy, Suspense, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const Foods = lazy(() => import('./componentes/Foods'));

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const menuItems = useSelector((state: RootState) => state.menu.items);
  
  // Función intermedia para manejar la navegación al menú
  const handleReturnToMenu = () => {
    setIsChooseFoodPage(false); // Establece la página principal
  };

  return (
      <div className="App">
        <button className="toggleButton" onClick={() => setIsChooseFoodPage(!isChooseFoodPage)}>
          {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
        </button>
        <h3 className="title">Comida Rápida Online</h3>
        {!isChooseFoodPage && (
          <>
            <h4 className="subTitle">Menús</h4>
            <ul className="ulApp">
              {menuItems.map((item) => {
                return (
                  <li key={item.id} className="liApp">
                    <p>{item.name}</p><p>#{item.quantity}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {isChooseFoodPage && (
        <Suspense fallback={<div>Cargando la lista de alimentos...</div>}>
          <Foods 
            foodItems={menuItems} 
            onReturnToMenu={handleReturnToMenu} />
        </Suspense>
        )}
    </div>
  )
}

export default App
