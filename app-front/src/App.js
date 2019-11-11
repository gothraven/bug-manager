import React from "react";
import { Router } from "react-router-dom";
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "./components/routes/MainRouter";
import RelayEnvironment from './components/core/api/RelayEnvironment';

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <MainRouter />
        </Router>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
