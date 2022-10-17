import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
//더미 데이터, 추후 db에서 fetching해 와야함
//RDBMS사용, 유저와 일대다 관계로 설정, 로그아웃 시에도 저장되도록 설정

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [], // 상품 종류
  amount: 4, // 각 상품의 갯수
  total: 0, // 총 가격
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  () => {
    return fetch(url)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []; //is equal to next line ;
      //   return { cartItems: [] }; =  많은 수의 input을 한꺼번에 제어해야할때 유용하게 쓰일 수 있음
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemId
      );
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

console.log(cartSlice);
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
