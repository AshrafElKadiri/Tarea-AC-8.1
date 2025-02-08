import { MouseEventHandler, useState } from "react";
import { MenuItem } from "../entities/entities";
import FoodOrder from "./FoodOrder";
import ErrorBoundary from "./ErrorBoundary";



interface FoodsProps {
    foodItems: MenuItem[];
    //onQuantityUpdated(id: number, quantity: number): void;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}
function Foods(props: FoodsProps) {
    const [buyFood, setBuyFood] = useState(false);
    const [food, setFood] = useState<MenuItem>(props.foodItems[0]);

    const handleFoodClick = (item: MenuItem) => {
        setBuyFood(true);
        setFood(item);
    };
    return (
        <>
            {!buyFood && ( 
                <>
                    <h4 className="foodTitle">Carta</h4>
                    <ul className="ulFoods">
                        {props.foodItems.map((item) => {
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
                        //onQuantityUpdated={props.onQuantityUpdated} 
                        onReturnToMenu={props.onReturnToMenu}/>
                </ErrorBoundary>

                   
                </>
            )}

        </>
    );
};
export default Foods; 