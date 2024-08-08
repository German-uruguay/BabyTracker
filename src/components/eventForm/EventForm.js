import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import SubmitButton from "../submitButton/SubmitButton";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import styles from "./EventForm.module.css";
import { agregarEvento } from "../../redux/features/userSlice";
import api from "../../services/services";
import { Spinner } from "react-bootstrap";

function EventForm() {
  const categorias = useSelector((state) => state.app.categorias);
  const userId = useSelector((state) => state.user.usuarioLogueado.userId);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const notify = (mensaje) => toast(mensaje, { autoClose: 1500 });
  const [loading, setLoading] = useState(false);
  let apiKey = localStorage.getItem("apiKey");
  let idUsuario = localStorage.getItem("idUsuario");

  const [formData, setFormData] = useState({
    idCategoria: "",
    idUsuario: userId,
    fechaEvento: new Date(),
    detalle: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      fechaEvento: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey || !idUsuario) {
      navigate("/login");
      notify("La sesión ha expirado");
      return;
    }
    setLoading(true);
    // Crear un objeto moment para verificar la fecha
    const fechaActual = moment();
    const fechaEvento = moment(formData.fechaEvento);

    if (fechaEvento.isAfter(fechaActual)) {
      alert("La fecha del evento no puede ser posterior a la fecha actual.");
      return;
    }

    // Formatear la fecha y hora al formato deseado
    const formattedFechaEvento = fechaEvento.isValid()
      ? fechaEvento.format("YYYY-MM-DD HH:mm:ss")
      : fechaActual.format("YYYY-MM-DD HH:mm:ss");

    // Enviar los datos del formulario a la API
    const dataToSubmit = {
      ...formData,
      idUsuario: idUsuario,
      fechaEvento: formattedFechaEvento,
      apiKey: apiKey,
    };
    const imagenDelEvento = categorias.find(
      (cat) => cat.id === Number(dataToSubmit.idCategoria)
    )?.imagen;

    // Validar los datos del formulario
    const errors = validateFormData(
      dataToSubmit.idCategoria,
      dataToSubmit.idUsuario
    );

    if (Object.keys(errors).length > 0) {
      // Mostrar el primer error encontrado
      setError(Object.values(errors).join(", "));
      setLoading(false);
      return;
    }

    try {
      let respuesta = await api.postEvento(dataToSubmit);
      if (respuesta.data.codigo === 200) {
        notify(respuesta.data.mensaje);

        dispatch(
          agregarEvento({
            ...dataToSubmit,
            imagen: imagenDelEvento,
            id: respuesta.data.idEvento,
          })
        );
        setError("");
      } else {
        setError(respuesta.data?.mensaje);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className={styles.header}>Registrar evento</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formIdCategoria" className={"styles.input"}>
        <Form.Label className={styles.label}>Categoria</Form.Label>
        <Form.Control
          className={styles.customInput}
          as="select"
          name="idCategoria"
          value={formData.idCategoria}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.tipo}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formFechaEvento" className={"styles.input"}>
        <Form.Label className={styles.label}>
          Fecha y Hora del Evento
        </Form.Label>
        <Datetime
          className={styles.customInput}
          value={formData.fechaEvento}
          onChange={handleDateChange}
          inputProps={{ name: "fechaEvento" }}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm:ss"
          isValidDate={(current) => current.isSameOrBefore(moment())}
        />
      </Form.Group>
      <Form.Group controlId="formDetalle" className={styles.customInput}>
        <Form.Label className={styles.label}>Detalles</Form.Label>
        <Form.Control
          as="textarea"
          name="detalle"
          value={formData.detalle}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>

      <SubmitButton>
        {!loading ? (
          "Enviar evento"
        ) : (
          <div>
            <Spinner
              animation="border"
              role="status"
              style={{ height: "100%", width: "auto" }}
              size="sm"
            />
          </div>
        )}
      </SubmitButton>
    </Form>
  );
}

export default EventForm;

function validateFormData(idCategoria, idUsuario) {
  const errors = {};
  if (idCategoria.trim() === "") {
    errors.idCategoria = "Debes seleccionar una categoría.";
  }
  if (idUsuario.trim() === "") {
    errors.idUsuario = "El id del usuaria es requerido.";
  }
  return errors;
}
