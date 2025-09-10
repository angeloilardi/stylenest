import { useState } from "react";
import { RiShoppingBag3Line, RiMenuFill, RiCloseFill } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className="py-10 flex items-center mx-auto">
          <img src="public/logo.svg" alt="" className="mr-4" />
          <ul className="hidden md:flex gap-3">
            <li>Shop all</li>
            <li>Latest arrivals</li>
          </ul>
          <div className="flex items-center gap-5 ml-auto">
            <button>
              <RiShoppingBag3Line size={24} />
            </button>
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
