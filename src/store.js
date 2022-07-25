import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "seo",
});

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
