import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function GenderPieChart({ anime }) {
  let maleFavouritesSum = 0;
  let femaleFavouritesSum = 0;

  anime.characters.edges.forEach((char) => {
    if (char.node.gender == "Male") {
      maleFavouritesSum += char.node.favourites;
    } else if (char.node.gender == "Female") {
      femaleFavouritesSum += char.node.favourites;
    }
  });

  const totalFavourites = maleFavouritesSum + femaleFavouritesSum;

  const malePercentage = ((maleFavouritesSum / totalFavourites) * 100).toFixed(
    1
  );
  const femalePercentage = (
    (femaleFavouritesSum / totalFavourites) *
    100
  ).toFixed(1);

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [maleFavouritesSum, femaleFavouritesSum],
        backgroundColor: ["#3498db", "#e74c3c"],
        hoverBackgroundColor: ["#2980b9", "#c0392b"],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">
        Character Favourites by Gender
      </h2>
      <Pie data={data} />
      <div className="mt-4 text-center text-lg font-medium">
        {malePercentage > femalePercentage ? (
          <p className="text-blue-500">
            {malePercentage}% of favourites were for male characters.
          </p>
        ) : (
          <p className="text-red-500">
            {femalePercentage}% of favourites were for female characters.
          </p>
        )}
      </div>
    </div>
  );
}
