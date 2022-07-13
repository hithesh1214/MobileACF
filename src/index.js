import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#5c3490" },
    secondary: { main: "#c7bad7" },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
