import ListadoEventos from "./ListadoEventos";
import { useSelector } from "react-redux";

function AllEventsList() {
  const eventos = useSelector((state) => state.user?.eventos || {});

  const eventosPlano = Object.values(eventos).flat();

  return (
    <>
      <ListadoEventos eventos={eventosPlano} />
    </>
  );
}

export default AllEventsList;
