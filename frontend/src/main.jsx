import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store.js";
import { ThemeProvider } from "@material-tailwind/react";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>

    <Provider store={store}>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </Provider>
  </ThemeProvider>
);
