import React, { useState, useEffect } from "react";
import moment from "moment";

function InformeDeEvento({ dataEvento }) {
  const { tipo, cantidadDeVecesOcurrido, fechaUltimoEvento } = dataEvento;
  console.log("fecha del ultimo evento", fechaUltimoEvento);
  const [diferenciaEnTiempo, setDiferenciaEnTiempo] = useState({
    days: null,
    hours: null,
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

        const days = Math.floor(diferenciaEnSegundos / (24 * 60 * 60));
        const hours = Math.floor(
          (diferenciaEnSegundos % (24 * 60 * 60)) / (60 * 60)
        );
        const minutes = Math.floor((diferenciaEnSegundos % (60 * 60)) / 60);
        const seconds = diferenciaEnSegundos % 60;

        setDiferenciaEnTiempo({ days, hours, minutes, seconds });
      };

      actualizarDiferenciaEnTiempo();

      const intervalo = setInterval(actualizarDiferenciaEnTiempo, 1000);
      // Limpio el intervalo al desmontar
      return () => clearInterval(intervalo);
    } else {
      setDiferenciaEnTiempo({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [fechaUltimoEvento]);

  const formatearTiempo = (valor, unidad) => {
    return `${valor} ${unidad}${valor !== 1 ? "s" : ""}`;
  };

  const renderizarContenido = () => {
    const { days, hours, minutes, seconds } = diferenciaEnTiempo;

    const tiempoFormateado = `${formatearTiempo(
      days,
      "día"
    )}, ${formatearTiempo(hours, "hora")}, ${formatearTiempo(
      minutes,
      "minuto"
    )}, y ${formatearTiempo(seconds, "segundo")}`;

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
                {fechaUltimoEvento === undefined ? (
                  "No se ha registrado ningún evento de este tipo y por lo tanto, no se puede calcular la fecha del último evento"
                ) : (
                  <>
                    <strong>
                      Tiempo transcurrido desde el último biberón:
                    </strong>{" "}
                    {tiempoFormateado}
                  </>
                )}
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
                {fechaUltimoEvento === undefined ? (
                  "No se ha registrado ningún evento de este tipo y por lo tanto, no se puede calcular la fecha del último evento"
                ) : (
                  <>
                    <strong>Tiempo transcurrido desde el último cambio:</strong>{" "}
                    {tiempoFormateado}
                  </>
                )}
              </p>
            </>
          );
        }

      default:
        return null;
    }
  };

  return <div className="informeDeEvento">{renderizarContenido()}</div>;
}

export default InformeDeEvento;
//TODO: manejar cuando no se registro ningún biberon
//TODO: manejar cuando no se registro ningun pañal
//TODO: si tengo solo un pañal y lo borro, se me romp
