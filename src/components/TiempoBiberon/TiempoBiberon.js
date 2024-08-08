import { useSelector } from "react-redux";
import moment from "moment";

function TiempoBiberon() {
  const eventos = useSelector((state) => state.user?.eventos || {});

  const fechaActual = moment().format("YYYY-MM-DD");
  console.log("fecha: ", fechaActual);
  const biberones = eventos[35];

  let ultimoBiberon;

  if (biberones) {
    ultimoBiberon = biberones.reduce((latest, item) => {
      // Convierte las fechas a objetos moment
      const currentDate = moment(item.fecha, "YYYY-MM-DD HH:mm:ss");
      // Compara la fecha actual con la fecha más reciente encontrada
      return currentDate.isAfter(moment(latest.fecha, "YYYY-MM-DD HH:mm:ss"))
        ? item
        : latest;
    }, biberones[0]);
  }
  const fechaUltimoBiberonStr = ultimoBiberon?.fecha;
  // Parsear la fecha con moment
  const fechaUltimoBiberon = moment(
    fechaUltimoBiberonStr,
    "YYYY-MM-DD HH:mm:ss"
  );

  // Calcular la fecha y hora del próximo biberón
  const cuatroHoras = moment.duration(4, "hours");
  const proximoBiberon = fechaUltimoBiberon.add(cuatroHoras);

  // Calcular la diferencia entre el tiempo actual y el próximo biberón
  const tiempoRestante = moment.duration(proximoBiberon.diff(moment())); //moment() es el momento actual
  console.log("tiempo restante: ", tiempoRestante);

  // Formatear la diferencia en horas y minutos
  const horasRestantes = Math.floor(tiempoRestante.asHours());
  const minutosRestantes = Math.floor(tiempoRestante.minutes());
  if (isNaN(horasRestantes) || isNaN(minutosRestantes)) {
    return <p>Todavia no se han ingresado biberones. Ingresa el primero.</p>;
  }
  return (
    <p
      className={
        horasRestantes <= 0 && minutosRestantes <= 0
          ? "text-danger fw-bolder"
          : "text-success fw-bolder"
      }
    >
      {horasRestantes <= 0 && minutosRestantes <= 0
        ? "Debes darle el biberón lo antes posible"
        : `Tiempo para el próximo biberón: ${horasRestantes} ${
            horasRestantes === 1 ? "hora" : "horas"
          } y ${minutosRestantes} ${
            minutosRestantes === 1 ? "minuto" : "minutos"
          }`}
    </p>
  );
}

export default TiempoBiberon;
