import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
  desc: string;
  price: number;
  image: string;
}

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [
    {
      id: 1,
      name: "Hamburguesa de Pollo",
      quantity: 40,
      desc: "Hamburguesa de pollo frito - lechuga, tomate, queso y mayonesa",
      price: 24,
      image: "burger.jpg",
    },
    {
      id: 2,
      name: "Hamburguesa Vegetariana",
      quantity: 30,
      desc: "Hamburguesa vegetariana con lechuga, tomate y queso",
      price: 20,
      image: "vegetable.jpg",
    },
    {
      id: 3,
      name: "Patatas fritas",
      quantity: 30,
      desc: "Patatas fritas con mostaza, ketchup y mayonesa",
      price: 15,
      image: "patatas.jpg",
    },
    {
      id: 4,
      name: "Helado",
      quantity: 30,
      desc: "Helado de vainilla, chocolate y fresa",
      price: 10,
      image: "helado.jpg",
    },
  ],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
      reduceQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item && item.quantity >= action.payload.quantity) {
          item.quantity -= action.payload.quantity;
        }
      },
    },
  });
  
  export const { reduceQuantity } = menuSlice.actions;
  export default menuSlice.reducer;

