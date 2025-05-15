import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { createNumberToQuarterMap, getHouseName } from "../utils/helpers";

const SearchHistoryList: React.FC = () => {
  const memoryHistory = JSON.parse(sessionStorage.getItem("historyUrl") || "[]");
  if (memoryHistory.length === 0) {
    return (
      <Box mt={3} p={3}>
        <Typography fontWeight={"bold"} variant="h5">
          No search history yet
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
    <Box display={"flex"} flexDirection={"column"}>
      <Box p={2} pb={0}>
        <Typography sx={{ textDecoration: "underline" }} variant="h5">
          Search History:
        </Typography>
      </Box>
      <Box p={3} pt={0}>
        <List sx={{ listStyleType: "disc" }}>
          {memoryHistory!.map((history: string, index: number) => (
            <ListItem sx={{ display: "list-item", padding: 0 }} key={index}>
              <ListItemText
                sx={{ display: "list-item" }}
                primary={<a href={history}>{extractValuesFromUrl(history)}</a>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SearchHistoryList;
