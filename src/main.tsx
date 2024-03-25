import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import housingStore from "./stores/housingStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme.ts";

const router = createBrowserRouter([
  {
    path: "/:houseNumber/:from/:to/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/*",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={housingStore}>
      <ToastContainer
        autoClose={1500}
        hideProgressBar
        theme="dark"
        position="bottom-right"
      />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
