import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import createTheme from "./theme";
import NotistackProvider from './components/NotistackProvider';
// routes
import Router from "./routes/index";
import useTheme from "./hooks/useTheme";


function App() {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <NotistackProvider>
        <Router />
      </NotistackProvider>
    </MuiThemeProvider>
  );
}

export default App;
