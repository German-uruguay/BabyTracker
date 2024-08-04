import ListadoEventos from "./ListadoEventos";
import { useSelector } from "react-redux";
import moment from "moment";

function TodayEventsList() {
  const eventos = useSelector((state) => state.user?.eventos || {});

  const fechaActual = moment().format("YYYY-MM-DD");

  const eventosPlano = Object.values(eventos).flat();
  const eventosPlanoHoy = eventosPlano.filter((evento) => {
    // Extraer la fecha del evento en el formato "YYYY-MM-DD"
    const fechaEvento = moment(evento.fecha).format("YYYY-MM-DD");
    return fechaEvento === fechaActual;
  });

  return <ListadoEventos eventos={eventosPlanoHoy} />;
}

export default TodayEventsList;
