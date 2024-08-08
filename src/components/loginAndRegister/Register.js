import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Alert } from "react-bootstrap";
import styles from "./LoginRegister.module.css";
import SubmitButton from "../submitButton/SubmitButton";
import { login } from "../../redux/features/userSlice";
import { cargarDepartamentos } from "../../redux/features/appSlice";
import api from "../../services/services";
import { Spinner } from "react-bootstrap";
import LoginRegisterContainer from "./LoginRegisterContainer";
function Register() {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    passwordCheck: "",
    idDepartamento: "",
    idCiudad: "",
  });
  const [ciudades, setCiudades] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = (mensaje) => toast(mensaje, { autoClose: 2000 });
  const departamentos = useSelector((state) => state.app.departamentos);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departamentos data
    if (departamentos.length === 0) {
      async function fetchDepartamentos() {
        try {
          const response = await api.getDepartamentos();
          dispatch(cargarDepartamentos(response.data.departamentos));
        } catch (error) {
          console.error("Error fetching departamentos:", error.message);
          notify("Error al cargar los departamentos. verifica tu conexión");
        }
      }

      fetchDepartamentos();
    }
  }, [departamentos, dispatch]);

  useEffect(() => {
    async function fetchCiudades() {
      try {
        if (formData.idDepartamento) {
          const response = await api.getCiudades(formData.idDepartamento);

          setCiudades(response.ciudades); // Asumiendo que getCiudades devuelve directamente los datos
        } else {
          setCiudades([]);
        }
      } catch (error) {
        console.error("Error fetching ciudades:", error.message);
        setCiudades([]); // Limpiar el estado en caso de error
      }
    }

    fetchCiudades();
  }, [formData.idDepartamento]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validar datos del formulario
    const errors = validateFormData(
      formData.usuario,
      formData.password,
      formData.passwordCheck,
      formData.idDepartamento,
      formData.idCiudad
    );

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors).join(" "));
      setLoading(false);
      return;
    }

    try {
      const response = await api.postUsuario(formData);
      if (response.status === 200) {
        const payload = {
          usuario: formData.usuario,
          apiKey: response.data.apiKey,
          idUsuario: response.data.id,
        };
        localStorage.setItem("usuario", formData.usuario);
        localStorage.setItem("idUsuario", response.data.id);
        localStorage.setItem("apiKey", response.data.apiKey);
        dispatch(login(payload));
        navigate("/");
        setFormData({
          usuario: "",
          password: "",
          idDepartamento: "",
          idCiudad: "",
        });
        setError("");
        notify("Bienvenido, Usted se ha registrado con éxito!");
      }
    } catch (err) {
      console.log("err del registro: ", err);
      setError(err.message || "Error en el registro");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginRegisterContainer>
      <div className={styles.container}>
        <h2 className={styles.header}>Registro</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsuario" className={styles.input}>
            <Form.Label className={styles.label}>Usuario</Form.Label>
            <Form.Control
              type="email"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className={styles.input}>
            <Form.Label className={styles.label}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
          </Form.Group>
          <Form.Group controlId="formPasswordCheck" className={styles.input}>
            <Form.Label className={styles.label}>
              Confirmar Contraseña
            </Form.Label>
            <Form.Control
              type="password"
              name="passwordCheck"
              value={formData.passwordCheck}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
            />
          </Form.Group>
          <Form.Group controlId="formIdDepartamento" className={styles.input}>
            <Form.Label className={styles.label}>Departamento</Form.Label>
            <Form.Control
              as="select"
              name="idDepartamento"
              value={formData.idDepartamento}
              onChange={handleChange}
            >
              <option value="">Selecciona un departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formIdCiudad" className={styles.input}>
            <Form.Label className={styles.label}>Ciudad</Form.Label>
            <Form.Control
              as="select"
              name="idCiudad"
              value={formData.idCiudad}
              onChange={handleChange}
              disabled={!formData.idDepartamento}
            >
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <SubmitButton disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Registrese"
            )}
          </SubmitButton>
        </Form>
      </div>
    </LoginRegisterContainer>
  );
}

export default Register;
function validateFormData(
  usuario,
  password,
  passwordCheck,
  idDepartamento,
  idCiudad
) {
  const errors = {};
  if (usuario.trim() === "") {
    errors.usuario = "El usuario es requerido.";
  }
  if (password.trim() === "") {
    errors.password = "La contraseña es requerida.";
  }
  if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 dígitos.";
  }
  if (password !== passwordCheck) {
    errors.passwordCheck = "Las contraseñas no coinciden.";
  }
  if (idDepartamento === "") {
    errors.idDepartamento = "Debes seleccionar un departamento.";
  }
  if (idCiudad === "") {
    errors.idCiudad = "Debes seleccionar una ciudad.";
  }
  return errors;
}
