import { MouseEventHandler, useContext, useState } from "react";
import { MenuItem } from "../entities/entities";
import { foodItemsContext } from "../App";
import { database } from "../firebase"; // Importa la base de datos desde firebase.ts
import { ref, push } from "firebase/database";
import logger from "../servicios/logging";


interface FoodOrderProps {
    food: MenuItem;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function FoodOrder(props: FoodOrderProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado
    const menuItems: MenuItem[] = useContext(foodItemsContext);

    const handleOrderSubmit = async () => {
        setIsLoading(true); // Indica que el proceso ha comenzado
        const remainingQuantity = props.food.quantity - orderQuantity;

        // Comprobación para evitar cantidades negativas
        if (orderQuantity < 0) {
            setIsLoading(false);
            throw new Error("La cantidad del pedido no puede ser negativa, y es " + orderQuantity);
        }

        if (remainingQuantity >= 0) {
            // Actualiza la cantidad global
            menuItems.map((item: MenuItem) => {
                if (item.id === props.food.id) {
                    item.quantity = remainingQuantity;
                }
            });

            // Guarda el pedido en Firebase
            try {
                const ordersRef = ref(database, "orders");
                await push(ordersRef, {
                    foodName: props.food.name,
                    quantity: orderQuantity,
                    customerName: name,
                    customerPhone: phone,
                    timestamp: new Date().toISOString(),
                });

                setOrderPlaced(true);
                logger.info("Pedido realizado y datos enviados a Firebase");
            } catch (error) {
                logger.error("Error al guardar el pedido en Firebase");
            } finally {
                setIsLoading(false); // Proceso completado
            }
        } else {
            logger.error("No hay suficiente cantidad disponible.");
            setIsLoading(false); // Proceso completado
        }
    };

    return (
        <>
            <h3 className="foodTitle">{props.food.name}</h3>
            <img className="foodImg" src={`/images/${props.food.image}`} alt={props.food.name} />
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
                        disabled={isLoading} // Desactiva durante la carga
                    />
                </label>
                <label>
                    Nombre
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="orderInput"
                        disabled={isLoading} // Desactiva durante la carga
                    />
                </label>
                <label>
                    Teléfono
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="orderInput"
                        disabled={isLoading} // Desactiva durante la carga
                    />
                </label>

                <div className="orderButtons">
                    <button
                        onClick={handleOrderSubmit}
                        className="orderButton submit"
                        disabled={isLoading} // Desactiva durante la carga
                    >
                        {isLoading ? "Enviando..." : "Enviar pedido"}
                    </button>
                    <button
                        onClick={props.onReturnToMenu}
                        className="orderButton return"
                        disabled={isLoading} // Desactiva durante la carga
                    >
                        Volver al menú
                    </button>
                </div>
                {isLoading && (
                    <p className="loadingMessage">
                        Procesando tu pedido, por favor espera...
                    </p>
                )}
                {orderPlaced && (
                    <p className="orderConfirmation">
                        Pedido enviado. Recibirás un SMS una vez esté listo para recoger.
                    </p>
                )}
            </div>
        </>
    );
}
