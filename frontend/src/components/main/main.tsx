import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "../../index.css";
import App from "../app/App.tsx";
import { DataContextProvider } from "../../models/DataContext.tsx";
import Slideshow from "../slideshow/Slideshow.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Slideshow />} />
          <Route path="edit" element={<App />} />
          <Route path="*" element={<Slideshow />} />
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  </StrictMode>
);
