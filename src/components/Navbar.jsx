import { useState } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full pt-20"> {/* Changed here */}
      <nav className="w-full flex py-6 px-5 justify-between items-center fixed top-0 z-50 bg-grey bg-opacity-80 backdrop-blur-lg">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-[220px] h-[60px]" />

        {/* Navigation Links for Desktop */}
        <ul className="list-none hidden sm:flex justify-end items-center ">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[20px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} ${
                nav.id === "try"
                  ? "bg-red-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                  : ""
              } ${
                nav.id === "output"
                  ? "bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
                  : ""
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"} ${
                    nav.id === "try"
                      ? "bg-red-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                      : ""
                  } ${
                    nav.id === "output"
                      ? "bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
