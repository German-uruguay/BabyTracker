import React from "react";
import moment from "moment";

function InformeDeEvento({ dataEvento }) {
  const { tipo, cantidadDeVecesOcurrido, fechaUltimoEvento } = dataEvento;

  const fechaActual = moment();
  const diferenciaEnMinutos = fechaUltimoEvento
    ? fechaActual.diff(moment(fechaUltimoEvento), "minutes")
    : null;

  const renderizarContenido = () => {
    switch (tipo) {
      case "Biberon":
        if (cantidadDeVecesOcurrido) {
          return (
            <>
              <p>
                <strong>Total de biberones ingeridos en el día:</strong>{" "}
                {cantidadDeVecesOcurrido}
              </p>
              <p>
                <strong>Minutos transcurridos desde el último biberón:</strong>{" "}
                {diferenciaEnMinutos}
              </p>
            </>
          );
        } else {
          return <p>Todavía no se ha registrado un biberón para este día</p>;
        }

      case "Panial":
        if (cantidadDeVecesOcurrido) {
          return (
            <>
              <p>
                <strong>Total de pañales cambiados en el día:</strong>{" "}
                {cantidadDeVecesOcurrido}
              </p>
              <p>
                <strong>Minutos transcurridos desde el último cambio:</strong>{" "}
                {diferenciaEnMinutos}
              </p>
            </>
          );
        } else {
          return (
            <p>Todavía no se ha registrado un cambio de pañal para este día</p>
          );
        }

      default:
        return null;
    }
  };

  return <div className="informe-de-evento">{renderizarContenido()}</div>;
}

export default InformeDeEvento;
