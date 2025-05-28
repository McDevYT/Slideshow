import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import App from "../app/App.tsx";
import { DataContextProvider } from "../../models/DataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </StrictMode>
);
