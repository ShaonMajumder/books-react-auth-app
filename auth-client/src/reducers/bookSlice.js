import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient,{book_url} from "../services/api";
import Cookies from "js-cookie";

const initialState = {
  bookItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

//Fetch
// export const getBookItems = createAsyncThunk("book/getBookItems", () => {
//   return fetch(url)
//     .then((resp) => resp.json())
//     .catch((err) => console.log(err));
// });

//Axios
// ThunkAPI can get the state of the APP and access andinvoke functions on the state
export const getBookItems = createAsyncThunk(
  "book/getBookItems",
  async (name, thunkAPI) => {
    try {
    
      console.log('call reducer')

      apiClient.interceptors.request.use(config => {
        config.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
        return config;
      });
      const resp = await apiClient.get(book_url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    clearBookList: (state) => {
      state.bookItems = [];
    }
  },
  extraReducers: {
    [getBookItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getBookItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.bookItems = action.payload.data.books
    },
    [getBookItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

//console.log(bookSlice);
export const { clearBookList } = bookSlice.actions;

export default bookSlice.reducer;
