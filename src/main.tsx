import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./components/App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
const theme = createTheme({
  palette: {
    primary: { main: "#ffffff" },
  },
  typography: {
    fontFamily: "Onest, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
