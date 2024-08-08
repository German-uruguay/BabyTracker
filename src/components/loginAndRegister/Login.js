import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { login } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/services";
import styles from "./LoginRegister.module.css";
import SubmitButton from "../submitButton/SubmitButton";
import { Spinner } from "react-bootstrap";
import LoginRegisterContainer from "./LoginRegisterContainer";
function Login() {
  const [formData, setFormData] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = (mensaje) => toast(mensaje, { autoClose: 1500 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.usuario || !formData.password) {
      setError("Por favor complete todos los campos");
      setLoading(false);
      return;
    }

    try {
      const response = await api.login(formData);

      if (response.data.codigo === 200) {
        const localStorage = window.localStorage;

        const payload = {
          usuario: formData.usuario,
          idUsuario: response.data.id,
          apiKey: response.data.apiKey,
        };

        localStorage.setItem("usuario", formData.usuario);
        localStorage.setItem("idUsuario", response.data.id);
        localStorage.setItem("apiKey", response.data.apiKey);
        notify("Bienvenido!");
        dispatch(login(payload));
        navigate("/");
        setFormData({ usuario: "", password: "" });
        setError("");
      } else {
        setError("Error en la autenticación. Por favor intente nuevamente.");
      }
    } catch (err) {
      console.log("err desde el login", err);
      if (err.message) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado. Por favor intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginRegisterContainer>
      <div className={styles.container}>
        <h2 className={styles.header}>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsuario" className={styles.input}>
            {/* el controlId me genera automaticamente el for en el label y el id correspondiente en el input */}
            <Form.Label className={styles.label}>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className={styles.input}>
            <Form.Label className={styles.label}>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
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
              "Login"
            )}
          </SubmitButton>
        </Form>
      </div>
    </LoginRegisterContainer>
  );
}

export default Login;
