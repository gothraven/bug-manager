import React from "react";
import { Router } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "./components/routes/MainRouter";
import Client from "./components/core/api/Client";

import theme from "./theme";
import { history } from "./components/core/History";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <MainRouter />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
