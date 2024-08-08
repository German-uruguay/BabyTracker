import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  departamentos: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    cargarCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    cargarDepartamentos: (state, action) => {
      state.departamentos = action.payload;
    },
  },
});

export const { cargarCategorias, cargarDepartamentos } = appSlice.actions;
export default appSlice.reducer;
