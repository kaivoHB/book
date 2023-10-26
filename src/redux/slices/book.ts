import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// import { IBookState, ICheckoutCartItem } from '../../@types/product';
import { IBookState } from '../../@types/book';

// ----------------------------------------------------------------------

const initialState: IBookState = {
  isLoading: false,
  error: null,
  books: [],
  book: null
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getBooksSuccess(state, action) {
      state.isLoading = false;
      state.books = action.payload;
    },

    // GET Book
    getBookSuccess(state, action) {
      state.isLoading = false;
      state.book = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const {
//   getCart,
//   addToCart,
//   resetCart,
//   gotoStep,
//   backStep,
//   nextStep,
//   deleteCart,
//   createBilling,
//   applyShipping,
//   applyDiscount,
//   increaseQuantity,
//   decreaseQuantity,
// } = slice.actions;

// ----------------------------------------------------------------------

export function getBooks() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://localhost:3333/');
      dispatch(slice.actions.getBooksSuccess(response.data.Books));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBook(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://localhost:3333/', {
        params: { id },
      });
      dispatch(slice.actions.getBookSuccess(response.data.Book));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
