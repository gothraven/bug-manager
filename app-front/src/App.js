import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import SignIn from "./components/SignIn";

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
