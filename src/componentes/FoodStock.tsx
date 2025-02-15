import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function FoodStock() {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  
  return (
    <>
      <div className="App">
        <h3 className="title">Comida Rápida Online</h3>
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
        </div>
    </>
  )
}

export default FoodStock
