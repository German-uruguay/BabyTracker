import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Chart.module.css";

// Registramos los componentes necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, //esto es para el eje y
  Tooltip,
  Legend
);

function Chart({ chartData }) {
  /*   Object.keys es un método en JavaScript que devuelve un array de las propiedades enumerables de un objeto dado, en el mismo orden en que se proporcionan mediante un bucle  */
  console.log(chartData.values);

  if (!chartData.values || chartData.values.length === 0) {
    return (
      <div className={styles.container}>
        <h3>{chartData.title}</h3>
        <p>No hay valores para mostrar</p>
      </div>
    );
  }
  const data = {
    labels: chartData.labels /* ["primera", "segunda"] */, //tendria que poner un array de este tipo
    datasets: [
      {
        label: chartData.indicador,
        data: chartData.values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, //este lo tuve que agregar para que mantuviera el responsive cuando agrando la pantalla
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "45%" }}
    >
      <h3>{chartData.title}</h3>
      <div style={{ position: "relative", width: "100%", height: `${400}px` }}>
        {/*//TODO puedo hacer un css module para este componente y con media querys, variar el height */}

        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
