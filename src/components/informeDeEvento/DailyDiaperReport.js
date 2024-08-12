import InformeDeEvento from "./InformeDeEvento";
import { useSelector } from "react-redux";
import moment from "moment";

function DailyDiaperReport() {
  const eventos = useSelector((state) => state.user?.eventos || {});
  const fechaActual = moment().format("YYYY-MM-DD");

  const paniales = eventos[33];
  console.log("pañales", paniales);
  let panialesDeHoy;
  let cantidadPanialesDeHoy;
  let fechaPanialMasReciente;
  if (paniales) {
    panialesDeHoy = paniales.filter((evento) => {
      return moment(evento.fecha).format("YYYY-MM-DD") === fechaActual;
    });
    cantidadPanialesDeHoy = panialesDeHoy.length;

    if (paniales.length > 0) {
      fechaPanialMasReciente = paniales.reduce((latest, item) => {
        const currentDate = moment(item.fecha);
        return currentDate.isAfter(latest) ? currentDate : latest;
      }, moment(paniales[0].fecha))._i;
    }
  }

  let dataInformePanial = {
    tipo: "Panial",
    cantidadDeVecesOcurrido: cantidadPanialesDeHoy,
    fechaUltimoEvento: fechaPanialMasReciente,
  };

  return <InformeDeEvento dataEvento={dataInformePanial} />;
}

export default DailyDiaperReport;
