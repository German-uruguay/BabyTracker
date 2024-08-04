import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarioLogueado: {},
  eventos: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuarioLogueado = action.payload;
    },
    cargarEventosIniciales: (state, action) => {
      state.eventos = agruparPorCategoria(action.payload);
    },
    agregarEvento: (state, action) => {
      const { idCategoria, idUsuario, detalle, fechaEvento, imagen, id } =
        action.payload;

      // Si el array de la categoría no existe, crearlo
      if (!state.eventos[idCategoria]) {
        state.eventos[idCategoria] = [];
      }

      // Agregar el nuevo evento
      state.eventos[idCategoria].push({
        id: id,
        idCategoria: Number(idCategoria),
        idUsuario: idUsuario,
        detalle: detalle,
        fecha: fechaEvento,
        imagen: imagen,
      });
    },
    borrarEvento: (state, action) => {
      state.eventos[action.payload.idCategoria] = state.eventos[
        action.payload.idCategoria
      ].filter((evento) => evento.id !== action.payload.idEvento);
      /*    state.eventos.filter((e) => e.idEvento !== action.payload); */
    },
  },
});

export const {
  login,
  cargarEventosIniciales,
  cargarCategorias,
  agregarEvento,
  borrarEvento,
} = userSlice.actions;
export default userSlice.reducer;

const agruparPorCategoria = (array) => {
  // Utiliza reduce para crear un objeto agrupador
  return array.reduce((acc, item) => {
    // Si la categoria no existe en el acumulador, creo un nuevo array para ella
    if (!acc[item.idCategoria]) {
      acc[item.idCategoria] = [];
    }
    // Agrego el objeto actual al array correspondiente
    acc[item.idCategoria].push(item);
    return acc;
  }, {});
};

//estructura eventos:
//un objeto cuyas keys son el id de la categoria y el valor es un array con todos los eventos que estan representados como objetos
/* 33: [{…}, {…}]
35: [{…}, {…}]
36: [{…}, {…}, {…}, {…}] */
