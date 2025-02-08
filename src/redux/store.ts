import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./features/menuSlice"; 
import ordersReducer from "./features/ordersSlice"
import loggerMiddleware from "./middleware/loggerMiddleware";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
