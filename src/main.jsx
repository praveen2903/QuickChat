import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { AuthContextProvider } from "./context/AuthenticationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustomThemeProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
      </CustomThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
