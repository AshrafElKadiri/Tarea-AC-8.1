import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../../firebase";
import { ref, push } from "firebase/database";

interface Order {
  foodName: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  timestamp: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error?: string;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (order: Order, { rejectWithValue }) => {
    try {
      const ordersRef = ref(database, "orders");
      await push(ordersRef, order);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
