import { MouseEventHandler, useState } from "react";
import { MenuItem } from "../entities/entities";
import logger from "../servicios/logging";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { reduceQuantity } from "../redux/features/menuSlice";
import { placeOrder } from "../redux/features/ordersSlice";

interface FoodOrderProps {
    food: MenuItem;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function FoodOrder(props: FoodOrderProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [orderQuantity, setOrderQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.orders);

    const handleOrderSubmit = async () => {
        
        const remainingQuantity = props.food.quantity - orderQuantity;
        
        // Comprobación para evitar cantidades negativas
        if (orderQuantity < 0) {
            
            throw new Error("La cantidad del pedido no puede ser negativa, y es " + orderQuantity);
        }

        if (remainingQuantity >= 0) {
            dispatch(reduceQuantity({ id: props.food.id, quantity: orderQuantity }));
            dispatch(placeOrder({ foodName: props.food.name, quantity: orderQuantity, customerName: name, customerPhone: phone, timestamp: new Date().toISOString() }));
            
        } else {
            logger.error("No hay suficiente cantidad disponible.");
        }
    };

    return (
        <>
            <h3 className="foodTitle">{props.food.name}</h3>
            <img className="foodImg" src={`${import.meta.env.BASE_URL}/images/${props.food.image}`} alt={props.food.name} />
            <p className="foodDesc">{props.food.desc}</p>
            <p className="foodPrice">{props.food.price}€</p>
            <div className="orderForm">
                <label>
                    Cantidad
                    <input
                        type="number"
                        min="1"
                        max={props.food.quantity}
                        onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                        className="orderInput"
                        disabled={loading} // Desactiva durante la carga
                    />
                </label>
                <label>
                    Nombre
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="orderInput"
                        disabled={loading} // Desactiva durante la carga
                    />
                </label>
                <label>
                    Teléfono
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="orderInput"
                        disabled={loading} // Desactiva durante la carga
                    />
                </label>

                <div className="orderButtons">
                    <button onClick={handleOrderSubmit} disabled={loading}>
                        Hacer el pedido
                    </button>
                    
                    <button
                        onClick={props.onReturnToMenu}
                        className="orderButton return"
                        disabled={loading} // Desactiva durante la carga
                    >
                        Volver al menú
                    </button>
                </div>
                
                {loading &&  (
                    <p className="loadingMessage">
                        Procesando tu pedido, por favor espera...
                    </p>
                ) }
               
                {error && <p style={{ color: "red" }}>❌ {error}</p>}
                
            </div>
        </>
    );
}
