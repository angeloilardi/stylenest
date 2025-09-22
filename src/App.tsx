import "./App.css";
import Button from "./components/ui/Button";
import { CartProvider } from "./context/Cart/CartProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <div>
        {/* This will render the matched route component */}

        <Outlet />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 h-[80vh]">
        <img
          src="public/assets/images/Enzj4-4W4AMQ1ml.jpeg"
          alt=""
          className="object-cover h-full rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">The new collection is here!</h1>
          <h2>
            This year, our new summer collection will be your haven from the
            world's harsh elements
          </h2>
          <Button className="bg-blue-500 text-white w-max">Shop now</Button>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
