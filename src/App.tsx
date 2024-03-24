import React from "react";
import "./App.css";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController,
} from "chart.js";
import { Box } from "@mui/material";
import { HousingService } from "./services";
import {
  getYearlyQuarters,
  createNumberToQuarterMap,
} from "./utils/getYearsQuarterly";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationDialog from "./components/confirmationDialog";
import CustomChart from "./components/customChart";
import SearchHistoryList from "./components/searchHistoryList";
import SearchForm from "./components/searchForm";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  BarController,
);

const App: React.FC = () => {
  const { houseNumber = "00", from = "3", to = "7" } = useParams();
  const [urlHistory, setUrlHistory] = React.useState([""]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [newData, setNewData] = React.useState({
    labels: [""],
    datasets: [
      {
        type: "line" as const,
        label: "Linear",
        borderColor: "rgb(186, 12, 46)",
        borderWidth: 3,
        data: [],
      },
      {
        type: "bar" as const,
        label: "Bar",
        backgroundColor: "rgb(0, 032, 091)",
        borderColor: "rgb(0, 032, 091)",
        borderWidth: 2,
        data: [],
      },
    ],
  });
  React.useEffect(() => {
    const fetchData = async () => {
      if (houseNumber && from && to) {
        const quartersMap = createNumberToQuarterMap([
          parseInt(from),
          parseInt(to),
        ]);
        const props = {
          quarterlyRange: getYearlyQuarters(quartersMap[0], quartersMap[1]),
          housingType: [houseNumber],
        };
        const response = await HousingService.getInitialHousing(props);
        updateNewData(response);
      }
    };
    fetchData();
  }, []);

  const updateNewData = (data: any) => {
    setNewData((prev) => {
      const updatedDatasets = prev.datasets.slice();
      updatedDatasets[0].data = data.value;
      updatedDatasets[1].data = data.value;
      let updatedLabels: string[] = prev.labels.slice();
      updatedLabels = Object.keys(data.dimension.Tid.category.label);

      return {
        labels: updatedLabels,
        datasets: updatedDatasets,
      };
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRegistration = async (data: {
    apartmentType: string;
    quarterly: number[];
  }) => {
    const ranges = createNumberToQuarterMap(data.quarterly);
    const props = {
      quarterlyRange: getYearlyQuarters(ranges[0], ranges[1]),
      housingType: [data.apartmentType],
    };
    const response = await HousingService.getInitialHousing(props);
    updateNewData(response);
    navigate(
      `/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`,
    );
    setOpen(true);
  };

  return (
    <Box className="App" columnGap={9}>
      <CustomChart data={newData} />
      <Box className="interactivePanel">
        <ConfirmationDialog
          open={open}
          handleClose={handleClose}
          setUrlHistory={setUrlHistory}
        />
        <SearchForm handleRegistration={handleRegistration} />
        <SearchHistoryList urlHistory={urlHistory} />
      </Box>
    </Box>
  );
};

export default App;
