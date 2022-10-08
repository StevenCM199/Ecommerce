import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [],
  reducers: {
    setShoppingCart: (state, action) => {
      return action.payload;
    }}
  });

  export const getShoppingCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
      .then((res) => dispatch(setShoppingCart(res.data.data.cart.products)))
      .finally (() => dispatch(setIsLoading(false)));
  }

  export const addToCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios 
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/cart',
        product,
        getConfig()
      )
      .then(() => dispatch(getFavoritesThunk()))
      .catch((error) => console.log(error.response))
      .finally(() => dispatch(setIsLoading(false)));
  }

  export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/purchases',
        {},
        getConfig()
      )
      .then(() => dispatch(setShoppingCart([])))
      .finally(() => dispatch(setIsLoading(false)));
  }


export const { setShoppingCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;


// 1. Despachar thunk en el componente
// 2. Crear y exportar action
// 3. Despachar la accion en el then
// 4. Crear el getConfig, colocar lo del localstorage y exportarlo
// 5. Colocar el getConfig en el axios del thunk