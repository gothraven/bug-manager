import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "./components/routes/MainRouter";

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <MainRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
