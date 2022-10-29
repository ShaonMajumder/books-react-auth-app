import { createSlice, createAsyncThunk, isAllOf } from "@reduxjs/toolkit";
import apiClient,{booksApi, book_url} from "../services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {useHistory} from 'react-router-dom';

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
    
    console.log('builder output',builder)
    builder.addMatcher(
      isAllOf(booksApi.endpoints.addBook.matchFulfilled),
      (state, payload ) => {
        console.log('Create reducer m',state)
        console.log('Create from extra reducer',state.bookItems)
      }
    )
    .addMatcher(
      isAllOf(booksApi.endpoints.deleteBook.matchFulfilled),
      (state, payload ) => {
        
        // state.isGood = payload.isGood
        let data = payload.payload

        console.log('Delete reducer m',state,payload.payload)
        console.log('Delete from extra reducer',state.bookItems)

        Swal.fire({
          icon:"success",
          text:data.message
        })
        const history = useHistory();
        history.push('/')
        // await apiClient.post(`${book_delete_url}/${id}`,[]).then(({data})=>{
          //   Swal.fire({
          //     icon:"success",
          //     text:data.message
          //   })
            
          //   history.push('/')
            
          // }).catch(({response})=>{
          //   
          // })

        
      }
    )
    .addMatcher(
      isAllOf(booksApi.endpoints.deleteBook.matchRejected),
      (state, payload ) => {
        console.log(state,payload)
        let data = payload.payload.data
        console.log(payload.payload.data.errors)
        
        let errors = Object.entries(payload.payload.data.errors).map(([key, value])=>(
          value
        ))

        Swal.fire({
            text: errors,
            icon:"error"
        })
        // if(response.status===422){
          //     setValidationError(data.errors)
          //   }else{
          //     Swal.fire({
          //       text:response.data.message,
          //       icon:"error"
          //     })
          //   }
        
        
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
