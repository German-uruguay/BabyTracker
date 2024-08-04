import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cargarEventosIniciales } from "../../redux/features/userSlice";
import { cargarCategorias } from "../../redux/features/appSlice";
import api from "../../services/services";
import Accordion from "../accordion/Accordion";
import EventForm from "../eventForm/EventForm";
import AllEventsChart from "../chart/AllEventsChart";
import LastWeekMealsChart from "../chart/LastWeekMealsChart";
import TiempoBiberon from "../TiempoBiberon/TiempoBiberon";
import TodayEventsList from "../listadoEventos/TodayEventsList";
import OldEventsList from "../listadoEventos/OldEventsList";
import AllEventsList from "../listadoEventos/AllEventsList";
import DailyDiaperReport from "../informeDeEvento/DailyDiaperReport";
import BabyBottleReport from "../informeDeEvento/BabyBottleReport";
import AccordionItem from "../accordion/AccordionItem";
import { Spinner } from "react-bootstrap";

function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const apiKey = localStorage.getItem("apiKey");
  const idUsuario = localStorage.getItem("idUsuario");

  const navigate = useNavigate();

  useEffect(() => {
    if (!apiKey || !idUsuario) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const eventosIniciales = await api.getEventos(apiKey, idUsuario);
        const categorias = await api.getCategorias(apiKey, idUsuario);

        const eventosConImagen = eventosIniciales.map((evento) => {
          const categoria = categorias.find(
            (cat) => cat.id === evento.idCategoria
          );
          return {
            ...evento,
            imagen: categoria?.imagen,
          };
        });

        dispatch(cargarEventosIniciales(eventosConImagen));
        dispatch(cargarCategorias(categorias));
      } catch (err) {
        console.log("Error al cargar eventos iniciales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, apiKey, idUsuario, navigate]);

  if (loading) {
    return (
      <div className="spinnerContainer">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <main className="main-content">
      <EventForm />

      <Accordion>
        <AccordionItem title={"Gráficos"}>
          <div className="d-flex flex-row justify-content-between">
            <AllEventsChart /> <LastWeekMealsChart />
          </div>
        </AccordionItem>
        <AccordionItem title={"Listado de todos los eventos"}>
          <AllEventsList />
        </AccordionItem>
        <AccordionItem title={"Listado de los eventos de hoy"}>
          <TodayEventsList />
        </AccordionItem>
        <AccordionItem title={"Listado de los eventos anteriores a hoy"}>
          <OldEventsList />
        </AccordionItem>
        <AccordionItem title={"Tiempo para el próximo biberón"}>
          <TiempoBiberon />
        </AccordionItem>

        <AccordionItem title={"Informe diario de biberones"}>
          <BabyBottleReport />
        </AccordionItem>
        <AccordionItem title={"Informe diario de pañales"}>
          <DailyDiaperReport />
        </AccordionItem>
      </Accordion>
    </main>
  );
}

export default Dashboard;
