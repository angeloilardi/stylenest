import { useState } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 right-0 w-full bg-neutral-200 p-4">
      <nav>
        <div className="flex items-center">
          <a href="/">
            <img src="/logo.svg" alt="" className="mr-4" />
          </a>
          <ul className="hidden md:flex gap-3">
            <li>
              <a href="/collection/latest-arrivals">Latest arrivals</a>
            </li>
            <li>
              <a href="/collections">Collections</a>
            </li>
            <li>
              <a href="/products">Shop all</a>
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
          <ul className="flex flex-col gap-3 md:hidden pb-5 ml-5 mt-5 bg-neutral-200 w-full">
            <li>
              <a href="/collection/latest-arrivals">Latest arrivals</a>
            </li>
            <li>
              <a href="/collections">Collections</a>
            </li>
            <li>
              <a href="/products">Shop all</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
