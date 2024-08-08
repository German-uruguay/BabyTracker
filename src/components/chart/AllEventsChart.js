import Chart from "./Chart";
import { useSelector } from "react-redux";

function AllEventsChart() {
  const eventos = useSelector((state) => state.user?.eventos || {});
  const categorias = useSelector((state) => state.app?.categorias || {});
  const categoriesId = Object.keys(eventos); //esto es un array con los id de las categorias. lo necesito para contar la cantidad de veces que sucede
  const labelsChart1 = categoriesId
    .map((id) => {
      //esto es un array con los nombres de las categorias.
      const categoria = categorias.find((categoria) => categoria.id == id); //el == en vez de === es porque tengo strings
      return categoria && eventos[categoria.id].length !== 0
        ? categoria.tipo
        : null;
    })
    .filter((label) => label !== null); //el .filter es para que en el array de labels no me quede una posicion del array con null.

  /*   Object.keys es un método en JavaScript que devuelve un array de las propiedades enumerables de un objeto dado, en el mismo orden en que se proporcionan mediante un bucle  */
  const valuesChart1 = categoriesId
    .map((category) => eventos[category].length)
    .filter((valor) => valor !== 0); //esto devuelve un array donde cuento los eventos en cada categoria. si el evento tiene 0, lo saco del array.

  const indicadorChart1 = "Cantidad de veces que el evento fue registrado";
  const chartData = {
    indicador: indicadorChart1,
    values: valuesChart1,
    labels: labelsChart1,
    title: "Todos los eventos",
  };

  return <Chart chartData={chartData} />;
}
export default AllEventsChart;
