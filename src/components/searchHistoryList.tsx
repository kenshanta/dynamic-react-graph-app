import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import {
  createNumberToQuarterMap,
  getHouseName,
} from "../utils/getYearsQuarterly";
interface SearchHistoryListProps {
  urlHistory: string[];
}

const SearchHistoryList: React.FC<SearchHistoryListProps> = ({
  urlHistory,
}) => {
  if (urlHistory.length <= 1) {
    return (
      <Box mt={3}>
        <Typography variant="h5">No search history yet.</Typography>
        <Typography variant="h6" fontStyle={"italic"}>
          note that you will need to agree to save session upon every request
        </Typography>
      </Box>
    );
  }
  function extractValuesFromUrl(url: string) {
    if (!url.startsWith("http") || !url.includes("/")) {
      return [];
    }

    const urlParts = url.split("/");
    const values = urlParts.slice(2);
    const quarterNumberParams = [parseInt(values[2]), parseInt(values[3])];
    const quarterlyRange = createNumberToQuarterMap(quarterNumberParams);
    return getHouseName(values[1]) + ":" + " " + quarterlyRange.join("-");
  }
  return (
    <Box display={"flex"} mt={3} flexDirection={"column"}>
      <Typography color={""} sx={{ textDecoration: "underline" }} variant="h5">
        Search History:
      </Typography>
      <List>
        {urlHistory.map((history, index) => (
          <ListItem sx={{ padding: 0 }} key={index}>
            <ListItemText
              primary={<a href={history}>{extractValuesFromUrl(history)}</a>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchHistoryList;
