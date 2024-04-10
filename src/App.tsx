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
import { Box, Button } from "@mui/material";
import { HousingService } from "./services";
import { getYearlyQuarters, createNumberToQuarterMap } from "./utils/helpers";
import { clearHistoryEntry, createHistoryEntry } from "./stores/historySlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { houseNumber = "00", from = "3", to = "7" } = useParams();
  const [open, setOpen] = React.useState(false);
  const searchHistoryList = useSelector((state) => state.history.history);
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
        setNewData((prevState) => {
          return {
            ...prevState,
            labels: Object.keys(response.dimension.Tid.category.label),
            datasets: prevState.datasets.map((dataset) => ({
              ...dataset,
              data: response.value,
            })),
          };
        });
      }
    };
    fetchData();
  }, []);

  const handleRegistration = async (data: {
    apartmentType: string;
    quarterly: number[];
  }) => {
    if (
      !searchHistoryList.includes(
        `${window.location.protocol}//${window.location.host}/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`,
      )
    ) {
      setOpen(true);
    }
    if (
      searchHistoryList.includes(
        `${window.location.protocol}//${window.location.host}/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`,
      )
    ) {
      toast("History already in list", { type: "success" });
      return;
    }
    const ranges = createNumberToQuarterMap(data.quarterly);
    const props = {
      quarterlyRange: getYearlyQuarters(ranges[0], ranges[1]),
      housingType: [data.apartmentType],
    };
    const response = await HousingService.getInitialHousing(props);
    setNewData((prevState) => {
      return {
        ...prevState,
        labels: Object.keys(response.dimension.Tid.category.label),
        datasets: prevState.datasets.map((dataset) => ({
          ...dataset,
          data: response.value,
        })),
      };
    });
    navigate(
      `/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`,
    );
    dispatch(createHistoryEntry(window.location.href));
  };

  return (
    <Box className="App" columnGap={9}>
      <CustomChart data={newData} />
      <Box className="interactivePanel">
        <ConfirmationDialog open={open} setOpen={setOpen} />
        <SearchForm handleRegistration={handleRegistration} />
        <SearchHistoryList />
        {localStorage.getItem("historyUrl") ? (
          <Box
            mt={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Button
              onClick={() => dispatch(clearHistoryEntry())}
              variant="contained"
              size="small"
            >
              Clear History
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default App;
