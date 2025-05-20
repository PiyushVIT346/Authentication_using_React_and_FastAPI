import React from "react";
import { createRoot } from "react-dom/client"; 
import "bulma/css/bulma.min.css";
import App from "./App";

import { UserProvider } from "./context/UserContext";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);