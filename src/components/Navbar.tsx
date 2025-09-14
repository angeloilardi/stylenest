import { useState } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className="pb-6 flex items-center mx-auto">
          <a href="/">
            <img src="/logo.svg" alt="" className="mr-4" />
          </a>
          <ul className="hidden md:flex gap-3">
            <li>
              <a href="/products">Shop all</a>
            </li>

            <li>
              <a href="/products/latest-arrivals">Latest arrivals</a>
            </li>
          </ul>
          <div className="flex items-center gap-5 ml-auto">
            <CartModal />
            <button className="md:hidden">
              {isMenuOpen ? (
                <RiCloseFill size={24} onClick={toggleMenu} />
              ) : (
                <RiMenuFill size={24} onClick={toggleMenu} />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <ul className="flex flex-col gap-3 md:hidden">
            <li>Shop all</li>
            <li>Latest arrivals</li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
