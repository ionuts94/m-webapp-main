import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({ departmentsData, colors }) {
  const data = {
    labels: departmentsData.departments,
    datasets: [
      {
        data: departmentsData.numbers,
        backgroundColor: colors.map(color => `rgba(${color}, 0.4)`),
        borderColor: colors.map(color => `rgba(${color}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />
}
