import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "styles/global";
import { ThemeProvider } from "@emotion/react";
import theme from "styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
