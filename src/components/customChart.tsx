import React from "react";
import { Chart } from "react-chartjs-2";
import { Box } from "@mui/material";

interface Datasets {
  type: any;
  label: string;
  borderColor: string;
  borderWidth: number;
  data: number[];
}
interface CustomChartProps {
  data: {
    labels: string[];
    datasets: Datasets[];
  };
}
const CustomChart: React.FC<CustomChartProps> = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        responsive: true,
        position: "bottom",
        padding: 20,
        labels: {
          boxWidth: 25,
        },
      },
      title: {
        padding: 20,
        display: true,
        text: "Housing prices in Norway 🇳🇴 split over yearly quarters",
        font: { size: 19 },
      },
    },
  };
  return (
    <Box flexGrow={1}>
      <Chart options={options} type="bar" data={data} />
    </Box>
  );
};
export default CustomChart;
