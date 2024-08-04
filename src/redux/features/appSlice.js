import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    cargarCategorias: (state, action) => {
      state.categorias = action.payload;
    },
  },
});

export const { cargarCategorias } = appSlice.actions;
export default appSlice.reducer;
