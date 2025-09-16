import "./App.css";
import { CartProvider } from "./context/Cart/CartProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <div>
        {/* This will render the matched route component */}
        <Outlet />
      </div>
    </CartProvider>
  );
}

export default App;
