import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "seo", age: 20 },

  //updating states above
  //1. state changing function
  reducers: {
    changeName(existingState) {
      //   return { name: "park", age: 20 };
      existingState.name = "Lee";
    },
    incrementNumber(existingState, action) {
      existingState.age += action.payload;
    },
  },
});

//2. export so can be called
// all functions are here
export let { changeName, incrementNumber } = user.actions;

let cartInfo = createSlice({
  name: "cartInfo",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  reducer: {
    anyName: user.reducer,
    cartInfo: cartInfo.reducer,
  },
});
