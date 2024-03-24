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
      title: {
        display: true,
        text: "Housing prices in Norway 🇳🇴 split over yearly quarters",
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
