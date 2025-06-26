import React, { useContext, useEffect, useRef, useState } from "react";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

import { VscSignIn } from "react-icons/vsc";
import { GoSignIn } from "react-icons/go";

import HeaderPopup from "./HeaderPopup";
import ThemeToggle from "../Shared/ThemeToggle";
import BrandLogo from "../Shared/BrandLogo";
import NavImage from "../Shared/NavImage";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setShowPopup((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup, popupRef]);

  const links = (
    <>
      <li className="text-lg font-semibold">
        <NavLink to={`/`}>Home</NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to={`/allPlants`}>All Plants</NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to={`/aboutus`}>About Us</NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to={`/contact`}>Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar lg:w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <BrandLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-5">
        <div>
          {user ? (
            <div className="flex gap-3 relative">
              <NavImage photoURL={user.photoURL} setShowPopup={setShowPopup} />
              {showPopup && (
                <div
                  className="absolute w-30 top-14 right-10 z-10"
                  ref={popupRef}
                >
                  <HeaderPopup />
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to={`/auth/signup`}
                className="btn btn-md hidden btn-accent dark:hover:text-black md:flex"
              >
                <VscSignIn size={20} /> <span> Sign Up</span>
              </Link>
              <Link
                to={`/auth/signin`}
                className="btn btn-sm md:btn-md btn-primary"
              >
                <GoSignIn className="hidden md:inline" size={20} />
                Sign In
              </Link>
            </div>
          )}
        </div>
        {!user && <ThemeToggle />}
      </div>
    </div>
  );
};

export default Header;
