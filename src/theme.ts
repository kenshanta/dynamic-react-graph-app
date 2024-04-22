import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          height: "2.3rem !important",
          width: "2.3rem !important",
          "@media only screen and (min-width:501px) and (max-width:900px)": {
            height: "3rem !important",
            width: "3rem !important",
          },
          "@media (min-width:901px)": {
            height: "4rem !important",
            width: "4rem !important",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "rgb(0, 032, 091)",
    },
    secondary: {
      main: "rgb(186, 12, 46)",
    },
    info: {
      main: "rgb(0, 032, 091)",
    },
  },
});
theme.typography.h6 = {
  fontSize: ".7rem",
  "@media (min-width:600px)": {
    fontSize: ".9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
};
theme.typography.caption = {
  fontSize: ".7rem",
  "@media (min-width:600px)": {
    fontSize: ".9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
};
export default theme;
