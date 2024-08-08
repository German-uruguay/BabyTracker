import axios from "axios";

const baseUrl = "https://babytracker.develotion.com";
async function getEventos(apiKey, idUsuario) {
  const url = `${baseUrl}/eventos.php?idUsuario=${idUsuario}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: idUsuario,
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response desde getEventos:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request desde getEventos:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message desde getEventos:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
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

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response desde getCategorias:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request desde getCategorias:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message desde getCategorias:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
}
async function login(formData) {
  try {
    const response = await axios.post(`${baseUrl}/login.php`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.log("Error response desde services.js: ", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibió respuesta
      console.log("Error request desde services.js: ", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.log("Error message desde services.js: ", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
}

async function postEvento(dataToSubmit) {
  const url = `${baseUrl}/eventos.php`;

  try {
    const response = await axios.post(
      url,
      {
        // Esto seria el body. Es el segundo parametro del post en axios.
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
    if (response.status === 200) {
      // Manejo la respuesta
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
}

async function postUsuario(formData) {
  const url = `${baseUrl}/usuarios.php`;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
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

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response desde deleteEvento:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request desde deleteEvento:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message desde deleteEvento:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
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

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      return response; // Devuelve solo los datos de la respuesta
    } else {
      throw new Error(
        response.data.mensaje || "Error en la solicitud al servidor."
      );
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response desde getDepartamentos:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request desde getDepartamentos:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message desde getDepartamentos:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
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

    // Manejo de la respuesta exitosa
    if (response.status === 200) {
      return response.data; // Devuelve solo los datos de la respuesta
    } else {
      // Manejo de codigos de estado que no son 200
      throw new Error("Error en la solicitud al servidor.");
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondio con un codigo de estado fuera del rango 2xx
      console.error("Error response desde getCiudades:", error.response);
      throw new Error(
        error.response.data.mensaje || "Error en la solicitud al servidor."
      );
    } else if (error.request) {
      // La solicitud se realizo pero no se recibio respuesta
      console.error("Error request desde getCiudades:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo paso al configurar la solicitud que provoco un error
      console.error("Error message desde getCiudades:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
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
