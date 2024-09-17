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
import { Box, Button, CircularProgress } from "@mui/material";
import { HousingService } from "./services";
import { getYearlyQuarters, createNumberToQuarterMap } from "./utils/helpers";
import {
  clearHistoryEntry,
  createHistoryEntry,
  addHistoryEntry,
} from "./stores/historySlice";
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
  BarController
);

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { houseNumber = "00", from = "3", to = "7" } = useParams();
  const [open, setOpen] = React.useState(!sessionStorage.getItem("agreed"));
  const searchHistoryList = useSelector((state: any) => state.history.history); //TODO: add type
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

  React.useMemo(() => {
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
  }, [houseNumber, from, to]);

  const handleRegistration = async (data: {
    apartmentType: string;
    quarterly: number[];
  }) => {
    console.log(searchHistoryList, "------");
    if (searchHistoryList.length === 0 && !sessionStorage.getItem("agreed")) {
      setOpen(true);
    } else if (
      searchHistoryList.includes(
        `${window.location.protocol}//${window.location.host}/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`
      )
    ) {
      toast("History already in list", { type: "success" });
      return;
    } else if (sessionStorage.getItem("agreed") === "true") {
      console.log(window.location.search, "parameter?");
      dispatch(createHistoryEntry(window.location.href));
      dispatch(addHistoryEntry());
      navigate(
        `/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`
      );
      return;
    }
    dispatch(createHistoryEntry(window.location.href));

    navigate(
      `/${data.apartmentType}/${data.quarterly[0]}/${data.quarterly[1]}`
    );
  };

  return (
    <Box className="App" columnGap={9}>
      {newData.labels.length > 1 ? (
        <CustomChart data={newData} houseNumber={houseNumber} />
      ) : (
        <Box
          flexGrow={1}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Box>
      )}
      <Box className="interactivePanel">
        <ConfirmationDialog open={open} setOpen={setOpen} />
        <SearchForm handleRegistration={handleRegistration} />
        <SearchHistoryList />
        {sessionStorage.getItem("historyUrl") ? (
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
