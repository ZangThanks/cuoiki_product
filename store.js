import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./src/features/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
