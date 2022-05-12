import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useReducer, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppReducer from './context/AppReducer';
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import InputDetailsForm from "./pages/InputDetailsForm";
import AuthResults from './components/AuthResults';
import AuthQuestions from './components/AuthQuestions';

const initContextData = { answers: {} }

export const AppContext: any = React.createContext([])
export const AuthContext: any = React.createContext([])
export const UserContext: any = React.createContext([])

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
      // main: "#e6c300",
      main: "#A7B4B4"
    },
    secondary: {
      // main: "#cc0066",
      main: "#DE3C59"
    },
    tertiary: {
      // main: "#00e6e6",
      main: "#39A78E"
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

  const [userDetails, setUserDetails] = useState({
    name: "",
    gender: "Male",
    age: 0
  })

  const [appData, dispatchAppData] = useReducer(AppReducer, initContextData);

  const [authValues, setAuthValues] = useState({
    submitted: false,
    registered: false
  })

  return (
    <AppContext.Provider value={[appData, dispatchAppData]}>
      <UserContext.Provider value={[userDetails, setUserDetails]}>
        <AuthContext.Provider value={[authValues, setAuthValues]}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route element={<InputDetailsForm />} path="/" />
                <Route element={<AuthQuestions />}>
                  <Route element={<Questions />} path="/questions" />
                </Route>
                <Route element={<AuthResults />}>
                  <Route element={<Results />} path="/results" />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthContext.Provider>
      </UserContext.Provider>
    </AppContext.Provider>
  )

}

export default App;
