import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./main.css";
import Load from "./Pages/load.tsx";

const Home = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <Suspense fallback={<Load />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
