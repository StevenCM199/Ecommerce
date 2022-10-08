import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    }}
  });

  export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
      .then((res) => dispatch(setPurchases(res.data.data.purchases)))
      .finally (() => dispatch(setIsLoading(false)));
  }

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;


// 1. Despachar thunk en el componente
// 2. Crear y exportar action
// 3. Despachar la accion en el then
// 4. Crear el getConfig, colocar lo del localstorage y exportarlo
// 5. Colocar el getConfig en el axios del thunk