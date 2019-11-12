import React from "react";
import { Router } from "react-router-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "./components/routes/MainRouter";
import RelayEnvironment from "./components/core/api/RelayEnvironment";

import theme from "./theme";
import { history } from "./components/core/History";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <MainRouter />
        </Router>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
