import React from "react";
import { Chart } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { getHouseName } from "../utils/helpers";

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
  houseNumber: string;
}
const CustomChart: React.FC<CustomChartProps> = ({ data, houseNumber }) => {
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
      <Box marginTop={5}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Box>
              <Typography variant="caption">🏠 HousingType: {""} </Typography>
            </Box>
            <Box>
              <Typography variant="h6" paddingLeft={9}>
                {getHouseName(houseNumber)}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Box>
              <Typography variant="caption">🕰️ Range:</Typography>
            </Box>
            <Box>
              <Typography variant="h6" paddingLeft={5}>
                {data.labels[0] + " - " + data.labels[data.labels.length - 1]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CustomChart;
