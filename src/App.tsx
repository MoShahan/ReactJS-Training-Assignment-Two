import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import AppReducer from './context/AppReducer';
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import InputDetailsForm from "./pages/InputDetailsForm";

const initContextData = { answers: {} }
export const AppContext: any = React.createContext([])

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6c300",
    },
    secondary: {
      main: "#cc0066",
    },
    tertiary: {
      main: "#00e6e6",
    },
    background: {
      default: "#192231",
      paper: "#24344d",
    },
    text: {
      primary: "#fff",
    },
  },

  typography: {
    allVariants: {
      fontFamily: "Open Sans",
      fontWeight: "bold",
    },
    body1: {
      fontWeight: "normal",
    },
    button: {
      fontWeight: "bold",
    },
  },
});


function App() {

  const [appData, dispatchAppData] = useReducer(AppReducer, initContextData);

  return (
    <AppContext.Provider value={[appData, dispatchAppData]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<InputDetailsForm />} path="/" />
            <Route element={<Questions />} path="/questions" />
            <Route element={<AuthLayout />}>
              <Route element={<Results />} path="/results" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  )

}

export default App;
