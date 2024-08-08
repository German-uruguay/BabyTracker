import InformeDeEvento from "./InformeDeEvento";
import { useSelector } from "react-redux";
import moment from "moment";

function BabyBottleReport() {
  const eventos = useSelector((state) => state.user?.eventos || {});
  const fechaActual = moment().format("YYYY-MM-DD");

  const biberones = eventos[35];

  console.log(biberones);
  let biberonesDeHoy;
  let cantidadBiberonesDeHoy;
  let fechaBiberonMasReciente;
  if (biberones && biberones.length > 0) {
    biberonesDeHoy = biberones.filter((evento) => {
      return moment(evento.fecha).format("YYYY-MM-DD") === fechaActual;
    });

    cantidadBiberonesDeHoy = biberonesDeHoy.length;

    //para chekear que hoy hayan biberones ingresados
    fechaBiberonMasReciente = biberones.reduce((latest, item) => {
      const currentDate = moment(item.fecha);
      return currentDate.isAfter(latest) ? currentDate : latest;
    }, moment(biberones[0].fecha))._i;
  }

  let dataInformeBiberon = {
    tipo: "Biberon",
    cantidadDeVecesOcurrido: cantidadBiberonesDeHoy,
    fechaUltimoEvento: fechaBiberonMasReciente,
  };

  return <InformeDeEvento dataEvento={dataInformeBiberon} />;
}

export default BabyBottleReport;
