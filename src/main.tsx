import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import App from "./App.tsx";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import { CartProvider } from "./context/Cart/CartProvider.tsx";
import ProductShowcase from "./components/ProductShowcase.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Navbar />
      <div className="mx-auto bg-white p-4 rounded-lg w-full mt-16">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/products/" element={<ProductGrid />} />
            <Route
              path="/category/:categoryId"
              element={
                <ProductShowcase
                  collectionId="latest-arrivals"
                  title="Latest arrivals"
                  viewAllLink="/products/"
                />
              }
            />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </CartProvider>
  </StrictMode>
);
