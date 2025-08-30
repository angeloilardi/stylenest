import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/products/" element={<ProductGrid />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
