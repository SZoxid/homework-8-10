import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => setCountry(data[0]));
  }, [name]);

  const chartData = {
    labels: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ],
    datasets: [
      {
        label: "Oylik Xarajatlar",
        data: [
          1000, 1200, 800, 1500, 2000, 1700, 1800, 1600, 1900, 2100, 2200, 2300,
        ],
        borderColor: "#0ea5e9",
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {country ? (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <img
              src={country.flags.png}
              alt={`${country.name.common} bayrog'i`}
              className="h-40 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
            <p>Aholisi: {country.population.toLocaleString()}</p>
            <p>Pul birligi: {Object.keys(country.currencies)[0]}</p>
          </div>
          <div className="col-span-2">
            <Line data={chartData} />
          </div>
        </div>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
    </div>
  );
}

export default Country;
