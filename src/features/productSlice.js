import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const initialValue = {
  list: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { isRejectedWithValue }) => {
    try {
      return await fetch(
        "https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers"
      ).then((res) => res.json());
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

export default productSlice.reducer;
