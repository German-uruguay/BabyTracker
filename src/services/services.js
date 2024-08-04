import axios from "axios";

// Defino la URL
const baseUrl = "https://babytracker.develotion.com";
async function getEventos(apiKey, idUsuario) {
  const url = `${baseUrl}/eventos.php?idUsuario=${idUsuario}`;
  try {
    // Realizo la solicitud GET
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: idUsuario,
      },
    });

    // Manejo la respuesta

    if (response.status === 200) {
      return response.data.eventos;
    }
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}

async function getCategorias(apiKey, idUsuario) {
  const url = `${baseUrl}/categorias.php`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: idUsuario,
      },
    });

    // Manejo la respuesta
    if (response.status === 200) {
      return response.data.categorias;
    }
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}

async function login(formData) {
  const response = await axios.post(`${baseUrl}/login.php`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function postEvento(dataToSubmit) {
  const url = `${baseUrl}/eventos.php`;

  try {
    const response = await axios.post(
      url,
      {
        //esto seria el body. es el segundo parametro del post en axios.
        idCategoria: dataToSubmit.idCategoria,
        idUsuario: dataToSubmit.idUsuario,
        detalle: dataToSubmit.detalle,
        fecha: dataToSubmit.fechaEvento,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: dataToSubmit.apiKey,
          iduser: dataToSubmit.idUsuario,
        },
      }
    );

    // Manejo la respuesta
    return response.data;
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}

async function postUsuario(formData) {
  const url = `${baseUrl}/usuarios.php`;
  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

async function deleteEvento(dataToSubmit) {
  const url = `${baseUrl}/eventos.php?idEvento=${dataToSubmit.idEvento}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: dataToSubmit.apiKey,
        iduser: dataToSubmit.idUsuario,
      },
    });

    // Manejo la respuesta
    return response.data;
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}

async function getDepartamentos() {
  const url = `${baseUrl}/departamentos.php`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Manejo la respuesta
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}

async function getCiudades(idDepartamento) {
  const url = `${baseUrl}/ciudades.php?idDepartamento=${idDepartamento}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Manejo la respuesta
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    // Maneja los errores
    console.error("Error en la solicitud:", error);
  }
}
export default {
  getCategorias,
  getEventos,
  postEvento,
  login,
  deleteEvento,
  postUsuario,
  getDepartamentos,
  getCiudades,
};
//Axios automáticamente convierte la respuesta a formato JSON si el servidor responde con Content-Type: application/json.
// por eso no es necesario hacer el response.json()
