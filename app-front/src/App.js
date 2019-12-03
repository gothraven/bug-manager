import React from "react";
import { Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/styles";
import { AbilityContext, ability } from './components/core/Ability';
import { history } from "./components/core/History";
import ErrorBoundary from "./components/lib/ErrorBoundary";
import MainRouter from "./components/routes/MainRouter";
import Client from "./components/core/api/Client";

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <AbilityContext.Provider value={ability}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <ErrorBoundary>
                <MainRouter />
              </ErrorBoundary>
            </Router>
          </ThemeProvider>
        </AbilityContext.Provider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
