import React from "react";
import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";

function ListadoEventos({ eventos }) {
  return (
    <>
      {eventos.length === 0 && <p>Todavia no hay eventos registrados</p>}
      {eventos.length !== 0 && (
        <ListGroup>
          {eventos.map((evento) => (
            <ListItem key={evento.id} evento={evento} />
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default ListadoEventos;
