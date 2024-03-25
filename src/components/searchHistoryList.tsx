import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { createNumberToQuarterMap, getHouseName } from "../utils/helpers";

const SearchHistoryList: React.FC = () => {
  const memoryHistory = JSON.parse(localStorage.getItem("historyUrl") || "[]");
  if (memoryHistory.length === 0) {
    return (
      <Box
        mt={3}
        p={3}
        sx={{ border: "double rgb(0, 032, 091)", borderRadius: "5%" }}
      >
        <Typography fontWeight={"bold"} variant="h5">
          No search history yet
        </Typography>
        <Typography variant="h6" fontStyle={"italic"} pt={1}>
          * note that you will need to agree to save session upon <b>every</b>{" "}
          request
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
    <Box
      display={"flex"}
      mt={3}
      flexDirection={"column"}
      height={"17rem"}
      sx={{
        overflowY: "auto",
        border: "dashed rgb(0, 032, 091)",
        borderRadius: "5%",
      }}
    >
      <Box p={2} pb={0}>
        <Typography sx={{ textDecoration: "underline" }} variant="h5">
          Search History:
        </Typography>
      </Box>
      <Box pt={0} p={3}>
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
