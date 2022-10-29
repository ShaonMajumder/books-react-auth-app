import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient,{booksApi, book_url} from "../services/api";
import Cookies from "js-cookie";

const initialState = {
  bookItems: [],
  isLoggedIn: false,
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
    },
    nextPage: async (state) => {
      try {
        console.log('next page reducer')
        const resp = await apiClient.get(book_url);
        state.bookItems = resp.data.data.books
      } catch (error) {
        // return thunkAPI.rejectWithValue("next page something went wrong");
        console.log("next page something went wrong");
      }
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = true
      sessionStorage.setItem('loggedIn',true)
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false
      sessionStorage.setItem('loggedIn',false)
    }
   
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.addBook.matchFulfilled,
      (state, { payload }) => {
        console.log('add book reducer m',state)
        console.log('from extra reducer',state.bookItems,payload)
      }
    ).addMatcher(
      booksApi.endpoints.deleteBook.matchFulfilled,
      (state, { payload }) => {
        console.log('delete book reducer m',state)
        console.log('from extra reducer',state.bookItems,payload)
      }
    )
  },
  // {
  //   [getBookItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getBookItems.fulfilled]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //     state.bookItems = action.payload.data.books.data
  //   },
  //   [getBookItems.rejected]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //   },
  // },
});





//console.log(bookSlice);
export const { clearBookList, nextPage, setLoggedIn, setLoggedOut } = bookSlice.actions;

export default bookSlice.reducer;
