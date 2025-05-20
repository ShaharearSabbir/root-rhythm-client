import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { RiSunFoggyLine } from "react-icons/ri";
import { FaCloudMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./Context/AuthContext";
import Swal from "sweetalert2";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Signed out successfully",
      });
    });
  };

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    html.setAttribute("data-theme", newTheme);
  };

  const links = (
    <>
      <li className="text-xl font-semibold">
        <NavLink to={`/`}>Home</NavLink>
      </li>
      <li className="text-xl font-semibold">
        <NavLink to={`/`}>All Plants</NavLink>
      </li>
      <li className="text-xl font-semibold">
        <NavLink to={`/`}>Add Plants</NavLink>
      </li>
      <li className="text-xl font-semibold">
        <NavLink to={`/`}>My Plants</NavLink>
      </li>
      <li className="text-xl font-semibold">
        <NavLink to={`/error`}>Error</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar w-11/12 mx-auto">
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
        <img className="w-10" src={logo} alt="" />
        <Link
          to={`/`}
          className="btn btn-ghost text-xl md:text-2xl lg:text-3xl text-primary font-bold"
        >
          <span className="font-light">Root</span>Rhythm
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-5">
        <div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-secondary dark:text-accent-content"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex gap-3">
              {" "}
              <Link
                to={`/auth/signup`}
                className="btn btn-accent dark:hover:text-black"
              >
                Sign Up
              </Link>
              <Link to={`/auth/signin`} className="btn btn-primary">
                Sign In
              </Link>
            </div>
          )}
        </div>
        <button onClick={toggleTheme}>
          {theme == "light" ? (
            <FaCloudMoon size={25} title="Switch To Dark Mode" />
          ) : (
            <RiSunFoggyLine size={25} title="Switch To Light Mode" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
