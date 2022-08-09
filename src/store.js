import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let cartInfo = createSlice({
  name: "cartInfo",
  initialState: [
    // { id: 0, name: "White and Black", count: 2 },
    // { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCart(state, action) {
      // console.log(action.payload);
      const foundItem = state.find((allValue) => {
        return allValue.id === action.payload;
      });
      foundItem.count++;
      // console.log(foundItem.id);
    },

    decreaseCart(state, action) {
      const foundItem = state.find((allValue) => {
        return allValue.id === action.payload;
      });

      if (foundItem.count > 1) {
        foundItem.count--;
      }
    },

    deletingCart(state, action) {
      const foundItem = state.findIndex((state) => {
        return state.id == action.payload;
      });
      state.splice(foundItem, 1);
    },
    addingMoreInCart(state, action) {
      const isExisting = state.find((state) => {
        return state.id == action.payload.id;
      });

      if (isExisting) {
        isExisting.count++;
      } else {
        state.push({
          id: action.payload.id,
          name: action.payload.title,
          count: 1,
        });
      }
    },
  },
});

export let { increaseCart, decreaseCart, addingMoreInCart, deletingCart } =
  cartInfo.actions;

export default configureStore({
  reducer: {
    anyName: user.reducer,
    cartInfo: cartInfo.reducer,
  },
});
