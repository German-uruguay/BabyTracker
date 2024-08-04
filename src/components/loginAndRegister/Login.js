import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { login } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

import api from "../../services/services";
import styles from "./LoginRegister.module.css";
import SubmitButton from "../submitButton/SubmitButton";

function Login() {
  const [formData, setFormData] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(formData);
      // Manejar la respuesta del servidor aquí
      if (response.data.codigo === 200) {
        let localStorage = window.localStorage;

        const payload = {
          usuario: formData.usuario,
          idUsuario: response.data.id,
          apiKey: response.data.apiKey,
        };
        localStorage.setItem("usuario", formData.usuario);
        localStorage.setItem("idUsuario", response.data.id);
        localStorage.setItem("apiKey", response.data.apiKey);

        dispatch(login(payload));
        navigate("/home");
        setFormData({ usuario: "", password: "" });
        setError("");
      }
    } catch (err) {
      setError(err.response.data.mensaje);
    }
  };

  return (
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
        <SubmitButton>Login</SubmitButton>
      </Form>
    </div>
  );
}

export default Login;
