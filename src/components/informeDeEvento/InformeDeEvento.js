import React, { useState, useEffect } from "react";
import moment from "moment";

function InformeDeEvento({ dataEvento }) {
  const { tipo, cantidadDeVecesOcurrido, fechaUltimoEvento } = dataEvento;

  const [diferenciaEnTiempo, setDiferenciaEnTiempo] = useState({
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    if (fechaUltimoEvento) {
      const actualizarDiferenciaEnTiempo = () => {
        const fechaActual = moment();
        const diferenciaEnSegundos = fechaActual.diff(
          moment(fechaUltimoEvento),
          "seconds"
        );
        const minutes = Math.floor(diferenciaEnSegundos / 60);
        const seconds = diferenciaEnSegundos % 60;
        setDiferenciaEnTiempo({ minutes, seconds });
      };

      actualizarDiferenciaEnTiempo();

      const intervalo = setInterval(actualizarDiferenciaEnTiempo, 1000);
      // Limpio el intervalo al desmontar
      return () => clearInterval(intervalo);
    }
  }, [fechaUltimoEvento]);

  const renderizarContenido = () => {
    const { minutes, seconds } = diferenciaEnTiempo;
    const tiempoFormateado = `${minutes} minutos y ${seconds} segundos`;

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
                <strong>Tiempo transcurrido desde el último biberón:</strong>{" "}
                {tiempoFormateado}
              </p>
            </>
          );
        } else {
          return (
            <>
              <p>Todavía no se ha registrado un biberón para este día.</p>
              <p>
                <strong>Tiempo transcurrido desde el último biberón:</strong>{" "}
                {tiempoFormateado}
              </p>
            </>
          );
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
                <strong>Tiempo transcurrido desde el último cambio:</strong>{" "}
                {tiempoFormateado}
              </p>
            </>
          );
        } else {
          return (
            <>
              <p>
                Todavía no se ha registrado un cambio de pañal para este día.
              </p>
              <p>
                <strong>Tiempo transcurrido desde el último cambio:</strong>{" "}
                {tiempoFormateado}
              </p>
            </>
          );
        }

      default:
        return null;
    }
  };

  return <div className="informe-de-evento">{renderizarContenido()}</div>;
}

export default InformeDeEvento;
//TODO: manejar cuando no se registro ningún biberon
//TODO: manejar cuando no se registro ningun pañal
//TODO: si tengo solo un pañal y lo borro, se me romp
