import { List, SignOut, X } from "phosphor-react";
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";
import logobbts from "../../assets/images/logobbts.png";

import "react-lazy-load-image-component/src/effects/blur.css";
import DarkModeToggle from "../DarkModeToggle";

const Header = () => {
  const [ToggleNav, setToggleNav] = useState(false);
  const HandleToggleNav = () => setToggleNav(!ToggleNav);
  const Links = [
    { name: "Funcionários", link: "/funcionarios" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bg-white shadow-md dark:shadow-[#161616] shadow-[#b8bdee1e] top-0 left-0 z-40 w-full flex items-center justify-center h-16 dark:bg-[#222222]">
      <div className="w-full max-w-7xl m-auto flex items-center justify-between h-full px-5">
        <Link to="/" className="flex items-center justify-center py-2 h-full">
          <img src={logobbts} className="w-12" alt="Logo BBTS" />
          <h1 className="text-2xl font-black bg-gradient-to-r from-[#3e40e4] via-lime-500 to-yellow-400 text-transparent bg-clip-text">
            BBTS
          </h1>
        </Link>

        <div
          className={`'flex w-[100%] items-center z-20 absolute top-16 left-0 md:flex md:relative md:top-0 md:w-auto lg:bg-none md:bg-transparent bg-[#f9fbff] dark:bg-[#222222] md:shadow-none shadow-md ${
            ToggleNav ? "visible" : "hidden"
          } `}
        >
          {Links.map((Link) => (
            <NavLink
              onClick={() => HandleToggleNav()}
              key={Link.link}
              end
              to={Link.link}
            >
              <div className="flex my-2 gap-2 rounded-md md:m-3 items-center justify-center dark:bg-[#121212] bg-gray-100 text-gray-800 dark:text-gray-300 w-[100%] md:w-28 md:h-10 h-12 hover:font-bold hover:text-purple-800 hover:dark:text-purple-800  duration-150">
                {Link.name}
              </div>
            </NavLink>
          ))}
          <div ref={dropdownRef} className="relative">
            <button className="flex my-2 gap-2 rounded-md md:m-3 items-center justify-center dark:bg-[#121212] bg-gray-100 text-gray-800 dark:text-gray-300 w-[100%] md:w-14 md:h-10 h-12 hover:bg-gray-200 duration-150" onClick={toggleDropdown}>
              <p className="mb-1"><SignOut size={20} /></p>
            </button>
            {isOpen && (
              <ul className="fixed left-0 top-0 h-full flex justify-center items-center p-4 w-full">
                  <li className="p-4 rounded-md dark:bg-[#222222] bg-white z-30">
                    <h1 className="text-lg dark:text-white mb-2">Realmente Deseja Sair ?</h1>
                    <div className="cursor-pointer flex gap-2 items-center rounded-md bg-red-500 justify-center p-1 text-white text-lg">
                      <p className="ml-2">Sair</p>
                      <SignOut size={20} />
                    </div>
                  </li>
                  <div onClick={() => { setIsOpen(false);}} className="z-10 fixed left-0 top-0 h-full w-full bg-[#00000079] justify-center flex items-center" ></div>
              </ul>
            )}
          </div>
          <DarkModeToggle />
        </div>

        <div className="md:hidden flex justify-between items-center gap-3">
          <div className="w-8 h-8 cursor-pointer flex it bg-blue-200 rounded-md  ">
            <div
              onClick={() => HandleToggleNav()}
              className="visible p-1 rounded cursor-pointer text-blue-800"
            >
              {ToggleNav ? <X size={24} /> : <List size={24} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
