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
          <ul className="flex flex-col gap-3 md:hidden pb-5 ml-5 bg-neutral-200 w-full">
            <li>
              <a
                className="after:bg-red-300 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                href="/products"
              >
                Shop all
              </a>
            </li>
            <li>
              <a href="/products/latest-arrivals">Latest arrivals</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
