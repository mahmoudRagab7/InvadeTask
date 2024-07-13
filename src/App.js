import "./App.css";

// Material UI Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";

// EXTERNAL LIBRARIES
import Header from "./components/Header";
import Landing from "./components/Landing";
import Filter from "./components/Filter";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  palette: {
    primary: {
      main: "#661c54",
    },
  },
});

function App() {
  // App Component
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Landing />
        <Filter />
      </ThemeProvider>
    </div>
  );
}

export default App;
