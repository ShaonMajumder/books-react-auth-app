import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./reducers/bookSlice";

console.log('call store')

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;