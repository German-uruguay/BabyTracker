import React, { useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./ListadoEventos.module.css";
import api from "../../services/services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { borrarEvento } from "../../redux/features/userSlice";
import ConfirmModal from "../confirmModal/ConfirmModal";

function ListItem({ evento }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (mensaje) => toast(mensaje, { autoClose: 1500 });
  const apiKey = localStorage.getItem("apiKey");
  const idUsuario = localStorage.getItem("idUsuario");

  async function handleDelete() {
    setLoading(true);

    if (!apiKey || !idUsuario) {
      notify("La sesión ha expirado");
      navigate("/login");
      setLoading(false);
      return;
    }

    const dataToSubmit = {
      idEvento: evento.id,
      apiKey: apiKey,
      idUsuario: idUsuario,
      idCategoria: evento.idCategoria,
    };

    try {
      const response = await api.deleteEvento(dataToSubmit);

      if (response.data.codigo === 200) {
        notify(response.data.mensaje);
        dispatch(
          borrarEvento({
            idEvento: evento.id,
            idCategoria: evento.idCategoria,
          })
        );
      } else {
        notify(response.data.mensaje || "Error desconocido");
      }
    } catch (err) {
      notify(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirmDelete = () => {
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    handleDelete();
    setShowConfirm(false);
  };

  return (
    <>
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
          onClick={handleConfirmDelete} //esta funcion muestra el modal y es el aceptar del modal quien termina llamando a handleConfirm que adentro ejecuta a handleDelete
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

      <ConfirmModal
        show={showConfirm}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

export default ListItem;
