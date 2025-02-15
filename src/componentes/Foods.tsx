import { useState } from "react";
import { MenuItem } from "../entities/entities";
import FoodOrder from "./FoodOrder";
import ErrorBoundary from "./ErrorBoundary";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


function Foods() {
    const [buyFood, setBuyFood] = useState(false);
    const menuItems = useSelector((state: RootState) => state.menu.items);
    const [food, setFood] = useState<MenuItem>(menuItems[0]);


    const handleFoodClick = (item: MenuItem) => {
        setBuyFood(true);
        setFood(item);
    };

    const onReturnToMenu = () => {
        setBuyFood(false);
    }
    return (
        <>
            {!buyFood && ( 
                <>
                    <h4 className="foodTitle">Carta</h4>
                    <ul className="ulFoods">
                        {menuItems.map((item) => {
                            return (
                                <li key={item.id} className="liFoods">
                                    <img
                                        className="foodImg"
                                        src={`${import.meta.env.BASE_URL}images/${item.image}`}
                                        alt={item.name}
                                    />
                                    <div className="foodItem" onClick={() => handleFoodClick(item)}>
                                        <p className="foodDesc">{item.desc}</p>
                                        <p className="foodPrice">{item.price}$</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )
            }
            { buyFood && ( 
                <>
                    <ErrorBoundary fallback={<div>¡Algo salió mal!</div>}>
                        <FoodOrder food={food}  
                            onReturnToMenu={onReturnToMenu}/>
                    </ErrorBoundary>
                </>
            )}

        </>
    );
};
export default Foods; 