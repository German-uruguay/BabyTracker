import InformeDeEvento from "./InformeDeEvento";
import { useSelector } from "react-redux";
import moment from "moment";

function BabyBottleReport() {
  const eventos = useSelector((state) => state.user?.eventos || {});
  const fechaActual = moment().format("YYYY-MM-DD");

  const biberones = eventos[35];

  let biberonesDeHoy;
  let cantidadBiberonesDeHoy;
  let fechaBiberonMasReciente;
  if (biberones) {
    biberonesDeHoy = biberones.filter((evento) => {
      return moment(evento.fecha).format("YYYY-MM-DD") === fechaActual;
    });

    cantidadBiberonesDeHoy = biberonesDeHoy.length;
    if (cantidadBiberonesDeHoy > 0) {
      //para chekear que hoy hayan biberones ingresados
      fechaBiberonMasReciente = biberonesDeHoy.reduce((latest, item) => {
        const currentDate = moment(item.fecha);
        return currentDate.isAfter(latest) ? currentDate : latest;
      }, moment(biberonesDeHoy[0].fecha))._i;
    }
  }

  let dataInformeBiberon = {
    tipo: "Biberon",
    cantidadDeVecesOcurrido: cantidadBiberonesDeHoy,
    fechaUltimoEvento: fechaBiberonMasReciente,
  };

  return <InformeDeEvento dataEvento={dataInformeBiberon} />;
}

export default BabyBottleReport;
