import React, { useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import styles from "./ListadoEventos.module.css";
import api from "../../services/services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { borrarEvento } from "../../redux/features/userSlice";

function ListItem({ evento }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const notify = (mensaje) => toast(mensaje, { autoClose: 1500 });
  const apiKey = localStorage.getItem("apiKey");
  const idUsuario = localStorage.getItem("idUsuario");

  async function handleDelete() {
    setLoading(true);
    const dataToSubmit = {
      idEvento: evento.id,
      apiKey: apiKey,
      idUsuario: idUsuario,
      idCategoria: evento.idCategoria,
    };

    const response = await api.deleteEvento(dataToSubmit);

    if (response.codigo === 200) {
      notify(response.mensaje);
      dispatch(
        borrarEvento({
          idEvento: evento.id,
          idCategoria: evento.idCategoria,
        })
      );
    }

    setLoading(false);
  }

  return (
    <ListGroup.Item
      className={`d-flex justify-content-between align-items-center ${styles.item}`}
    >
      <div className={`d-flex align-items-center ${styles.pContainer}`}>
        <img
          src={`https://babytracker.develotion.com/imgs/${evento.imagen}.png`}
          alt="Evento"
          className="me-3"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div>
          <p className="mb-0">
            <strong>Detalle:</strong>{" "}
            {evento.detalle
              ? evento.detalle
              : "Este evento no cuenta con detalle"}
          </p>
          <p className="mb-0">
            <strong>Fecha del evento:</strong> {evento.fecha}
          </p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{ position: "relative" }}
      >
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Borrar evento"
        )}
      </button>
    </ListGroup.Item>
  );
}

export default ListItem;
