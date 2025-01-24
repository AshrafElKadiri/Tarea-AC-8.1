import { lazy, Suspense, useState } from 'react'
import './App.css'
import { MenuItem } from './entities/entities';
import React from 'react';
//import Foods from './componentes/Foods';
const Foods = lazy(() => import('./componentes/Foods'));


export const foodItemsContext = React.createContext<MenuItem[]>([]);

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      "id": 1,
      "name": "Hamburguesa de Pollo",
      "quantity": 40,
      "desc": "Hamburguesa de pollo frito - lechuga,tomate,queso y mayonesa",
      "price": 24,
      "image": "burger.jpg"
    },
    {
      "id": 2,
      "name": "Hamburguesa Vegetariana",
      "quantity": 30,
      "desc": "Hamburguesa de pollo frito - lechuga, tomate, queso y mayonesa",
      "price": 20,
      "image": "vegetable.jpg"
    },
    {
      "id": 3,
      "name": "Patatas fritas",
      "quantity": 30,
      "desc": "Patatas fritas - mostaza, ketchup y mayonesa",
      "price": 15,
      "image": "patatas.jpg"
    },
    {
      "id": 4,
      "name": "Helado",
      "quantity": 30,
      "desc": "Helado - vainilla, chocolate y fresa",
      "price": 10,
      "image": "helado.jpg"
    }
  ]);

  // Función para actualizar la cantidad
  {/* 
  const changeQuantity = (id: number, newQuantity: number) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  */}
  
  // Función intermedia para manejar la navegación al menú
  const handleReturnToMenu = () => {
    setIsChooseFoodPage(false); // Establece la página principal
  };

  return (
    <foodItemsContext.Provider value={menuItems}>
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
            //onQuantityUpdated={changeQuantity} 
            onReturnToMenu={handleReturnToMenu} />
        </Suspense>
        )}
      </div>
    </foodItemsContext.Provider>
  )
}

export default App
