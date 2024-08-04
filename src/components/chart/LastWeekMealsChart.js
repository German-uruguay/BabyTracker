import Chart from "./Chart";
import { useSelector } from "react-redux";
import moment from "moment";

function LastWeekMealsChart() {
  const eventos = useSelector((state) => state.user?.eventos || {});

  const comidas = eventos[31];
  let comidasUltimosSieteDias;
  let comidasUltimosSieteDiasAgrupadas;

  if (comidas) {
    comidasUltimosSieteDias = Object.values(comidas) //aca convierto el objeto comidas en un array de sus valores. como comidas es un objeto con propiedades que son arrays, entonces esto va a generar un array d eesos arrays
      .flat() //uso .flat porque para aplanar el array anidado (acordarse que el Object.values me da un array de arrays) y ahi poder usar filter
      .filter((comida) =>
        moment(comida.fecha).isAfter(moment().subtract(7, "days"))
      );
    comidasUltimosSieteDiasAgrupadas = groupByDate(
      comidasUltimosSieteDias
    ).sort((a, b) => {
      // Obtener la fecha de cada objeto
      const dateA = new Date(Object.keys(a)[0]);
      const dateB = new Date(Object.keys(b)[0]);

      // Comparar las fechas
      return dateA - dateB;
    });
  } //groupBy date es una funcion que defini mas arriba. El sort es para ordenar por fecha y que aparezca de menor a mayor

  const indicadorChart = "Cantidad comidas por dia";
  const valuesChart = comidasUltimosSieteDiasAgrupadas?.map((elemento) => {
    // Obtener la clave (fecha) del objeto
    const fecha = Object.keys(elemento)[0]; //recordar que cada elemento
    // Obtener el array de eventos para esa fecha
    const eventos = elemento[fecha];
    // Contar la cantidad de eventos
    return eventos.length;
  }); //aca deberia ir la cantidad por dia
  const labelsChart2 = comidasUltimosSieteDiasAgrupadas?.map(
    (elemento) => Object.keys(elemento)[0] //jeys devuelve un array con las claves enumerables del objeto. aca, cada elemento es un objeto con una clave que representa la fecha. uso [0] para acceder al primer elemento (primer y unico)
  ); //aca deberian ir los dias
  const chartData = {
    indicador: indicadorChart,
    values: valuesChart,
    labels: labelsChart2,
    title: "Comidas de la última semana",
  };

  return <Chart chartData={chartData} />;
}
export default LastWeekMealsChart;

const groupByDate = (arr) => {
  const grouped = arr.reduce((result, item) => {
    const date = item.fecha.split(" ")[0]; // Extrae la fecha sin la hora
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});

  // Convertir el objeto en un arreglo de objetos
  const groupedArray = Object.keys(grouped).map((date) => ({
    [date]: grouped[date],
  }));

  return groupedArray;
};
